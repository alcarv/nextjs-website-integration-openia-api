import { PROMPT_IDS } from '@/lib/promptConfig';

// Fallback style directives (used when no explicit prompt text override is provided)
export function fallbackStyleBySelection(tipo: string, modelo: string): string {
  if (tipo === 'HUMANIZADORES') {
    if (modelo === 'analitico_reflexivo') return 'Reescreva com tom analítico-reflexivo: argumentação equilibrada, insights e conexões entre ideias, linguagem clara e precisa, registro formal moderado.';
    if (modelo === 'expositivo_descritivo') return 'Estilo expositivo-descritivo: explique de forma clara e neutra, descrevendo características e contextos com objetividade e encadeamento lógico.';
    if (modelo === 'tecnico_expositivo') return 'Estilo técnico-expositivo: precisão terminológica, frases objetivas, coesão por conectores técnicos, elimine ambiguidade e coloquialismos.';
    if (modelo === 'narrativo_interpretativo') return 'Estilo narrativo-interpretativo: fluxo narrativo com interpretações e leituras do fenômeno, mantendo coesão, sem perder rigor e sem criar fatos.';
    if (modelo === 'multiversoes') return 'Produza variações naturais do mesmo conteúdo, mudando vocabulário e estruturas, preservando integralmente o sentido.';
  }
  if (tipo === 'PARAFRASEADORES') {
    if (modelo === 'autoral_ruth') return 'Parafraseie em estilo autoral (Dra. Ruth Monielly): voz confiante, clareza, densidade conceitual e coesão; não invente dados.';
    if (modelo === 'juridicas_politicas') return 'Parafraseie com registro jurídico-político: precisão normativa, fundamentação, conectores típicos (nesse sentido, ademais, por conseguinte), sem opinião gratuita.';
    if (modelo === 'saude') return 'Parafraseie com registro da área da saúde: vocabulário técnico adequado, objetividade, cuidado com causalidade e evidências.';
    if (modelo === 'educacao') return 'Parafraseie para a área da educação: clareza didática, exemplos pontuais, coesão temática, terminologia pedagógica adequada.';
    if (modelo === 'psicologia_psicanalise') return 'Parafraseie com registro de psicologia/psicanálise: rigor conceitual, definições precisas, cuidado com inferências e nuances teóricas.';
    if (modelo === 'gestao_negocios') return 'Parafraseie para gestão e negócios: foco em objetivos, métricas e processos; vocabulário corporativo moderado e claro.';
    if (modelo === 'artes_comunicacao_cultura') return 'Parafraseie para artes/comunicação/cultura: linguagem analítica com sensibilidade estética e contexto sociocultural, sem floreios excessivos.';
    if (modelo === 'agrarias_ambientais') return 'Parafraseie para ciências agrárias/ambientais: terminologia ecológica/agrícola correta, ênfase em dados e processos naturais.';
    if (modelo === 'exatas_engenharias_tecnologias') return 'Parafraseie para exatas/engenharias/tecnologias: precisão técnica, formalismo moderado, clareza em definições e relações causais.';
  }
  if (tipo === 'COMPLEMENTADOR') {
    if (modelo === 'argumentativo_reflexivo_critico_autoral') return 'Complemente com estilo argumentativo/reflexivo/crítico (autoral): fortaleça a tese, adicione justificativas e contra-argumentos, mantenha rigor e coesão.';
    if (modelo === 'analitico_critico') return 'Aprimore com tom analítico-crítico: refine conceitos, evidencie relações lógicas, melhore transições e elimine redundâncias.';
    if (modelo === 'academico_critico') return 'Aprimore com tom acadêmico-crítico: use linguagem formal, melhore a estrutura argumentativa, adicione referências teóricas e mantenha coesão textual.';
  }
  return '';
}

// Returns the system prompt to use. Priority:
// 1) Env override OPENAI_PROMPT_TEXT__<TIPO>__<MODELO> (full prompt text)
// 2) Fallback style directives
// Note: PROMPT_IDS exists to plug future direct-prompt retrieval; for now, ids are placeholders.
export function resolveSystemPrompt(tipo: string, modelo: string): { system: string; promptId?: string } {
  const promptId = PROMPT_IDS[modelo];

  // 1) Prompt text override by Tipo/Modelo
  const envKeyTyped = `OPENAI_PROMPT_TEXT__${tipo}__${modelo}`;
  const envKeyUpper = envKeyTyped.toUpperCase();
  const directEnv = process.env[envKeyUpper] ?? (process.env as any)[envKeyTyped];
  if (directEnv && typeof directEnv === 'string' && directEnv.trim().length > 0) {
    return { system: directEnv.trim(), promptId };
  }

  // 2) Prompt text override by Prompt ID
  if (promptId) {
    const envByIdKey = `OPENAI_PROMPT_TEXT_BY_ID__${promptId}`;
    const envById = process.env[envByIdKey];
    if (envById && envById.trim().length > 0) {
      return { system: envById.trim(), promptId };
    }
  }

  // 3) Fallback inline style
  return { system: fallbackStyleBySelection(tipo, modelo), promptId };
}
