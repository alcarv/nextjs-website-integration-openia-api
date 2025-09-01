import Navigation from '@/components/Navigation';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import Link from 'next/link';
import { getWhatsAppUrl } from '@/lib/whatsapp';
import { 
  Scale, 
  PenTool, 
  FileText, 
  Users, 
  Briefcase, 
  CheckCircle,
  ArrowRight,
  Shield,
  Clock,
  Award,
  Target,
  BookOpen,
  Gavel
} from 'lucide-react';
import Footer from '@/components/Footer';

const services = [
  {
    icon: BookOpen,
    title: 'Assessoria Acadêmica Completa',
    description: 'Acompanhamento personalizado em todas as etapas da vida acadêmica, com suporte contínuo e soluções sob medida para diferentes níveis de ensino.',
    features: [
      'TCCs (graduação e especialização)',
      'Dissertações (mestrado)',
      'Teses (doutorado)',
      'Pré-projetos e projetos finais'
    ],
    price: 'Valores sob consulta',
    highlight: 'Comprovante de autenticidade incluído',
    guarantee: 'Sem índice de IA e sem plágio'
  },
  {
    icon: Target,
    title: 'Projetos Acadêmicos',
    description: 'Desenvolvimento, estruturação e refinamento de diferentes tipos de projetos exigidos nas universidades.',
    features: [
      'Projetos de Extensão',
      'Projetos Extensionistas',
      'Projetos Integradores',
      'Projetos de Pesquisa e Relatórios Técnicos'
    ],
    price: 'Valores sob consulta',
    highlight: 'Comprovante de autenticidade incluído',
    guarantee: 'Sem índice de IA e sem plágio'
  },
  {
    icon: Award,
    title: 'Produção Científica',
    description: 'Elaboração e aprimoramento de textos de alto nível, com rigor metodológico e profundidade teórica.',
    features: [
      'Artigos Científicos',
      'Papers',
      'Resenhas Críticas',
      'Ensaios Acadêmicos',
      'Trabalhos para congressos'
    ],
    price: 'Valores sob consulta',
    highlight: 'Comprovante de autenticidade incluído',
    guarantee: 'Sem índice de IA e sem plágio'
  },
  {
    icon: Users,
    title: 'Orientação Científica',
    description: 'Suporte direto ao aluno para organização da pesquisa e fortalecimento de ideias.',
    features: [
      'Estruturação metodológica',
      'Definição de objetivos',
      'Acompanhamento durante a escrita',
      'Direcionamento para defesa oral',
      'Pesquisa e definição de materiais',
      'Auxílio personalizado em cada passo'
    ],
    price: 'Valores sob consulta',
    highlight: 'Suporte personalizado contínuo'
  },
  {
    icon: PenTool,
    title: 'Aprimoramento de Textos',
    description: 'Melhoria e reestruturação de trabalhos já iniciados, elevando o nível de qualidade e clareza.',
    features: [
      'Reescrita de trechos frágeis',
      'Aprofundamento teórico',
      'Coesão e coerência textual',
      'Clareza e fluidez argumentativa'
    ],
    price: 'Valores sob consulta',
    highlight: 'Comprovante de autenticidade incluído',
    guarantee: 'Sem índice de IA e sem plágio'
  },
  {
    icon: CheckCircle,
    title: 'Revisão e Normalização',
    description: 'Correção técnica e formatação conforme as principais normas exigidas no meio acadêmico.',
    features: [
      'ABNT',
      'APA (7ª edição)',
      'Vancouver',
      'Ajustes gramaticais e de estilo',
      'Normas institucionais próprias'
    ],
    price: 'Valores sob consulta',
    highlight: 'Formatação profissional garantida'
  },
  {
    icon: PenTool,
    title: 'Humanização Acadêmica',
    subtitle: 'Estilo de escrita da Dra. Ruth Moniélly',
    description: 'Transformação de textos gerados por inteligência artificial em trabalhos consistentes, naturais e autênticos.',
    features: [
      'Paráfrase avançada',
      'Complementação e aprofundamento de conteúdo',
      'Adequação de linguagem acadêmica',
      'Eliminação de marcas artificiais'
    ],
    price: 'Valores sob consulta',
    highlight: 'Transformação completa garantida'
  },
  {
    icon: FileText,
    title: 'Elaboração Completa',
    description: 'Produção acadêmica feita sob demanda, com base em pesquisa confiável e rigor científico.',
    features: [
      'Trabalhos de Conclusão de Curso',
      'Relatórios acadêmicos',
      'Monografias',
      'Estudos de Caso',
      'Dissertações',
      'Teses'
    ],
    price: 'Valores sob consulta',
    highlight: 'Comprovante de autenticidade incluído',
    guarantee: 'Sem índice de IA e sem plágio'
  }
];

const benefits = [
  {
    icon: Award,
    title: 'Expertise Acadêmica',
    description: 'Especialização em produção científica com rigor metodológico e fundamentação teórica sólida.'
  },
  {
    icon: Shield,
    title: 'Originalidade Garantida',
    description: 'Todos os trabalhos com comprovante de autenticidade, sem plágio e sem índice de IA.'
  },
  {
    icon: Clock,
    title: 'Prazos Respeitados',
    description: 'Entregas pontuais com acompanhamento personalizado em todas as etapas.'
  },
  {
    icon: Target,
    title: 'Qualidade Premium',
    description: 'Padrão de excelência acadêmica com supervisão técnica especializada.'
  }
];

