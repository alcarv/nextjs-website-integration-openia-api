import Navigation from '@/components/Navigation';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
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

const services = [
  {
    icon: Scale,
    title: 'Consultoria Jurídica',
    description: 'Orientação especializada em diversas áreas do direito com foco em resultados práticos e soluções eficientes.',
    features: [
      'Direito Empresarial e Societário',
      'Direito Civil e Contratos',
      'Direito Trabalhista',
      'Consultoria Preventiva',
      'Análise de Riscos Jurídicos',
      'Compliance Empresarial'
    ],
    price: 'A partir de R$ 200/hora',
    highlight: 'Mais de 10 anos de experiência'
  },
  {
    icon: PenTool,
    title: 'Copywriting Profissional',
    description: 'Textos persuasivos que convertem e engajam seu público-alvo, aumentando suas vendas e resultados.',
    features: [
      'Sales Pages de Alta Conversão',
      'E-mail Marketing Estratégico',
      'Conteúdo para Redes Sociais',
      'Textos Publicitários',
      'Landing Pages',
      'Sequências de Vendas'
    ],
    price: 'A partir de R$ 150/projeto',
    highlight: 'ROI comprovado de até 300%'
  },
  {
    icon: FileText,
    title: 'Redação Jurídica',
    description: 'Documentos e peças jurídicas elaborados com precisão técnica, clareza e fundamentação sólida.',
    features: [
      'Contratos Personalizados',
      'Petições e Recursos',
      'Pareceres Jurídicos',
      'Documentos Empresariais',
      'Termos de Uso e Políticas',
      'Revisão de Documentos'
    ],
    price: 'A partir de R$ 100/documento',
    highlight: '98% de aprovação judicial'
  },
  {
    icon: Users,
    title: 'Treinamentos Corporativos',
    description: 'Capacitação especializada em comunicação jurídica e técnicas de copywriting para equipes.',
    features: [
      'Workshops Presenciais',
      'Palestras Motivacionais',
      'Treinamento Online',
      'Consultoria em Equipe',
      'Material Didático Exclusivo',
      'Acompanhamento Pós-Treinamento'
    ],
    price: 'A partir de R$ 500/evento',
    highlight: 'Satisfação de 95% dos participantes'
  },
  {
    icon: Briefcase,
    title: 'Assessoria Empresarial',
    description: 'Suporte completo para empresas em questões jurídicas e comunicacionais estratégicas.',
    features: [
      'Compliance Empresarial',
      'Due Diligence Jurídica',
      'Estratégia de Comunicação',
      'Gestão de Riscos',
      'Auditoria de Processos',
      'Consultoria Estratégica'
    ],
    price: 'Planos mensais a partir de R$ 1.500',
    highlight: 'Redução de 80% em riscos jurídicos'
  },
  {
    icon: Shield,
    title: 'Proteção de Marca e PI',
    description: 'Proteção completa da sua propriedade intelectual e estratégias de marca no ambiente digital.',
    features: [
      'Registro de Marcas',
      'Proteção de Propriedade Intelectual',
      'Contratos de Licenciamento',
      'Defesa contra Concorrência Desleal',
      'Monitoramento de Marca',
      'Estratégias de Proteção Digital'
    ],
    price: 'A partir de R$ 800/processo',
    highlight: '100% de sucesso em registros'
  }
];

const benefits = [
  {
    icon: Award,
    title: 'Expertise Comprovada',
    description: 'Mais de 10 anos de experiência combinando direito e comunicação estratégica.'
  },
  {
    icon: Target,
    title: 'Resultados Mensuráveis',
    description: 'Foco em ROI e resultados concretos para seu negócio e casos jurídicos.'
  },
  {
    icon: Clock,
    title: 'Agilidade e Eficiência',
    description: 'Prazos cumpridos e processos otimizados para máxima eficiência.'
  },
  {
    icon: Shield,
    title: 'Confidencialidade Total',
    description: 'Sigilo profissional absoluto e proteção de dados garantida.'
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
            Nossos <span className="text-gradient">Serviços</span>
          </h1>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto mb-8">
            Soluções completas que combinam expertise jurídica com estratégias de comunicação 
            inovadoras para garantir os melhores resultados para nossos clientes.
          </p>
          <Button size="lg" className="bg-blue-600 hover:bg-blue-700 text-white">
            Solicitar Orçamento
            <ArrowRight className="ml-2 h-5 w-5" />
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
                      <Button className="w-full bg-blue-600 hover:bg-blue-700 text-white">
                        Solicitar Orçamento
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
              Por que escolher nossos <span className="text-gradient">serviços</span>?
            </h2>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              Combinamos excelência técnica com inovação para entregar resultados excepcionais.
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
              { step: '01', title: 'Análise', description: 'Entendemos suas necessidades e objetivos específicos.' },
              { step: '02', title: 'Estratégia', description: 'Desenvolvemos uma estratégia personalizada para seu caso.' },
              { step: '03', title: 'Execução', description: 'Implementamos as soluções com excelência e agilidade.' },
              { step: '04', title: 'Resultados', description: 'Acompanhamos e otimizamos para máximos resultados.' }
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
            Pronto para transformar seus resultados?
          </h2>
          <p className="text-xl text-white/90 mb-8">
            Entre em contato conosco e descubra como podemos ajudar seu negócio a crescer.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Button size="lg" className="bg-white text-blue-600 hover:bg-gray-100">
              Agendar Consulta Gratuita
            </Button>
            <Button size="lg" variant="outline" className="border-white text-white hover:bg-white hover:text-blue-600">
              Solicitar Orçamento
            </Button>
          </div>
        </div>
      </section>
    </div>
  );
}