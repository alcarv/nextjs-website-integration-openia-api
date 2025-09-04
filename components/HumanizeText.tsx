'use client';

import { useEffect, useState } from 'react';
import { usePathname } from 'next/navigation';
import { useRouter } from 'next/navigation';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Textarea } from '@/components/ui/textarea';
import {
  Bot,
  User,
  Copy,
  CheckCircle,
  AlertCircle,
  Crown,
  Lock,
  Star,
  Zap,
  Shield,
  ArrowRight,
  PenTool,
  Loader2,
} from 'lucide-react';
import { useToast } from '@/hooks/use-toast';
import { useAuth } from '@/contexts/AuthContext';
import AuthModal from '@/components/AuthModal';
import { Progress } from '@/components/ui/progress';
import { usePlans } from '@/hooks/usePlans';
import { fallbackStyleBySelection } from '@/lib/resolvePrompt';

export default function HumanizeText() {
  const MIN_CHARS = 350;
  const MAX_CHARS = 3000;
  const [inputText, setInputText] = useState('');
  const [outputText, setOutputText] = useState('');
  const [outputVersions, setOutputVersions] = useState<string[]>([]);
  const [selectedVersions, setSelectedVersions] = useState(1);
  const [selectedTipo, setSelectedTipo] = useState<string>('');
  const [selectedModelo, setSelectedModelo] = useState<string>('');
  const [isLoading, setIsLoading] = useState(false);
  const [copied, setCopied] = useState(false);
  const [showAuthModal, setShowAuthModal] = useState(false);
  const { toast } = useToast();
  const { user, refreshUser, loading: authLoading } = useAuth();
  const router = useRouter();
  const { plans, loading: plansLoading } = usePlans();
  const [mounted, setMounted] = useState(false);
  useEffect(() => { setMounted(true); }, []);
  const [billingInterval, setBillingInterval] = useState<'monthly' | 'annual'>('monthly');
  const currentPlan = mounted && !authLoading && !plansLoading
    ? plans.find((p) => p.slug === user?.plan)
    : undefined;
  const freePlan = plans.find((p) => p.slug === 'free');
  
  const tiposConfig: Record<string, { label: string; modelos: { value: string; label: string }[] }> = {
    HUMANIZADORES: {
      label: 'Humanizadores',
      modelos: [
        { value: 'analitico_reflexivo', label: 'Humanizador Estilo Analítico-Reflexivo' },
        { value: 'expositivo_descritivo', label: 'Humanizador - Estilo Expositivo-Descritivo' },
        { value: 'tecnico_expositivo', label: 'Humanizador - Estilo Técnico-Expositivo' },
        { value: 'narrativo_interpretativo', label: 'Humanizador Com Estilo Narrativo-Interpretativo' },
        { value: 'multiversoes', label: 'Humanização Multiversões' },
      ],
    },
    PARAFRASEADORES: {
      label: 'Paráfraseadores',
      modelos: [
        { value: 'autoral_ruth', label: 'PARAFRASEADOR ESTILO AUTORAL – DRA. RUTH MONIELLY' },
        { value: 'juridicas_politicas', label: 'Parafraseador Para Área De Ciências Jurídicas E Políticas- Estilo Autoral Da Dra. Ruth Moniélly' },
        { value: 'saude', label: 'Parafraseador Área da Saúde – Estilo Dra. Ruth Monielly' },
        { value: 'educacao', label: 'Parafraseador área da Educação – Estilo autoral- Dra. Ruth Monielly' },
        { value: 'psicologia_psicanalise', label: 'Parafrase Area Da Psicologia E Psicanalíse- Estilo Dra. Ruth Moniélly' },
        { value: 'gestao_negocios', label: 'Parafraseador para escrita em Ciências Sociais Aplicadas – Gestão e Negócios- estilo autoral Dra. Ruth Moniélly' },
        { value: 'artes_comunicacao_cultura', label: 'Parafraseador Para Escrita Em Artes, Comunicação E Cultura' },
        { value: 'agrarias_ambientais', label: 'Parafraseador  Áreas De Ciências Agrárias E Ambientais' },
        { value: 'exatas_engenharias_tecnologias', label: 'Parafraseador Para Áreas De Ciências Exatas, Engenharias E Tecnologias' },
      ],
    },
    COMPLEMENTADOR: {
      label: 'Complementador / Aprimorador',
      modelos: [
        { value: 'argumentativo_reflexivo_critico_autoral', label: 'COMPLEMENTAR TEXTOS NO ESTILO ARGUMENTATIVO/REFLEXIVO E CRÍTICO – autoral de Dra. Ruth Moniélly' },
        { value: 'analitico_critico', label: 'Aprimorador - Estilo Analítico-Crítico' },
        { value: 'academico_critico', label: 'Aprimorador - Estilo Acadêmico-Crítico' }
      ],
    },
  };
  
  const canUseService = () => {
    if (!user || !currentPlan) return false;
    if (currentPlan.character_quota === null) return true;
    const used = (user as any)?.characters_used ?? 0;
    return used < (currentPlan.character_quota ?? 0);
  };

  const getCharCount = (text: string) => text.length;
  const getWordCount = (text: string) => text.trim().split(/\s+/).filter(w => w.length > 0).length;
  const exceedsLimits = () => {
    if (!user || !currentPlan) return false;
    if (user.plan === 'free') {
      const wl = currentPlan.word_limit ?? 200;
      return getWordCount(inputText) > wl;
    }
    if (currentPlan.character_quota === null) return false;
    const used = (user as any)?.characters_used ?? 0;
    return used + getCharCount(inputText) > (currentPlan.character_quota ?? 0);
  };

  const handleUpgrade = (planSlug?: string) => {
    if (user) {
      const slug = planSlug || 'intermediate';
      const interval = billingInterval;
      router.push(`/checkout?plan=${slug}&interval=${interval}`);
    } else {
      setShowAuthModal(true);
    }
  };

  const handleHumanize = async () => {
    if (!user) {
      setShowAuthModal(true);
      return;
    }

    if (inputText.length < MIN_CHARS) {
      toast({
        title: 'Texto muito curto',
        description: `Insira ao menos ${MIN_CHARS} caracteres.`,
        variant: 'destructive',
      });
      return;
    }
    if (inputText.length > MAX_CHARS) {
      toast({
        title: 'Texto muito longo',
        description: `Limite máximo de ${MAX_CHARS} caracteres.`,
        variant: 'destructive',
      });
      return;
    }

    if (!selectedTipo || !selectedModelo) {
      toast({
        title: 'Selecione o tipo e o modelo',
        description: 'Antes de prosseguir, escolha o Tipo e o Modelo desejados.',
        variant: 'destructive',
      });
      return;
    }

    if (exceedsLimits()) {
      toast({
        title: user?.plan === 'free' ? 'Limite de palavras' : 'Limite de caracteres',
        description: user?.plan === 'free'
          ? `Seu plano gratuito permite até ${currentPlan?.word_limit ?? 200} palavras por texto.`
          : 'Seu plano não possui saldo suficiente de caracteres para este texto. Faça upgrade para continuar.',
        variant: "destructive",
      });
      return;
    }

    if (!inputText.trim()) {
      toast({
        title: "Erro",
        description: "Por favor, insira um texto para humanizar.",
        variant: "destructive",
      });
      return;
    }

    setIsLoading(true);
    
    try {
      const response = await fetch('/api/humanize', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${user.id}`,
        },
        body: JSON.stringify({ 
          text: inputText,
          versions: selectedVersions,
          tipo: selectedTipo,
          modelo: selectedModelo,
        }),
      });

      if (!response.ok) {
        throw new Error('Erro ao processar o texto');
      }

      const data = await response.json();
      if (data.humanizedVersions && Array.isArray(data.humanizedVersions)) {
        setOutputVersions(data.humanizedVersions);
        setOutputText(data.humanizedVersions[0] || '');
      } else {
        setOutputText(data.humanizedText || '');
        setOutputVersions([data.humanizedText || '']);
      }
      
      // Refresh user data to update usage count
      await refreshUser();
      
      toast({
        title: "Sucesso!",
        description: "Texto humanizado com sucesso.",
      });
    } catch (error) {
      toast({
        title: "Erro",
        description: "Erro ao humanizar o texto. Tente novamente.",
        variant: "destructive",
      });
    } finally {
      setIsLoading(false);
    }
  };

  const handleCopy = async (text?: string) => {
    const textToCopy = text || outputText;
    if (!textToCopy) return;
    
    try {
      await navigator.clipboard.writeText(textToCopy);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
      
      toast({
        title: "Copiado!",
        description: "Texto copiado para a área de transferência.",
      });
    } catch (error) {
      toast({
        title: "Erro",
        description: "Erro ao copiar o texto.",
        variant: "destructive",
      });
    }
  };

  // Detect route to preselect Tipo
  const pathname = usePathname();
  useEffect(() => {
    if (!pathname) return;
    let routeTipo = '';
    if (pathname.includes('/parafraseador')) routeTipo = 'PARAFRASEADORES';
    else if (pathname.includes('/complementador')) routeTipo = 'COMPLEMENTADOR';
    else if (pathname.includes('/humanizar')) routeTipo = 'HUMANIZADORES';
    if (routeTipo && routeTipo !== selectedTipo) {
      setSelectedTipo(routeTipo);
      setSelectedModelo('');
    }
  }, [pathname]);

  const pageTitle = (() => {
    if (pathname?.includes('/parafraseador')) return 'Parafraseador';
    if (pathname?.includes('/complementador')) return 'Complementador';
    return 'Humanizador';
  })();

  const usagePercentage = (() => {
    if (!user || !currentPlan) return 0;
    if (user.plan === 'free' && currentPlan.humanizations_per_month !== null) {
      return ((user.usage_count ?? 0) / (currentPlan.humanizations_per_month ?? 1)) * 100;
    }
    if (currentPlan.character_quota !== null) {
      return (((user as any).characters_used ?? 0) / (currentPlan.character_quota ?? 1)) * 100;
    }
    return 0;
  })();
  const charCount = getCharCount(inputText);
  const charTooShort = charCount > 0 && charCount < MIN_CHARS;
  const charTooLong = charCount > MAX_CHARS;
  const wordCount = getWordCount(inputText);
  const isOver = exceedsLimits();

  if (!mounted || authLoading || plansLoading) {
    return (
      <div className="min-h-screen bg-gray-50">
        <div className="max-w-screen-2xl mx-auto px-4 sm:px-6 lg:px-8 py-20">
          <div className="h-6 w-48 bg-gray-200 rounded animate-pulse mb-4" />
          <div className="h-4 w-3/4 bg-gray-200 rounded animate-pulse mb-8" />
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            <div className="lg:col-span-1 h-44 bg-gray-100 rounded animate-pulse" />
            <div className="lg:col-span-2 h-[60vh] bg-gray-100 rounded animate-pulse" />
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="max-w-screen-2xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center py-20 mb-12">
          <h1 className="text-3xl lg:text-4xl font-bold text-gray-900 mb-4">
            <span className="text-gradient">{pageTitle}</span> de Textos IA
          </h1>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto">
            Transforme textos gerados por inteligência artificial em conteúdo natural, 
            autêntico e indetectável por sistemas anti-IA.
          </p>
        </div>

        {/* Usage Stats for logged in users */}
        {user && (
          <div className="mb-8 max-w-2xl mx-auto">
            <Card className="bg-white">
              <CardContent className="p-6">
                <div className="flex items-center justify-between mb-4">
                  <div className="flex items-center space-x-2">
                    {currentPlan?.slug === 'professional' ? (
                      <div className="flex items-center space-x-2">
                        <Crown className="h-5 w-5 text-yellow-500" />
                        <span className="font-semibold text-transparent bg-clip-text bg-gradient-to-r from-blue-600 to-red-600">
                          Plano Profissional
                        </span>
                      </div>
                    ) : currentPlan?.slug === 'advanced' ? (
                      <div className="flex items-center space-x-2">
                        <Star className="h-5 w-5 text-yellow-500" />
                        <span className="font-semibold">Plano Avançado</span>
                      </div>
                    ) : currentPlan?.slug === 'intermediate' ? (
                      <div className="flex items-center space-x-2">
                        <Zap className="h-5 w-5 text-blue-600" />
                        <span className="font-semibold">Plano Intermediário</span>
                      </div>
                    ) : currentPlan?.slug === 'free' ? (
                      <div className="flex items-center space-x-2">
                        <User className="h-5 w-5 text-blue-600" />
                        <span className="font-semibold">Plano Gratuito</span>
                      </div>
                    ) : (
                      <div className="flex items-center space-x-2">
                        <User className="h-5 w-5 text-blue-600" />
                        <span className="font-semibold">Plano Básico</span>
                      </div>
                    )}
                  </div>
                  {currentPlan?.slug !== 'professional' && (
                    <Button
                      size="sm"
                      onClick={() => handleUpgrade()}
                      className="bg-gradient-to-r from-blue-600 to-red-600 text-white"
                    >
                      Fazer Upgrade
                    </Button>
                  )}
                </div>
                {currentPlan && user?.plan !== 'free' && currentPlan.character_quota !== null && (
                  <div className="space-y-2">
                    <div className="flex justify-between text-sm">
                      <span>
                        Uso de caracteres: {(user as any).characters_used ?? 0}/{currentPlan.character_quota}
                      </span>
                      <span>
                        {(currentPlan.character_quota ?? 0) - ((user as any).characters_used ?? 0)} restantes
                      </span>
                    </div>
                    <Progress value={Math.min(100, usagePercentage)} className="h-2" />
                  </div>
                )}
                {currentPlan && user?.plan === 'free' && currentPlan.humanizations_per_month !== null && (
                  <div className="space-y-2">
                    <div className="flex justify-between text-sm">
                      <span>
                        Uso mensal: {user.usage_count}/{currentPlan.humanizations_per_month}
                      </span>
                      <span>
                        {(currentPlan.humanizations_per_month ?? 0) - (user.usage_count ?? 0)} restantes
                      </span>
                    </div>
                    <Progress value={Math.min(100, usagePercentage)} className="h-2" />
                    {currentPlan.word_limit && (
                      <p className="text-xs text-gray-500">
                        Limite de {currentPlan.word_limit} palavras por texto
                      </p>
                    )}
                  </div>
                )}
                <p className="text-sm text-gray-500 mt-2">Consumo por texto com base em caracteres.</p>
              </CardContent>
            </Card>
          </div>
        )}

        <div className="grid grid-cols-1 gap-8">
          {/* Input Card */}
          <Card className="bg-white">
            <CardHeader>
              <CardTitle className="flex items-center space-x-2">
                <Bot className="h-5 w-5 text-blue-600" />
                <span>Texto Original (IA)</span>
              </CardTitle>
              <CardDescription>
                Cole aqui o texto gerado por IA que deseja humanizar
              </CardDescription>
            </CardHeader>
            <CardContent>
              {/* Tipo e Modelo */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
                <div className="flex flex-col gap-2">
                  <label className="text-sm font-medium text-gray-700">Tipo</label>
                  <select
                    value={selectedTipo}
                    onChange={(e) => {
                      setSelectedTipo(e.target.value);
                      setSelectedModelo('');
                    }}
                    className="px-3 py-2 border border-gray-300 rounded-md text-sm focus:outline-none focus:ring-2 focus:ring-blue-500 bg-white"
                  >
                    <option value="" disabled>Selecione um tipo...</option>
                    {Object.keys(tiposConfig).map((key) => (
                      <option key={key} value={key}>{tiposConfig[key].label}</option>
                    ))}
                  </select>
                </div>
                <div className="flex flex-col gap-2">
                  <label className="text-sm font-medium text-gray-700">Modelo</label>
                  <select
                    value={selectedModelo}
                    onChange={(e) => setSelectedModelo(e.target.value)}
                    disabled={!selectedTipo}
                    className="px-3 py-2 border border-gray-300 rounded-md text-sm focus:outline-none focus:ring-2 focus:ring-blue-500 bg-white disabled:bg-gray-100 disabled:text-gray-400"
                  >
                    <option value="" disabled>{selectedTipo ? 'Selecione um modelo...' : 'Selecione um tipo antes'}</option>
                    {selectedTipo && tiposConfig[selectedTipo]?.modelos.map((m) => (
                      <option key={m.value} value={m.value}>{m.label}</option>
                    ))}
                  </select>
                </div>
                {selectedTipo && selectedModelo && fallbackStyleBySelection(selectedTipo, selectedModelo) && (
                  <div className="md:col-span-2 -mt-2">
                    <div className="flex items-start gap-2 text-sm text-gray-700 bg-blue-50 border border-blue-200 rounded-md p-3">
                      <div className="mt-0.5 text-blue-600">
                        <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" className="h-4 w-4">
                          <circle cx="12" cy="12" r="10" />
                          <line x1="12" y1="8" x2="12.01" y2="8" />
                          <path d="M11 12h1v4h1" />
                        </svg>
                      </div>
                      <p>{fallbackStyleBySelection(selectedTipo, selectedModelo)}</p>
                    </div>
                  </div>
                )}
              </div>
              <Textarea
                placeholder="Cole seu texto gerado por IA aqui..."
                value={inputText}
                onChange={(e) => {
                  const v = e.target.value;
                  setInputText(v.length > MAX_CHARS ? v.slice(0, MAX_CHARS) : v);
                }}
                disabled={!selectedTipo || !selectedModelo}
                maxLength={MAX_CHARS}
                className={`min-h-[60vh] resize-y ${isOver || charTooShort || charTooLong ? 'border-red-500' : ''} ${!selectedTipo || !selectedModelo ? 'bg-gray-100 cursor-not-allowed' : ''}`}
              />
              {!selectedTipo || !selectedModelo ? (
                <p className="text-sm text-amber-600 mt-2">
                  Para começar, selecione o Tipo e o Modelo acima.
                </p>
              ) : null}
              <div className="flex justify-between items-center mt-4">
                <span className={`text-sm ${isOver || charTooShort || charTooLong ? 'text-red-500' : 'text-gray-500'}`}>
                  {user?.plan === 'free' ? `${wordCount} palavras (${charCount}/${MAX_CHARS} caracteres)` : `${charCount}/${MAX_CHARS} caracteres`} · mínimo {MIN_CHARS}
                  </span>
                {!user ? (
                  <Button 
                    onClick={() => setShowAuthModal(true)}
                    className="bg-blue-600 hover:bg-blue-700 text-white"
                  >
                    <Lock className="mr-2 h-4 w-4" />
                    Entrar para Usar
                  </Button>
                ) : (
                  <div className="space-y-4">
                    {charTooShort && (
                      <p className="text-sm text-red-600">O texto precisa ter pelo menos {MIN_CHARS} caracteres.</p>
                    )}
                    <div className="flex items-center space-x-4">
                      <label className="text-sm font-medium text-gray-700">
                        Versões:
                      </label>
                      <select
                        value={selectedVersions}
                        onChange={(e) => setSelectedVersions(Number(e.target.value))}
                        className="px-3 py-1 border border-gray-300 rounded-md text-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
                      >
                        <option value={1}>1 versão</option>
                        <option value={2}>2 versões</option>
                        <option value={3}>3 versões</option>
                      </select>
                    </div>
                    <Button 
                      onClick={handleHumanize}
                      disabled={Boolean(isLoading || !selectedTipo || !selectedModelo || !inputText.trim() || charTooShort || charTooLong || !canUseService() || isOver)}
                      className="bg-blue-600 hover:bg-blue-700 text-white disabled:opacity-50 w-full"
                    >
                      {isLoading ? 'Humanizando...' : `Gerar ${selectedVersions} ${selectedVersions === 1 ? 'Versão' : 'Versões'}`}
                    </Button>
                  </div>
                )}
              </div>
            </CardContent>
          </Card>

          {/* Output Card */}
          <div className="space-y-6">
            {outputVersions.length > 1 ? (
              outputVersions.map((version, index) => (
                <Card key={index} className="bg-white">
                  <CardHeader>
                    <CardTitle className="flex items-center justify-between">
                      <div className="flex items-center space-x-2">
                        <User className="h-5 w-5 text-green-600" />
                        <span>Versão {index + 1}</span>
                      </div>
                      <div className="flex items-center space-x-2">
                        <div className="px-2 py-1 bg-green-100 text-green-800 rounded-full text-xs font-medium">
                          {version.length} caracteres
                        </div>
                      </div>
                    </CardTitle>
                  </CardHeader>
                  <CardContent>
                    <Textarea
                      value={version}
                      readOnly
                      className="min-h-[40vh] resize-y bg-gray-50"
                    />
                    <div className="flex justify-end mt-4">
                      <Button 
                        onClick={() => handleCopy(version)}
                        variant="outline"
                        size="sm"
                        className="border-green-600 text-green-600 hover:bg-green-50"
                      >
                        {copied ? (
                          <>
                            <CheckCircle className="mr-2 h-4 w-4" />
                            Copiado!
                          </>
                        ) : (
                          <>
                            <Copy className="mr-2 h-4 w-4" />
                            Copiar
                          </>
                        )}
                      </Button>
                    </div>
                  </CardContent>
                </Card>
              ))
            ) : (
              <Card className="bg-white">
            <CardHeader>
              <CardTitle className="flex items-center space-x-2">
                <User className="h-5 w-5 text-green-600" />
                <span>Texto Humanizado</span>
              </CardTitle>
              <CardDescription>
                Resultado humanizado e natural
              </CardDescription>
            </CardHeader>
            <CardContent>
              <Textarea
                placeholder="O texto humanizado aparecerá aqui..."
                value={outputText}
                readOnly
                className="min-h-[60vh] resize-y bg-gray-50"
              />
              <div className="flex justify-between items-center mt-4">
                <span className="text-sm text-gray-500">
                  {outputText.length} caracteres
                </span>
                <Button 
                  onClick={() => handleCopy()}
                  disabled={!outputText}
                  variant="outline"
                  className="border-green-600 text-green-600 hover:bg-green-50"
                >
                  {copied ? (
                    <>
                      <CheckCircle className="mr-2 h-4 w-4" />
                      Copiado!
                    </>
                  ) : (
                    <>
                      <Copy className="mr-2 h-4 w-4" />
                      Copiar Texto
                    </>
                  )}
                </Button>
              </div>
            </CardContent>
          </Card>
            )}
          </div>
        </div>

        {/* Pricing Plans Section */}
        {/* Marketing Section */}
        <div className="mt-20 py-20 bg-gradient-to-br from-blue-50 via-white to-red-50 rounded-3xl shadow-xl">
          <div className="max-w-6xl mx-auto px-8">
            {/* Hero Marketing */}
            <div className="text-center mb-16">
              <h2 className="text-4xl lg:text-5xl font-bold text-gray-900 mb-6">
                Transforme Textos de <span className="text-gradient">IA em Conteúdo Humano</span>
              </h2>
              <p className="text-xl text-gray-600 max-w-4xl mx-auto mb-8">
                Nossa tecnologia avançada garante que seus textos passem despercebidos por qualquer 
                detector de IA, mantendo a naturalidade e autenticidade que você precisa.
              </p>
              <div className="flex flex-col sm:flex-row gap-4 justify-center">
                <Button 
                  onClick={() => setShowAuthModal(true)}
                  size="lg" 
                  className="bg-gradient-to-r from-blue-600 to-red-600 hover:from-blue-700 hover:to-red-700 text-white px-8 py-4 text-lg"
                >
                  Começar Gratuitamente
                  <ArrowRight className="ml-2 h-5 w-5" />
                </Button>
                <Button 
                  size="lg" 
                  variant="outline" 
                  className="border-2 border-blue-600 text-blue-600 hover:bg-blue-50 px-8 py-4 text-lg"
                >
                  Ver Demonstração
                </Button>
              </div>
            </div>

            {/* Benefits Grid */}
            <div className="grid md:grid-cols-3 gap-8 mb-16">
              <div className="bg-white p-8 rounded-2xl shadow-lg hover:shadow-xl transition-shadow">
                <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mb-6 mx-auto">
                  <Shield className="h-8 w-8 text-green-600" />
                </div>
                <h3 className="text-2xl font-bold text-gray-900 mb-4 text-center">100% Indetectável</h3>
                <p className="text-gray-600 text-center mb-4">
                  Nossos textos humanizados passam em todos os detectores de IA do mercado, 
                  incluindo GPTZero, Turnitin e Originality.ai.
                </p>
                <div className="text-center">
                  <span className="inline-flex items-center px-3 py-1 rounded-full text-sm font-medium bg-green-100 text-green-800">
                    ✓ 0% Detecção de IA
                  </span>
                </div>
              </div>

              <div className="bg-white p-8 rounded-2xl shadow-lg hover:shadow-xl transition-shadow">
                <div className="w-16 h-16 bg-blue-100 rounded-full flex items-center justify-center mb-6 mx-auto">
                  <User className="h-8 w-8 text-blue-600" />
                </div>
                <h3 className="text-2xl font-bold text-gray-900 mb-4 text-center">Totalmente Natural</h3>
                <p className="text-gray-600 text-center mb-4">
                  Textos que soam genuinamente humanos, com variações naturais de linguagem 
                  e estruturas de frase autênticas.
                </p>
                <div className="text-center">
                  <span className="inline-flex items-center px-3 py-1 rounded-full text-sm font-medium bg-blue-100 text-blue-800">
                    ✓ 100% Naturalidade
                  </span>
                </div>
              </div>

              <div className="bg-white p-8 rounded-2xl shadow-lg hover:shadow-xl transition-shadow">
                <div className="w-16 h-16 bg-red-100 rounded-full flex items-center justify-center mb-6 mx-auto">
                  <Zap className="h-8 w-8 text-red-600" />
                </div>
                <h3 className="text-2xl font-bold text-gray-900 mb-4 text-center">Rápido e Eficiente</h3>
                <p className="text-gray-600 text-center mb-4">
                  Processamento em segundos, mantendo o significado original enquanto 
                  transforma completamente o estilo de escrita.
                </p>
                <div className="text-center">
                  <span className="inline-flex items-center px-3 py-1 rounded-full text-sm font-medium bg-red-100 text-red-800">
                    ✓ Resultados em até 60s
                  </span>
                </div>
              </div>
            </div>

            {/* Performance Metrics */}
            <div className="bg-white rounded-2xl shadow-lg p-8 mb-16">
              <h3 className="text-2xl font-bold text-center text-gray-900 mb-8">
                Resultados Comprovados
              </h3>
              <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
                <div className="text-center">
                  <div className="text-4xl font-bold text-green-600 mb-2">0%</div>
                  <div className="text-gray-600">Detecção de IA</div>
                </div>
                <div className="text-center">
                  <div className="text-4xl font-bold text-blue-600 mb-2">100%</div>
                  <div className="text-gray-600">Naturalidade</div>
                </div>
                <div className="text-center">
                  <div className="text-4xl font-bold text-red-600 mb-2">98%</div>
                  <div className="text-gray-600">Satisfação</div>
                </div>
                <div className="text-center">
                  <div className="text-4xl font-bold text-purple-600 mb-2">5s</div>
                  <div className="text-gray-600">Tempo Médio</div>
                </div>
              </div>
            </div>

            {/* Target Audiences */}
            <div className="grid md:grid-cols-3 gap-8 mb-16">
              <div className="text-center">
                <div className="w-20 h-20 bg-gradient-to-br from-blue-500 to-blue-600 rounded-full flex items-center justify-center mb-6 mx-auto">
                  <User className="h-10 w-10 text-white" />
                </div>
                <h4 className="text-xl font-bold text-gray-900 mb-4">Para Estudantes</h4>
                <p className="text-gray-600 mb-4">
                  Transforme textos de pesquisa em trabalhos acadêmicos naturais e originais.
                </p>
                <ul className="text-sm text-gray-500 space-y-1">
                  <li>✓ Trabalhos universitários</li>
                  <li>✓ Artigos de pesquisa</li>
                  <li>✓ Ensaios e dissertações</li>
                </ul>
              </div>

              <div className="text-center">
                <div className="w-20 h-20 bg-gradient-to-br from-green-500 to-green-600 rounded-full flex items-center justify-center mb-6 mx-auto">
                  <PenTool className="h-10 w-10 text-white" />
                </div>
                <h4 className="text-xl font-bold text-gray-900 mb-4">Para Redatores</h4>
                <p className="text-gray-600 mb-4">
                  Crie conteúdo profissional autêntico para blogs, redes sociais e marketing.
                </p>
                <ul className="text-sm text-gray-500 space-y-1">
                  <li>✓ Posts para blog</li>
                  <li>✓ Conteúdo para redes sociais</li>
                  <li>✓ E-mails marketing</li>
                </ul>
              </div>

              <div className="text-center">
                <div className="w-20 h-20 bg-gradient-to-br from-red-500 to-red-600 rounded-full flex items-center justify-center mb-6 mx-auto">
                  <Crown className="h-10 w-10 text-white" />
                </div>
                <h4 className="text-xl font-bold text-gray-900 mb-4">Para Professores</h4>
                <p className="text-gray-600 mb-4">
                  Escale a produção de conteúdo mantendo qualidade e autenticidade.
                </p>
                <ul className="text-sm text-gray-500 space-y-1">
                  <li>✓ Conteúdo em escala</li>
                  <li>✓ Documentação técnica</li>
                  <li>✓ Materiais de treinamento</li>
                </ul>
              </div>
            </div>

            {/* Final CTA */}
            <div className="text-center bg-gradient-to-r from-blue-600 to-red-600 rounded-2xl p-8 text-white">
              <h3 className="text-3xl font-bold mb-4">
                Pronto para Criar Conteúdo 100% Humano?
              </h3>
              <p className="text-xl mb-6 opacity-90">
                Junte-se a milhares de usuários que já transformaram seus textos de IA
              </p>
              <div className="flex flex-col sm:flex-row gap-4 justify-center">
                <Button 
                  onClick={() => router.push('#planos')}
                  size="lg" 
                  className="bg-white text-blue-600 hover:bg-gray-100 px-8 py-4 text-lg font-semibold"
                >
                  Ver Planos
                </Button>
              </div>
            </div>
          </div>
        </div>

        <div id="planos" className="mt-20 py-16 bg-white rounded-2xl shadow-lg">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold text-gray-900 mb-4">
              Escolha o <span className="text-gradient">Plano Ideal</span>
            </h2>
            <p className="text-xl text-gray-600 max-w-2xl mx-auto">
              Planos flexíveis para atender suas necessidades de humanização de textos
            </p>
          </div>
          {/* Billing interval toggle */}
          <div className="flex items-center justify-center gap-2 mb-6">
            <button
              type="button"
              onClick={() => setBillingInterval('monthly')}
              className={`px-4 py-2 rounded-full border text-sm ${billingInterval === 'monthly' ? 'bg-blue-600 text-white border-blue-600' : 'bg-white text-gray-700 border-gray-300'}`}
            >
              Mensal
            </button>
            <button
              type="button"
              onClick={() => setBillingInterval('annual')}
              className={`px-4 py-2 rounded-full border text-sm ${billingInterval === 'annual' ? 'bg-blue-600 text-white border-blue-600' : 'bg-white text-gray-700 border-gray-300'}`}
            >
              Anual
            </button>
          </div>

          <div className="grid md:grid-cols-4 gap-8 max-w-6xl mx-auto px-8">
            {plans
              .slice()
              .filter((p) => p.slug !== 'free')
              .sort((a, b) => (((a as any).price_monthly ?? a.price ?? 0) - (((b as any).price_monthly ?? b.price ?? 0))) )
              .map((plan) => {
                const isPopular = plan.slug === 'advanced';
                return (
                  <Card key={plan.id} className={`relative bg-white border-2 ${isPopular ? 'border-blue-500 hover:border-blue-600' : 'border-gray-200 hover:border-blue-300'} transition-colors`}>
                    {isPopular && (
                      <div className="absolute top-3 left-1/2 -translate-x-1/2 transform">
                        <span className="bg-blue-500 text-white px-3 py-1 rounded-full text-xs font-medium shadow-sm">
                          Mais Popular
                        </span>
                      </div>
                    )}
                    <CardHeader className="text-center pb-8">
                      <div className={`mx-auto w-16 h-16 ${isPopular ? 'bg-blue-500' : 'bg-blue-100'} rounded-full flex items-center justify-center mb-4`}>
                        {isPopular ? <Zap className="h-8 w-8 text-white" /> : <User className="h-8 w-8 text-blue-600" />}
                      </div>
                      <CardTitle className="text-2xl font-bold text-gray-900">{plan.name}</CardTitle>
                      <div className="mt-4">
                        {(() => {
                          const monthly = (plan as any).price_monthly ?? plan.price;
                          const annual = (plan as any).price_annual ?? (monthly * 12);
                          const value = billingInterval === 'annual' ? annual : monthly;
                          const suffix = billingInterval === 'annual' ? '/ano' : '/mês';
                          const fullYear = Number(monthly) * 12;
                          const savings = Math.max(0, fullYear - Number(annual));
                          const savingsPct = fullYear > 0 ? Math.round((savings / fullYear) * 100) : 0;
                          return (
                            <div className="flex flex-col items-center gap-1">
                              <div>
                                <span className="text-4xl font-bold text-gray-900">R$ {Number(value).toFixed(2)}</span>
                                <span className="text-gray-500">{suffix}</span>
                              </div>
                              {billingInterval === 'annual' && savings > 0 && (
                                <div className="text-xs text-green-700 bg-green-100 px-2 py-1 rounded-full">
                                  Economize R$ {savings.toFixed(2)} ({savingsPct}%)
                                </div>
                              )}
                            </div>
                          );
                        })()}
                      </div>
                    </CardHeader>
                    <CardContent className="pt-0">
                      <ul className="space-y-4 mb-8">
                        <li className="flex items-center">
                          <CheckCircle className="h-5 w-5 text-green-500 mr-3" />
                          <span>Até {plan.character_quota?.toLocaleString('pt-BR')} caracteres por mês</span>
                        </li>
                        <li className="flex items-center">
                          <CheckCircle className="h-5 w-5 text-green-500 mr-3" />
                          <span>Qualidade profissional</span>
                        </li>
                        <li className="flex items-center">
                          <CheckCircle className="h-5 w-5 text-green-500 mr-3" />
                          <span>Suporte por email</span>
                        </li>
                      </ul>
                      <Button
                        className={`w-full ${isPopular ? 'bg-blue-500 hover:bg-blue-600' : 'bg-blue-600 hover:bg-blue-700'} text-white`}
                        onClick={() => handleUpgrade(plan.slug)}
                      >
                        Escolher {plan.name}
                      </Button>
                    </CardContent>
                  </Card>
                );
            })}
          </div>

          {/* Features comparison */}
          <div className="mt-16 max-w-4xl mx-auto px-8">
            <h3 className="text-2xl font-bold text-center text-gray-900 mb-8">
              Por que escolher nosso humanizador?
            </h3>
            <div className="grid md:grid-cols-3 gap-8">
              <div className="text-center">
                <div className="mx-auto w-12 h-12 bg-blue-100 rounded-lg flex items-center justify-center mb-4">
                  <Bot className="h-6 w-6 text-blue-600" />
                </div>
                <h4 className="text-lg font-semibold mb-2">IA Avançada</h4>
                <p className="text-gray-600">
                  Utilizamos modelos de linguagem treinados especificamente para humanização de textos.
                </p>
              </div>
              <div className="text-center">
                <div className="mx-auto w-12 h-12 bg-green-100 rounded-lg flex items-center justify-center mb-4">
                  <CheckCircle className="h-6 w-6 text-green-600" />
                </div>
                <h4 className="text-lg font-semibold mb-2">100% Natural</h4>
                <p className="text-gray-600">
                  Textos humanizados que passam em todos os detectores de IA do mercado.
                </p>
              </div>
              <div className="text-center">
                <div className="mx-auto w-12 h-12 bg-red-100 rounded-lg flex items-center justify-center mb-4">
                  <AlertCircle className="h-6 w-6 text-red-600" />
                </div>
                <h4 className="text-lg font-semibold mb-2">Preserva o Sentido</h4>
                <p className="text-gray-600">
                  Mantém a mensagem original enquanto torna o texto mais humano e natural.
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
      
      {isLoading && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/30 backdrop-blur-sm">
          <div className="bg-white rounded-xl shadow-2xl p-6 max-w-md w-[90%] text-center border border-gray-100">
            <div className="flex items-center justify-center mb-3">
              <Loader2 className="h-6 w-6 text-blue-600 animate-spin" />
            </div>
            <p className="text-gray-900 font-medium">Processando seu texto…</p>
            <p className="text-gray-600 text-sm mt-1">
              Isso pode levar alguns segundos. Aguarde enquanto nossos agents estão processando seu texto
            </p>
          </div>
        </div>
      )}

      <AuthModal isOpen={showAuthModal} onClose={() => setShowAuthModal(false)} />
    </div>
  );
}
