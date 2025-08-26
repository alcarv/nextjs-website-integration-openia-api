'use client';

import { useState } from 'react';
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
  Infinity as InfinityIcon,
  Shield,
  ArrowRight,
  PenTool,
} from 'lucide-react';
import { useToast } from '@/hooks/use-toast';
import { useAuth } from '@/contexts/AuthContext';
import AuthModal from '@/components/AuthModal';
import { Progress } from '@/components/ui/progress';

export default function HumanizeText() {
  const [inputText, setInputText] = useState('');
  const [outputText, setOutputText] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [copied, setCopied] = useState(false);
  const [showAuthModal, setShowAuthModal] = useState(false);
  const { toast } = useToast();
  const { user, refreshUser } = useAuth();

  const FREE_LIMIT = 3;
  const FREE_WORD_LIMIT = 200;
  
  const canUseService = () => {
    if (!user) return false;
    if (user.plan === 'premium') return true;
    return user.usage_count < FREE_LIMIT;
  };

  const getWordCount = (text: string) => {
    return text.trim().split(/\s+/).filter(word => word.length > 0).length;
  };

  const exceedsWordLimit = () => {
    if (!user || user.plan === 'premium') return false;
    return getWordCount(inputText) > FREE_WORD_LIMIT;
  };

  const handleHumanize = async () => {
    if (!user) {
      setShowAuthModal(true);
      return;
    }

    if (!canUseService()) {
      toast({
        title: "Limite atingido",
        description: "Você atingiu o limite de uso gratuito. Faça upgrade para continuar.",
        variant: "destructive",
      });
      return;
    }

    if (exceedsWordLimit()) {
      toast({
        title: "Limite de palavras",
        description: `Usuários gratuitos podem humanizar até ${FREE_WORD_LIMIT} palavras por vez. Faça upgrade para textos maiores.`,
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
          wordCount: getWordCount(inputText)
        }),
      });

      if (!response.ok) {
        throw new Error('Erro ao processar o texto');
      }

      const data = await response.json();
      setOutputText(data.humanizedText);
      
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

  const handleCopy = async () => {
    if (!outputText) return;
    
    try {
      await navigator.clipboard.writeText(outputText);
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

  const usagePercentage = user ? (user.usage_count / FREE_LIMIT) * 100 : 0;
  const wordCount = getWordCount(inputText);
  const isOverWordLimit = user && user.plan === 'free' && wordCount > FREE_WORD_LIMIT;

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center py-20 mb-12">
          <h1 className="text-3xl lg:text-4xl font-bold text-gray-900 mb-4">
            <span className="text-gradient">Humanizador</span> de Textos IA
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
                    {user.plan === 'premium' ? (
                      <div className="flex items-center space-x-2">
                        <Crown className="h-5 w-5 text-yellow-500" />
                        <span className="font-semibold text-transparent bg-clip-text bg-gradient-to-r from-blue-600 to-red-600">
                          Plano Premium
                        </span>
                      </div>
                    ) : (
                      <>
                        <User className="h-5 w-5 text-blue-600" />
                        <span className="font-semibold">Plano Gratuito</span>
                      </>
                    )}
                  </div>
                  {user.plan === 'free' && (
                    <Button size="sm" className="bg-gradient-to-r from-blue-600 to-red-600 text-white">
                      Fazer Upgrade
                    </Button>
                  )}
                </div>
                
                {user.plan === 'free' && (
                  <div className="space-y-2">
                    <div className="flex justify-between text-sm">
                      <span>Uso mensal: {user.usage_count}/{FREE_LIMIT}</span>
                      <span>{FREE_LIMIT - user.usage_count} restantes</span>
                    </div>
                    <Progress value={usagePercentage} className="h-2" />
                    <p className="text-xs text-gray-500">
                      Limite de {FREE_WORD_LIMIT} palavras por texto no plano gratuito
                    </p>
                  </div>
                )}
                
                {user.plan === 'premium' && (
                  <p className="text-sm text-green-600">✓ Uso ilimitado ativo</p>
                )}
              </CardContent>
            </Card>
          </div>
        )}

        <div className="grid lg:grid-cols-2 gap-8">
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
              <Textarea
                placeholder="Cole seu texto gerado por IA aqui..."
                value={inputText}
                onChange={(e) => setInputText(e.target.value)}
                className={`min-h-[300px] resize-none ${isOverWordLimit ? 'border-red-500' : ''}`}
              />
              <div className="flex justify-between items-center mt-4">
                <span className={`text-sm ${isOverWordLimit ? 'text-red-500' : 'text-gray-500'}`}>
                  {wordCount} palavras ({inputText.length} caracteres)
                  {isOverWordLimit && (
                    <span className="block text-xs">
                      Limite: {FREE_WORD_LIMIT} palavras para plano gratuito
                    </span>
                  )}
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
                  <Button 
                    onClick={handleHumanize}
                    disabled={isLoading || !inputText.trim() || !canUseService() || isOverWordLimit}
                    className="bg-blue-600 hover:bg-blue-700 text-white disabled:opacity-50"
                  >
                    {isLoading ? 'Humanizando...' : 'Humanizar Texto'}
                  </Button>
                )}
              </div>
            </CardContent>
          </Card>

          {/* Output Card */}
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
                className="min-h-[300px] resize-none bg-gray-50"
              />
              <div className="flex justify-between items-center mt-4">
                <span className="text-sm text-gray-500">
                  {outputText.length} caracteres
                </span>
                <Button 
                  onClick={handleCopy}
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
                    ✓ Resultados em 5s
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
                <h4 className="text-xl font-bold text-gray-900 mb-4">Para Profissionais</h4>
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
                <h4 className="text-xl font-bold text-gray-900 mb-4">Para Empresas</h4>
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
                  onClick={() => setShowAuthModal(true)}
                  size="lg" 
                  className="bg-white text-blue-600 hover:bg-gray-100 px-8 py-4 text-lg font-semibold"
                >
                  Começar Agora - Grátis
                </Button>
                <div className="flex items-center justify-center space-x-4 text-sm opacity-90">
                  <span>✓ Sem cartão de crédito</span>
                  <span>✓ 3 usos gratuitos</span>
                  <span>✓ Resultados instantâneos</span>
                </div>
              </div>
            </div>
          </div>
        </div>

        <div className="mt-20 py-16 bg-white rounded-2xl shadow-lg">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold text-gray-900 mb-4">
              Escolha o <span className="text-gradient">Plano Ideal</span>
            </h2>
            <p className="text-xl text-gray-600 max-w-2xl mx-auto">
              Planos flexíveis para atender suas necessidades de humanização de textos
            </p>
          </div>

          <div className="grid md:grid-cols-3 gap-8 max-w-5xl mx-auto px-8">
            {/* Free Plan */}
            <Card className="relative bg-white border-2 border-gray-200 hover:border-blue-300 transition-colors">
              <CardHeader className="text-center pb-8">
                <div className="mx-auto w-16 h-16 bg-blue-100 rounded-full flex items-center justify-center mb-4">
                  <User className="h-8 w-8 text-blue-600" />
                </div>
                <CardTitle className="text-2xl font-bold text-gray-900">Gratuito</CardTitle>
                <div className="mt-4">
                  <span className="text-4xl font-bold text-gray-900">R$ 0</span>
                  <span className="text-gray-500">/mês</span>
                </div>
              </CardHeader>
              <CardContent className="pt-0">
                <ul className="space-y-4 mb-8">
                  <li className="flex items-center">
                    <CheckCircle className="h-5 w-5 text-green-500 mr-3" />
                    <span>3 humanizações por mês</span>
                  </li>
                  <li className="flex items-center">
                    <CheckCircle className="h-5 w-5 text-green-500 mr-3" />
                    <span>Até 200 palavras por texto</span>
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
                  onClick={() => setShowAuthModal(true)}
                  className="w-full bg-blue-600 hover:bg-blue-700 text-white"
                >
                  {user ? 'Plano Atual' : 'Começar Grátis'}
                </Button>
              </CardContent>
            </Card>

            {/* Pro Plan */}
            <Card className="relative bg-white border-2 border-blue-500 hover:border-blue-600 transition-colors">
              <div className="absolute -top-4 left-1/2 transform -translate-x-1/2">
                <span className="bg-blue-500 text-white px-4 py-1 rounded-full text-sm font-medium">
                  Mais Popular
                </span>
              </div>
              <CardHeader className="text-center pb-8">
                <div className="mx-auto w-16 h-16 bg-blue-500 rounded-full flex items-center justify-center mb-4">
                  <Zap className="h-8 w-8 text-white" />
                </div>
                <CardTitle className="text-2xl font-bold text-gray-900">Pro</CardTitle>
                <div className="mt-4">
                  <span className="text-4xl font-bold text-gray-900">R$ 29</span>
                  <span className="text-gray-500">/mês</span>
                </div>
              </CardHeader>
              <CardContent className="pt-0">
                <ul className="space-y-4 mb-8">
                  <li className="flex items-center">
                    <CheckCircle className="h-5 w-5 text-green-500 mr-3" />
                    <span>100 humanizações por mês</span>
                  </li>
                  <li className="flex items-center">
                    <CheckCircle className="h-5 w-5 text-green-500 mr-3" />
                    <span>Até 2.000 palavras por texto</span>
                  </li>
                  <li className="flex items-center">
                    <CheckCircle className="h-5 w-5 text-green-500 mr-3" />
                    <span>Processamento prioritário</span>
                  </li>
                  <li className="flex items-center">
                    <CheckCircle className="h-5 w-5 text-green-500 mr-3" />
                    <span>Suporte prioritário</span>
                  </li>
                  <li className="flex items-center">
                    <CheckCircle className="h-5 w-5 text-green-500 mr-3" />
                    <span>Histórico de textos</span>
                  </li>
                </ul>
                <Button className="w-full bg-blue-500 hover:bg-blue-600 text-white">
                  Escolher Pro
                </Button>
              </CardContent>
            </Card>

            {/* Premium Plan */}
            <Card className="relative bg-white border-2 border-gradient-to-r from-blue-600 to-red-600 hover:shadow-lg transition-shadow">
              <CardHeader className="text-center pb-8">
                <div className="mx-auto w-16 h-16 bg-gradient-to-r from-blue-600 to-red-600 rounded-full flex items-center justify-center mb-4">
                  <Crown className="h-8 w-8 text-white" />
                </div>
                <CardTitle className="text-2xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-blue-600 to-red-600">
                  Premium
                </CardTitle>
                <div className="mt-4">
                  <span className="text-4xl font-bold text-gray-900">R$ 79</span>
                  <span className="text-gray-500">/mês</span>
                </div>
              </CardHeader>
              <CardContent className="pt-0">
                <ul className="space-y-4 mb-8">
                  <li className="flex items-center">
                    <InfinityIcon className="h-5 w-5 text-blue-600 mr-3" />
                    <span>Humanizações ilimitadas</span>
                  </li>
                  <li className="flex items-center">
                    <CheckCircle className="h-5 w-5 text-green-500 mr-3" />
                    <span>Textos de qualquer tamanho</span>
                  </li>
                  <li className="flex items-center">
                    <CheckCircle className="h-5 w-5 text-green-500 mr-3" />
                    <span>Processamento instantâneo</span>
                  </li>
                  <li className="flex items-center">
                    <CheckCircle className="h-5 w-5 text-green-500 mr-3" />
                    <span>Suporte 24/7</span>
                  </li>
                  <li className="flex items-center">
                    <CheckCircle className="h-5 w-5 text-green-500 mr-3" />
                    <span>API de integração</span>
                  </li>
                  <li className="flex items-center">
                    <Star className="h-5 w-5 text-yellow-500 mr-3" />
                    <span>Consultoria personalizada</span>
                  </li>
                </ul>
                <Button className="w-full bg-gradient-to-r from-blue-600 to-red-600 hover:from-blue-700 hover:to-red-700 text-white">
                  Escolher Premium
                </Button>
              </CardContent>
            </Card>
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
      
      <AuthModal isOpen={showAuthModal} onClose={() => setShowAuthModal(false)} />
    </div>
  );
}