export default function ServicosPage() {
  return (
    <div className="min-h-screen bg-white">
      <Navigation />
      
      {/* Hero Section */}
      <section className="gradient-bg py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h1 className="text-4xl lg:text-5xl font-bold text-gray-900 mb-6">
            Serviços <span className="text-gradient">Acadêmicos</span>
          </h1>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto mb-8">
            Assessoria acadêmica especializada com rigor metodológico, originalidade garantida 
            e suporte personalizado em todas as etapas da sua jornada acadêmica.
          </p>
          <Button
            asChild
            size="lg"
            className="bg-blue-600 hover:bg-blue-700 text-white"
          >
            <Link
              href={getWhatsAppUrl('Olá! Gostaria de solicitar um orçamento')}
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center"
            >
              Solicitar Orçamento
              <ArrowRight className="ml-2 h-5 w-5" />
            </Link>
          </Button>
        </div>
      </section>

      {/* Services Grid */}
      <section className="py-20 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            {services.map((service, index) => {
              const IconComponent = service.icon;
              return (
                <Card key={index} className="bg-white hover:shadow-xl transition-all duration-300 border-0 shadow-lg">
                  <CardHeader className="pb-4">
                    <div className="flex items-center space-x-3 mb-4">
                      <div className="p-3 bg-blue-100 rounded-xl">
                        <IconComponent className="h-8 w-8 text-blue-600" />
                      </div>
                      <div>
                        <CardTitle className="text-xl text-gray-900">{service.title}</CardTitle>
                        {service.subtitle && (
                          <div className="text-sm text-gray-600 mt-1">{service.subtitle}</div>
                        )}
                        <div className="text-sm text-green-600 font-medium mt-1">
                          {service.highlight}
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
                      {service.guarantee && (
                        <div className="flex items-center space-x-2 mb-4 p-3 bg-green-50 rounded-lg">
                          <Shield className="h-4 w-4 text-green-600" />
                          <span className="text-sm text-green-700">{service.guarantee}</span>
                        </div>
                      )}
                      <Button
                        asChild
                        className="w-full bg-blue-600 hover:bg-blue-700 text-white"
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

      {/* Benefits Section */}
      <section className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-3xl lg:text-4xl font-bold text-gray-900 mb-4">
              Por que escolher nossa <span className="text-gradient">assessoria</span>?
            </h2>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              Excelência acadêmica com rigor metodológico e garantia de originalidade.
            </p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
            {benefits.map((benefit, index) => {
              const IconComponent = benefit.icon;
              return (
                <div key={index} className="text-center">
                  <div className="mx-auto w-16 h-16 bg-blue-100 rounded-full flex items-center justify-center mb-6">
                    <IconComponent className="h-8 w-8 text-blue-600" />
                  </div>
                  <h3 className="text-xl font-bold text-gray-900 mb-4">{benefit.title}</h3>
                  <p className="text-gray-600">{benefit.description}</p>
                </div>
              );
            })}
          </div>
        </div>
      </section>

      {/* Process Section */}
      <section className="py-20 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-3xl lg:text-4xl font-bold text-gray-900 mb-4">
              Como <span className="text-gradient">trabalhamos</span>
            </h2>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              Processo estruturado e transparente para garantir os melhores resultados.
            </p>
          </div>

          <div className="grid md:grid-cols-4 gap-8">
            {[
              { step: '01', title: 'Briefing', description: 'Análise detalhada dos requisitos acadêmicos e objetivos do trabalho.' },
              { step: '02', title: 'Planejamento', description: 'Estruturação metodológica e cronograma personalizado de execução.' },
              { step: '03', title: 'Produção', description: 'Desenvolvimento com rigor científico e acompanhamento contínuo.' },
              { step: '04', title: 'Entrega', description: 'Revisão final, formatação e entrega com comprovantes de originalidade.' }
            ].map((process, index) => (
              <div key={index} className="text-center">
                <div className="mx-auto w-16 h-16 bg-gradient-to-r from-blue-600 to-red-600 rounded-full flex items-center justify-center mb-6">
                  <span className="text-white font-bold text-lg">{process.step}</span>
                </div>
                <h3 className="text-xl font-bold text-gray-900 mb-4">{process.title}</h3>
                <p className="text-gray-600">{process.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 bg-gradient-to-r from-blue-600 to-red-600">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="text-3xl lg:text-4xl font-bold text-white mb-6">
            Precisa de assessoria acadêmica especializada?
          </h2>
          <p className="text-xl text-white/90 mb-8">
            Entre em contato e descubra como podemos ajudar você a alcançar a excelência acadêmica.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Button
              asChild
              size="lg"
              className="bg-white text-blue-600 hover:bg-gray-100"
            >
              <Link
                href={getWhatsAppUrl('Olá! Gostaria de solicitar uma assessoria acadêmica')}
                target="_blank"
                rel="noopener noreferrer"
              >
                Solicitar Assessoria
              </Link>
            </Button>
            <Button
              asChild
              size="lg"
              variant="outline"
              className="border-white text-white hover:bg-white hover:text-blue-600"
            >
              <Link
                href={getWhatsAppUrl('Olá! Gostaria de solicitar um orçamento para serviços acadêmicos')}
                target="_blank"
                rel="noopener noreferrer"
              >
                Solicitar Orçamento
              </Link>
            </Button>
          </div>
        </div>
      </section>
      <Footer />
    </div>
  );
}