import { NextRequest, NextResponse } from 'next/server';
import OpenAI from 'openai';
import { supabase } from '@/lib/supabase';
import { resolveSystemPrompt } from '@/lib/resolvePrompt';

const openai = new OpenAI({
  apiKey: process.env.OPENAI_API_KEY,
});

export async function POST(request: NextRequest) {
  try {
    const { text, versions = 1, tipo, modelo } = await request.json();
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
    // Per-text character range validation
    const textLen = text.length;
    if (textLen < 350) {
      return NextResponse.json(
        { error: 'O texto precisa ter pelo menos 350 caracteres.' },
        { status: 400 }
      );
    }
    if (textLen > 3000) {
      return NextResponse.json(
        { error: 'O texto pode ter no máximo 3000 caracteres.' },
        { status: 400 }
      );
    }

    // Validate tipo/modelo selections
    const tipos: Record<string, { modelos: string[] }> = {
      HUMANIZADORES: { modelos: [
        'analitico_reflexivo',
        'expositivo_descritivo',
        'tecnico_expositivo',
        'narrativo_interpretativo',
        'multiversoes',
        'dissertativo_expositivo',
        'explicativa_informativa',
        'dissertativa_reflexiva',
      ] },
      PARAFRASEADORES: { modelos: [
        'autoral_ruth',
        'juridicas_politicas',
        'saude',
        'educacao',
        'psicologia_psicanalise',
        'gestao_negocios',
        'artes_comunicacao_cultura',
        'agrarias_ambientais',
        'exatas_engenharias_tecnologias',
      ] },
      COMPLEMENTADOR: { modelos: [
        'argumentativo_reflexivo_critico_autoral',
        'analitico_critico',
        'academico_critico'
      ] },
    };
    if (!tipo || !modelo) {
      return NextResponse.json(
        { error: 'Tipo e modelo são obrigatórios' },
        { status: 400 }
      );
    }
    if (!tipos[tipo] || !tipos[tipo].modelos.includes(modelo)) {
      return NextResponse.json(
        { error: 'Tipo ou modelo inválido' },
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

    // Load current plan to enforce quotas and limits
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

    // Enforce free plan limits based on plan table (requests + words per text)
    if (user.plan === 'free') {
      const freeMonthly = plan.humanizations_per_month;
      if (freeMonthly !== null && freeMonthly !== undefined) {
        if ((user.usage_count ?? 0) >= freeMonthly) {
          return NextResponse.json(
            { error: 'Limite de uso atingido no plano gratuito. Faça upgrade para continuar.' },
            { status: 403 }
          );
        }
      }

      const words = text.trim().split(/\s+/).filter((w: string) => w.length > 0).length;
      const freeWordLimit = plan.word_limit;
      if (freeWordLimit !== null && freeWordLimit !== undefined) {
        if (words > freeWordLimit) {
          return NextResponse.json(
            { error: `Limite de palavras excedido para o plano gratuito (máx. ${freeWordLimit} por texto).` },
            { status: 403 }
          );
        }
      }
    }

    // Enforce character quota by plan for paid tiers
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

    const humanizedVersions: string[] = [];
    const { system: resolvedSystem, promptId } = resolveSystemPrompt(tipo, modelo);
    // Safe defaults if env vars not set (use widely available models)
    const responsesModel = process.env.OPENAI_RESPONSES_MODEL || 'gpt-5';
    const chatModel = process.env.OPENAI_CHAT_MODEL || 'gpt-4o-mini';
    const isPromptIdUsable = Boolean(promptId && !String(promptId).startsWith('prompt_id_replace_me'));

    const extractFromResponses = (res: any): string | null => {
      try {
        if (!res) return null;
        if (typeof (res as any).output_text === 'string' && (res as any).output_text.trim().length > 0) {
          return (res as any).output_text.trim();
        }
        const content = (res as any).output?.[0]?.content?.[0]?.text?.value
          ?? (res as any).content?.[0]?.text?.value;
        if (typeof content === 'string' && content.trim().length > 0) return content.trim();
        const choice = (res as any).choices?.[0]?.message?.content;
        if (typeof choice === 'string' && choice.trim().length > 0) return choice.trim();
      } catch {}
      return null;
    };

    for (let i = 0; i < versions; i++) {
      let pushed = false;
      if (isPromptIdUsable) {
        try {
          const run = await (openai as any).responses.create({
            model: responsesModel,
            prompt: { id: promptId },
            input: text,
          });
          const out = extractFromResponses(run);
          if (out) {
            humanizedVersions.push(out);
            pushed = true;
          }
        } catch (e) {
          console.warn('Falha ao usar Prompt ID; aplicando fallback para chat.completions.', e);
        }
      }
      if (!pushed) {
        const completion = await openai.chat.completions.create({
          model: chatModel,
          messages: [
            {
              role: 'system',
              content: `Você é um especialista brasileiro em linguagem e reescrita de textos. Siga as instruções conforme o modo selecionado pelo usuário.\n\n${resolvedSystem || ''}\n\nRegras gerais:\n0. Preserve o significado e informações originais (nunca invente fatos)\n1. Mantenha coesão e naturalidade\n2. Varie estruturas e vocabulário quando apropriado\n3. Adapte o registro ao público-alvo do modo escolhido\n4. Evite marcas de IA e respostas metalinguísticas\n5. Saída apenas com o texto final (sem explicações)\n\n${versions > 1 ? `6. Esta é a versão ${i + 1} de ${versions}. Produza uma variação única mantendo o mesmo significado.` : ''}`,
            },
            {
              role: 'user',
              content: `${tipo === 'PARAFRASEADORES' ? 'Parafraseie o texto a seguir conforme as diretrizes.' : tipo === 'COMPLEMENTADOR' ? 'Aprimore o texto a seguir conforme as diretrizes.' : 'Humanize o texto a seguir conforme as diretrizes.'}\n\n${text}`,
            },
          ],
          temperature: versions > 1 ? 0.8 + i * 0.1 : 0.7,
          max_tokens: 2000,
        });
        const humanizedText = completion.choices?.[0]?.message?.content;
        if (humanizedText && humanizedText.trim()) {
          humanizedVersions.push(humanizedText.trim());
          pushed = true;
        }
      }
    }

    if (humanizedVersions.length === 0) {
      console.error('Nenhuma versão gerada. Verifique os modelos e credenciais. Tipo:', tipo, 'Modelo:', modelo, 'PromptId:', promptId);
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
