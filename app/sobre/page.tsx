import Navigation from '@/components/Navigation';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import Link from 'next/link';
import { getWhatsAppUrl } from '@/lib/whatsapp';
import {
  Scale,
  PenTool,
  Award,
  Users,
  Target,
  BookOpen,
  CheckCircle,
  ArrowRight,
  Briefcase,
  GraduationCap,
  Star,
  Quote,
  Calendar,
  TrendingUp
} from 'lucide-react';
import Footer from '@/components/Footer';

const achievements = [
  {
    icon: Scale,
    title: 'Advocacia',
    description: 'Mais de 10 anos de experiência em direito empresarial e civil',
    metric: '10+ anos'
  },
  {
    icon: PenTool,
    title: 'Copywriting',
    description: 'Especialista certificada em técnicas de persuasão e vendas',
    metric: '500+ projetos'
  },
  {
    icon: Users,
    title: 'Clientes Atendidos',
    description: 'Empresas e profissionais de diversos segmentos',
    metric: '200+ clientes'
  },
  {
    icon: TrendingUp,
    title: 'Resultados',
    description: 'Taxa média de sucesso em casos e campanhas',
    metric: '95% sucesso'
  }
];

const timeline = [
  {
    year: '2014',
    title: 'Formação em Direito',
    description: 'Graduação em Direito pela Universidade de São Paulo (USP) com especialização em Direito Empresarial.'
  },
  {
    year: '2016',
    title: 'Início da Advocacia',
    description: 'Registro na OAB/SP e início da prática advocatícia focada em direito empresarial e civil.'
  },
  {
    year: '2019',
    title: 'Especialização em Copywriting',
    description: 'Certificação em técnicas de copywriting e marketing digital para ampliar serviços oferecidos.'
  },
  {
    year: '2021',
    title: 'Consultoria Integrada',
    description: 'Criação de metodologia única combinando expertise jurídica com estratégias de comunicação.'
  },
  {
    year: '2024',
    title: 'Inovação com IA',
    description: 'Lançamento do serviço de humanização de textos IA, pioneira no mercado jurídico.'
  }
];

const testimonials = [
  {
    name: 'Carlos Mendes',
    company: 'CEO, TechStart',
    text: 'A Dra. Ruth transformou nossa comunicação jurídica. Contratos claros e copy que converte. Profissional excepcional.',
    rating: 5
  },
  {
    name: 'Marina Silva',
    company: 'Diretora, Fashion Brand',
    text: 'Combinação perfeita de conhecimento jurídico e habilidade de comunicação. Resultados impressionantes.',
    rating: 5
  },
  {
    name: 'Roberto Costa',
    company: 'Fundador, EduTech',
    text: 'Assessoria jurídica preventiva e copy que multiplica vendas. Investimento que se paga rapidamente.',
    rating: 5
  }
];

const values = [
  {
    icon: Target,
    title: 'Excelência',
    description: 'Comprometimento com a qualidade máxima em todos os projetos e atendimentos.'
  },
  {
    icon: Users,
    title: 'Transparência',
    description: 'Comunicação clara e honesta em todas as etapas do trabalho.'
  },
  {
    icon: BookOpen,
    title: 'Inovação',
    description: 'Sempre buscando novas tecnologias e metodologias para melhores resultados.'
  },
  {
    icon: Award,
    title: 'Ética',
    description: 'Conduta profissional íntegra e responsável em todas as situações.'
  }
];

