import { NextRequest, NextResponse } from 'next/server';
import OpenAI from 'openai';
import { supabase } from '@/lib/supabase';

const openai = new OpenAI({
  apiKey: process.env.OPENAI_API_KEY,
});

export async function POST(request: NextRequest) {
  try {
    const { text, versions = 1 } = await request.json();
    const userId = request.headers.get('Authorization')?.replace('Bearer ', '');

    if (!userId) {
      return NextResponse.json(
        { error: 'Usuário não autenticado' },
        { status: 401 }
      );
    }

    if (!text) {
      return NextResponse.json(
        { error: 'Texto não fornecido' },
        { status: 400 }
      );
    }

    // Check user and usage limits
    const { data: user, error: userError } = await supabase
      .from('users')
      .select('*')
      .eq('id', userId)
      .single();

    if (userError || !user) {
      return NextResponse.json(
        { error: 'Usuário não encontrado' },
        { status: 404 }
      );
    }

    // If plan expired, revert to free before enforcing limits
    if (user.plan !== 'free' && user.plan_expires_at) {
      const now = new Date();
      const exp = new Date(user.plan_expires_at);
      if (now >= exp) {
        await supabase
          .from('users')
          .update({ plan: 'free', plan_expires_at: null })
          .eq('id', userId);
        user.plan = 'free';
      }
    }

    // Enforce free plan limits (requests + words per text)
    if (user.plan === 'free') {
      // hard cap: 3 uses and 200 words per text
      if ((user.usage_count ?? 0) >= 3) {
        return NextResponse.json(
          { error: 'Limite de uso atingido no plano gratuito. Faça upgrade para continuar.' },
          { status: 403 }
        );
      }

      const words = text.trim().split(/\s+/).filter((w: string) => w.length > 0).length;
      if (words > 200) {
        return NextResponse.json(
          { error: 'Limite de palavras excedido para o plano gratuito (máx. 200 por texto).' },
          { status: 403 }
        );
      }
    }

    // Enforce character quota by plan for paid tiers
    const { data: plan, error: planError } = await supabase
      .from('plans')
      .select('*')
      .eq('slug', user.plan)
      .single();

    if (planError || !plan) {
      return NextResponse.json(
        { error: 'Plano não encontrado para o usuário' },
        { status: 400 }
      );
    }

    const charCount = text.length;
    if (user.plan !== 'free' && plan.character_quota !== null && plan.character_quota !== undefined) {
      const used = user.characters_used ?? 0;
      if (used + charCount > plan.character_quota) {
        return NextResponse.json(
          { error: 'Limite de caracteres do plano atingido. Faça upgrade para continuar.' },
          { status: 403 }
        );
      }
    }

    // Generate multiple versions if requested
    const humanizedVersions: string[] = [];
    
    for (let i = 0; i < versions; i++) {
      const completion = await openai.chat.completions.create({
      model: "gpt-4o-mini",
      messages: [
        {
          role: "system",
          content: `Você é um especialista em humanização de textos gerados por IA. Sua tarefa é transformar textos que soam artificiais em textos naturais, humanos e autênticos, mantendo o significado original.

Regras importantes:
1. Mantenha o significado e a informação original
2. Use linguagem natural e variada
3. Adicione nuances humanas sutis
4. Varie a estrutura das frases
5. Use contrações quando apropriado
6. Adicione elementos conversacionais naturais
7. Mantenha o tom profissional quando necessário
8. Responda APENAS com o texto humanizado, sem explicações adicionais
9. O texto deve soar como se fosse escrito por um brasileiro nativo
10. ${versions > 1 ? `Esta é a versão ${i + 1} de ${versions}. Crie uma variação única e diferente das outras versões, mas mantendo o mesmo significado.` : ''}`
        },
        {
          role: "user",
          content: `Por favor, humanize este texto mantendo seu significado original:\n\n${text}`
        }
      ],
      temperature: versions > 1 ? 0.8 + (i * 0.1) : 0.7,
      max_tokens: 2000,
    });

      const humanizedText = completion.choices[0]?.message?.content;
      if (humanizedText) {
        humanizedVersions.push(humanizedText);
      }
    }

    if (humanizedVersions.length === 0) {
      throw new Error('Erro ao gerar texto humanizado');
    }

    // Update user usage: requests count and characters used
    const { error: updateError } = await supabase
      .from('users')
      .update({ 
        usage_count: (user.usage_count ?? 0) + 1,
        characters_used: (user.characters_used ?? 0) + charCount
      })
      .eq('id', userId);

    if (updateError) {
      console.error('Erro ao atualizar contador de uso:', updateError);
    }

    // Log usage
    await supabase
      .from('usage_logs')
      .insert([
        {
          user_id: userId,
          text_length: charCount,
        },
      ]);

    return NextResponse.json({ 
      humanizedText: humanizedVersions[0],
      humanizedVersions: humanizedVersions
    });
  } catch (error) {
    console.error('Erro na API de humanização:', error);
    return NextResponse.json(
      { error: 'Erro interno do servidor' },
      { status: 500 }
    );
  }
}
