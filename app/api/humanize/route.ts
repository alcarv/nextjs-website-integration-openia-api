import { NextRequest, NextResponse } from 'next/server';
import OpenAI from 'openai';
import { supabase } from '@/lib/supabase';

const openai = new OpenAI({
  apiKey: process.env.OPENAI_API_KEY,
});

export async function POST(request: NextRequest) {
  try {
    const { text, wordCount } = await request.json();
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

    // Check usage limits for free users
    if (user.plan === 'free') {
      if (user.usage_count >= 3) {
        return NextResponse.json(
          { error: 'Limite de uso atingido. Faça upgrade para continuar.' },
          { status: 403 }
        );
      }

      if (wordCount > 200) {
        return NextResponse.json(
          { error: 'Limite de palavras excedido para plano gratuito.' },
          { status: 403 }
        );
      }
    }

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
9. O texto deve soar como se fosse escrito por um brasileiro nativo`
        },
        {
          role: "user",
          content: `Por favor, humanize este texto mantendo seu significado original:\n\n${text}`
        }
      ],
      temperature: 0.7,
      max_tokens: 2000,
    });

    const humanizedText = completion.choices[0]?.message?.content;

    if (!humanizedText) {
      throw new Error('Erro ao gerar texto humanizado');
    }

    // Update user usage count
    const { error: updateError } = await supabase
      .from('users')
      .update({ usage_count: user.usage_count + 1 })
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
          text_length: wordCount,
        },
      ]);

    return NextResponse.json({ humanizedText });
  } catch (error) {
    console.error('Erro na API de humanização:', error);
    return NextResponse.json(
      { error: 'Erro interno do servidor' },
      { status: 500 }
    );
  }
}