import Navigation from '@/components/Navigation';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import Link from 'next/link';
import { getWhatsAppUrl } from '@/lib/whatsapp';
import {
  PenTool,
  Target,
  TrendingUp,
  Users,
  Mail,
  Globe,
  CheckCircle,
  ArrowRight,
  Star,
  Zap,
  BarChart3,
  MessageSquare,
  Eye,
  Heart
} from 'lucide-react';
import Footer from '@/components/Footer';

const copywritingServices = [
  {
    icon: Target,
    title: 'Sales Pages',
    description: 'Páginas de vendas que convertem visitantes em clientes com copy persuasivo e estrutura otimizada.',
    features: [
      'Headlines irresistíveis',
      'Estrutura AIDA/PAS',
      'Prova social estratégica',
      'Call-to-actions otimizados',
      'Testes A/B inclusos'
    ],
    price: 'A partir de R$ 800',
    conversion: 'Até 35% de conversão'
  },
  {
    icon: Mail,
    title: 'E-mail Marketing',
    description: 'Sequências de e-mail que nutrem leads e geram vendas consistentes no piloto automático.',
    features: [
      'Sequências de boas-vindas',
      'E-mails de vendas',
      'Newsletters engajantes',
      'Automações personalizadas',
      'Segmentação avançada'
    ],
    price: 'A partir de R$ 400',
    conversion: 'Open rate de 45%+'
  },
  {
    icon: Globe,
    title: 'Conteúdo Digital',
    description: 'Conteúdo estratégico para redes sociais, blogs e sites que engaja e converte.',
    features: [
      'Posts para redes sociais',
      'Artigos para blog/SEO',
      'Scripts para vídeos',
      'Legendas persuasivas',
      'Storytelling estratégico'
    ],
    price: 'A partir de R$ 200',
    conversion: 'Engajamento 3x maior'
  },
  {
    icon: MessageSquare,
    title: 'Anúncios Pagos',
    description: 'Copy para anúncios no Google, Facebook e Instagram que maximizam ROI e reduzem CPC.',
    features: [
      'Headlines para Google Ads',
      'Copy para Facebook/Instagram',
      'Anúncios para YouTube',
      'Landing pages para ads',
      'Otimização contínua'
    ],
    price: 'A partir de R$ 300',
    conversion: 'ROI médio de 400%'
  },
  {
    icon: Users,
    title: 'Funis de Vendas',
    description: 'Funis completos que guiam prospects da descoberta até a compra de forma natural.',
    features: [
      'Mapeamento da jornada',
      'Iscas digitais atrativas',
      'Sequências de nutrição',
      'Páginas de conversão',
      'Follow-up estratégico'
    ],
    price: 'A partir de R$ 1.200',
    conversion: 'Conversão de 15-25%'
  },
  {
    icon: BarChart3,
    title: 'Consultoria em Copy',
    description: 'Análise e otimização dos seus materiais existentes para maximizar resultados.',
    features: [
      'Auditoria completa',
      'Análise de concorrentes',
      'Estratégia personalizada',
      'Treinamento da equipe',
      'Acompanhamento mensal'
    ],
    price: 'A partir de R$ 600',
    conversion: 'Melhoria de 50%+ nos KPIs'
  }
];

const results = [
  {
    metric: '300%+',
    description: 'Aumento médio em conversões',
    icon: TrendingUp
  },
  {
    metric: '45%+',
    description: 'Taxa de abertura de e-mails',
    icon: Mail
  },
  {
    metric: '400%',
    description: 'ROI médio em campanhas',
    icon: BarChart3
  },
  {
    metric: '98%',
    description: 'Satisfação dos clientes',
    icon: Heart
  }
];

const testimonials = [
  {
    name: 'Maria Silva',
    company: 'E-commerce Fashion',
    text: 'As sales pages criadas aumentaram nossas vendas em 280% no primeiro mês. Copy excepcional!',
    rating: 5
  },
  {
    name: 'João Santos',
    company: 'Consultoria Empresarial',
    text: 'O funil de vendas desenvolvido gerou mais leads qualificados do que conseguimos processar.',
    rating: 5
  },
  {
    name: 'Ana Costa',
    company: 'Curso Online',
    text: 'Os e-mails de vendas têm uma taxa de conversão impressionante. Investimento que se paga sozinho.',
    rating: 5
  }
];