export default function SobrePage() {
  return (
    <div className="min-h-screen bg-white">
      <Navigation />
      
      {/* Hero Section */}
      <section className="gradient-bg py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid lg:grid-cols-2 gap-12 items-center">
            <div>
              <h1 className="text-4xl lg:text-6xl font-bold text-gray-900 mb-6">
                Conheça a <span className="text-gradient">Dra. Ruth Monielly</span>
              </h1>
              <p className="text-xl text-gray-600 mb-8 leading-relaxed">
                Advogada especialista em direito empresarial e copywriter certificada, 
                combinando expertise jurídica com estratégias de comunicação inovadoras 
                para entregar resultados excepcionais aos clientes.
              </p>
              <div className="flex flex-col sm:flex-row gap-4">
                <Button
                  asChild
                  size="lg"
                  className="bg-blue-600 hover:bg-blue-700 text-white"
                >
                  <Link
                    href={getWhatsAppUrl('Olá! Gostaria de agendar uma consulta')}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex items-center"
                  >
                    <Calendar className="mr-2 h-5 w-5" />
                    Agendar Consulta
                  </Link>
                </Button>
                <Button
                  size="lg"
                  variant="outline"
                  className="border-blue-600 text-blue-600 hover:bg-blue-50"
                >
                  Ver Portfólio
                  <ArrowRight className="ml-2 h-5 w-5" />
                </Button>
              </div>
            </div>
            
            <div className="relative">
              <div className="bg-white rounded-2xl shadow-xl p-8">
                <div className="grid grid-cols-2 gap-6">
                  {achievements.map((achievement, index) => {
                    const IconComponent = achievement.icon;
                    return (
                      <div key={index} className="text-center">
                        <div className="mx-auto w-12 h-12 bg-blue-100 rounded-full flex items-center justify-center mb-3">
                          <IconComponent className="h-6 w-6 text-blue-600" />
                        </div>
                        <div className="text-2xl font-bold text-blue-600 mb-1">{achievement.metric}</div>
                        <div className="text-sm text-gray-600">{achievement.title}</div>
                      </div>
                    );
                  })}
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* About Section */}
      <section className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid lg:grid-cols-2 gap-12 items-center">
            <div>
              <h2 className="text-3xl lg:text-4xl font-bold text-gray-900 mb-6">
                Uma <span className="text-gradient">Abordagem Única</span>
              </h2>
              <p className="text-lg text-gray-600 mb-6 leading-relaxed">
                Minha trajetória profissional começou no direito, mas rapidamente percebi que 
                a comunicação eficaz é fundamental para o sucesso jurídico. Essa percepção me 
                levou a me especializar em copywriting, criando uma metodologia única que combina 
                rigor jurídico com persuasão estratégica.
              </p>
              <p className="text-lg text-gray-600 mb-8 leading-relaxed">
                Hoje, ajudo empresas e profissionais a não apenas resolver questões jurídicas, 
                mas também a comunicar de forma mais eficaz, aumentando suas vendas e fortalecendo 
                suas marcas no mercado.
              </p>
              <div className="grid grid-cols-2 gap-4">
                <div className="flex items-center space-x-3">
                  <CheckCircle className="h-5 w-5 text-green-500" />
                  <span className="text-gray-700">OAB/SP Ativa</span>
                </div>
                <div className="flex items-center space-x-3">
                  <CheckCircle className="h-5 w-5 text-green-500" />
                  <span className="text-gray-700">Copywriter Certificada</span>
                </div>
                <div className="flex items-center space-x-3">
                  <CheckCircle className="h-5 w-5 text-green-500" />
                  <span className="text-gray-700">Especialista em IA</span>
                </div>
                <div className="flex items-center space-x-3">
                  <CheckCircle className="h-5 w-5 text-green-500" />
                  <span className="text-gray-700">Consultora Empresarial</span>
                </div>
              </div>
            </div>
            
            <div className="relative">
              <div className="bg-gradient-to-br from-blue-50 to-red-50 rounded-2xl p-8">
                <Quote className="h-12 w-12 text-blue-600 mb-6" />
                <blockquote className="text-xl text-gray-700 italic mb-6">
                  &quot;Acredito que o direito e a comunicação andam juntos. Não basta ter razão; 
                  é preciso saber comunicar essa razão de forma clara, persuasiva e eficaz.&quot;
                </blockquote>
                <div className="flex items-center space-x-4">
                  <div className="w-12 h-12 bg-gradient-to-r from-blue-600 to-red-600 rounded-full flex items-center justify-center">
                    <span className="text-white font-bold text-lg">R</span>
                  </div>
                  <div>
                    <div className="font-semibold text-gray-900">Dra. Ruth Monielly</div>
                    <div className="text-sm text-gray-500">Advogada & Copywriter</div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Timeline Section */}
      <section className="py-20 bg-gray-50">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-3xl lg:text-4xl font-bold text-gray-900 mb-4">
              Minha <span className="text-gradient">Trajetória</span>
            </h2>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              Uma jornada de crescimento contínuo, sempre buscando inovação e excelência.
            </p>
          </div>

          <div className="relative">
            <div className="absolute left-1/2 transform -translate-x-1/2 w-1 h-full bg-gradient-to-b from-blue-600 to-red-600"></div>
            
            {timeline.map((item, index) => (
              <div key={index} className={`relative flex items-center mb-12 ${index % 2 === 0 ? 'justify-start' : 'justify-end'}`}>
                <div className={`w-1/2 ${index % 2 === 0 ? 'pr-8 text-right' : 'pl-8 text-left'}`}>
                  <Card className="bg-white shadow-lg">
                    <CardContent className="p-6">
                      <div className="text-2xl font-bold text-blue-600 mb-2">{item.year}</div>
                      <h3 className="text-xl font-bold text-gray-900 mb-3">{item.title}</h3>
                      <p className="text-gray-600">{item.description}</p>
                    </CardContent>
                  </Card>
                </div>
                
                <div className="absolute left-1/2 transform -translate-x-1/2 w-4 h-4 bg-white border-4 border-blue-600 rounded-full"></div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Values Section */}
      <section className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-3xl lg:text-4xl font-bold text-gray-900 mb-4">
              Meus <span className="text-gradient">Valores</span>
            </h2>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              Princípios que guiam meu trabalho e relacionamento com clientes.
            </p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
            {values.map((value, index) => {
              const IconComponent = value.icon;
              return (
                <Card key={index} className="bg-white border-2 border-gray-100 hover:border-blue-300 transition-colors text-center">
                  <CardContent className="p-8">
                    <div className="mx-auto w-16 h-16 bg-blue-100 rounded-full flex items-center justify-center mb-6">
                      <IconComponent className="h-8 w-8 text-blue-600" />
                    </div>
                    <h3 className="text-xl font-bold text-gray-900 mb-4">{value.title}</h3>
                    <p className="text-gray-600">{value.description}</p>
                  </CardContent>
                </Card>
              );
            })}
          </div>
        </div>
      </section>

      {/* Testimonials Section */}
      <section className="py-20 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-3xl lg:text-4xl font-bold text-gray-900 mb-4">
              O que meus <span className="text-gradient">clientes</span> dizem
            </h2>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              Depoimentos reais de profissionais que transformaram seus negócios.
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
                  <p className="text-gray-600 mb-6 italic">{testimonial.text}</p>
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
            Vamos trabalhar juntos?
          </h2>
          <p className="text-xl text-white/90 mb-8">
            Entre em contato e descubra como posso ajudar seu negócio a crescer 
            com soluções jurídicas e de comunicação estratégica.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Button
              asChild
              size="lg"
              className="bg-white text-blue-600 hover:bg-gray-100"
            >
              <Link
                href={getWhatsAppUrl('Olá! Gostaria de agendar uma consulta')}
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center"
              >
                <Calendar className="mr-2 h-5 w-5" />
                Agendar Consulta
              </Link>
            </Button>
            <Button
              size="lg"
              variant="outline"
              className="border-white text-white hover:bg-white hover:text-blue-600"
            >
              Ver Serviços
              <ArrowRight className="ml-2 h-5 w-5" />
            </Button>
          </div>
        </div>
      </section>
      
      <Footer />
    </div>
  );
}