export default function CopywritingPage() {
  return (
    <div className="min-h-screen bg-white">
      <Navigation />
      
      {/* Hero Section */}
      <section className="gradient-bg py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid lg:grid-cols-2 gap-12 items-center">
            <div>
              <h1 className="text-4xl lg:text-6xl font-bold text-gray-900 mb-6">
                <span className="text-gradient">Copywriting</span> que{' '}
                <span className="text-gradient">Converte</span>
              </h1>
              <p className="text-xl text-gray-600 mb-8 leading-relaxed">
                Transforme palavras em resultados. Copy estratégico que conecta com seu público, 
                gera confiança e multiplica suas vendas de forma consistente.
              </p>
              <div className="flex flex-col sm:flex-row gap-4">
                <Button size="lg" className="bg-blue-600 hover:bg-blue-700 text-white">
                  Solicitar Proposta
                  <ArrowRight className="ml-2 h-5 w-5" />
                </Button>
                <Button size="lg" variant="outline" className="border-blue-600 text-blue-600 hover:bg-blue-50">
                  Ver Portfólio
                  <Eye className="ml-2 h-5 w-5" />
                </Button>
              </div>
            </div>
            
            <div className="relative">
              <div className="bg-white rounded-2xl shadow-xl p-8">
                <h3 className="text-2xl font-bold text-gray-900 mb-6">Resultados Comprovados</h3>
                <div className="grid grid-cols-2 gap-6">
                  {results.map((result, index) => {
                    const IconComponent = result.icon;
                    return (
                      <div key={index} className="text-center">
                        <div className="mx-auto w-12 h-12 bg-blue-100 rounded-full flex items-center justify-center mb-3">
                          <IconComponent className="h-6 w-6 text-blue-600" />
                        </div>
                        <div className="text-2xl font-bold text-blue-600 mb-1">{result.metric}</div>
                        <div className="text-sm text-gray-600">{result.description}</div>
                      </div>
                    );
                  })}
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Services Section */}
      <section className="py-20 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-3xl lg:text-4xl font-bold text-gray-900 mb-4">
              Serviços de <span className="text-gradient">Copywriting</span>
            </h2>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              Copy estratégico para cada etapa da jornada do cliente, desde a descoberta até a fidelização.
            </p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            {copywritingServices.map((service, index) => {
              const IconComponent = service.icon;
              return (
                <Card key={index} className="bg-white hover:shadow-xl transition-all duration-300 border-0 shadow-lg">
                  <CardHeader className="pb-4">
                    <div className="flex items-center space-x-3 mb-4">
                      <div className="p-3 bg-gradient-to-r from-blue-600 to-red-600 rounded-xl">
                        <IconComponent className="h-6 w-6 text-white" />
                      </div>
                      <div>
                        <CardTitle className="text-xl text-gray-900">{service.title}</CardTitle>
                        <div className="text-sm text-green-600 font-medium mt-1">
                          {service.conversion}
                        </div>
                      </div>
                    </div>
                    <CardDescription className="text-gray-600 text-base leading-relaxed">
                      {service.description}
                    </CardDescription>
                  </CardHeader>
                  <CardContent className="pt-0">
                    <ul className="space-y-3 mb-6">
                      {service.features.map((feature, idx) => (
                        <li key={idx} className="flex items-start space-x-3">
                          <CheckCircle className="h-5 w-5 text-green-500 mt-0.5 flex-shrink-0" />
                          <span className="text-gray-700">{feature}</span>
                        </li>
                      ))}
                    </ul>
                    <div className="border-t pt-4">
                      <div className="flex justify-between items-center mb-4">
                        <span className="text-lg font-semibold text-gray-900">{service.price}</span>
                      </div>
                      <Button
                        asChild
                        className="w-full bg-gradient-to-r from-blue-600 to-red-600 hover:from-blue-700 hover:to-red-700 text-white"
                      >
                        <Link
                          href={getWhatsAppUrl(`Olá! Gostaria de solicitar um orçamento para ${service.title}`)}
                          target="_blank"
                          rel="noopener noreferrer"
                        >
                          Solicitar Orçamento
                        </Link>
                      </Button>
                    </div>
                  </CardContent>
                </Card>
              );
            })}
          </div>
        </div>
      </section>

      {/* Process Section */}
      <section className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-3xl lg:text-4xl font-bold text-gray-900 mb-4">
              Processo de <span className="text-gradient">Criação</span>
            </h2>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              Metodologia comprovada que garante copy de alta conversão para seu negócio.
            </p>
          </div>

          <div className="grid md:grid-cols-5 gap-8">
            {[
              { step: '01', title: 'Research', description: 'Análise profunda do público, mercado e concorrência.' },
              { step: '02', title: 'Estratégia', description: 'Definição da mensagem central e tom de voz ideal.' },
              { step: '03', title: 'Criação', description: 'Desenvolvimento do copy seguindo técnicas comprovadas.' },
              { step: '04', title: 'Teste', description: 'Validação e otimização baseada em dados reais.' },
              { step: '05', title: 'Entrega', description: 'Copy finalizado com guia de implementação.' }
            ].map((process, index) => (
              <div key={index} className="text-center">
                <div className="mx-auto w-16 h-16 bg-gradient-to-r from-blue-600 to-red-600 rounded-full flex items-center justify-center mb-6">
                  <span className="text-white font-bold text-lg">{process.step}</span>
                </div>
                <h3 className="text-lg font-bold text-gray-900 mb-3">{process.title}</h3>
                <p className="text-gray-600 text-sm">{process.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Testimonials Section */}
      <section className="py-20 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-3xl lg:text-4xl font-bold text-gray-900 mb-4">
              O que nossos <span className="text-gradient">clientes</span> dizem
            </h2>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              Resultados reais de empresas que transformaram seus negócios com nosso copywriting.
            </p>
          </div>

          <div className="grid md:grid-cols-3 gap-8">
            {testimonials.map((testimonial, index) => (
              <Card key={index} className="bg-white border-0 shadow-lg">
                <CardContent className="p-8">
                  <div className="flex mb-4">
                    {[...Array(testimonial.rating)].map((_, i) => (
                      <Star key={i} className="h-5 w-5 text-yellow-400 fill-current" />
                    ))}
                  </div>
                  <p className="text-gray-600 mb-6 italic">&quot;{testimonial.text}&quot;</p>
                  <div>
                    <div className="font-semibold text-gray-900">{testimonial.name}</div>
                    <div className="text-sm text-gray-500">{testimonial.company}</div>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 bg-gradient-to-r from-blue-600 to-red-600">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="text-3xl lg:text-4xl font-bold text-white mb-6">
            Pronto para multiplicar suas vendas?
          </h2>
          <p className="text-xl text-white/90 mb-8">
            Vamos criar copy que transforma visitantes em clientes fiéis e aumenta seu faturamento.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Button
              asChild
              size="lg"
              className="bg-white text-blue-600 hover:bg-gray-100"
            >
              <Link
                href={getWhatsAppUrl('Olá! Gostaria de começar um projeto de copywriting')}
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center"
              >
                <Zap className="mr-2 h-5 w-5" />
                Começar Projeto Agora
              </Link>
            </Button>
            <Button
              asChild
              size="lg"
              variant="outline"
              className="border-white text-white hover:bg-white hover:text-blue-600"
            >
              <Link
                href={getWhatsAppUrl('Olá! Gostaria de agendar uma conversa sobre copywriting')}
                target="_blank"
                rel="noopener noreferrer"
              >
                Agendar Conversa
              </Link>
            </Button>
          </div>
        </div>
      </section>
      <Footer />
    </div>
  );
}