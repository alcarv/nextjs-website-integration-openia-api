import Navigation from '@/components/Navigation';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import Link from 'next/link';
import Image from 'next/image';
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
import imgHero from '@/public/IMG_1199.JPG';
import imgLeft from '@/public/IMG_1267.JPG';
import imgRight from '@/public/IMG_1269.JPG';

const achievements = [
  {
    icon: Scale,
    title: 'Advocacia',
    description: 'Mais de 10 anos de experiência em direito empresarial e civil',
    metric: '7+ anos'
  },
  {
    icon: PenTool,
    title: 'Assessora Acadêmica',
    description: 'Especialista em assessoria acadêmica',
    metric: '8+ anos'
  },
  {
    icon: Users,
    title: 'Clientes Atendidos',
    description: 'Empresas e profissionais de diversos segmentos',
    metric: '1000+ clientes'
  },
  {
    icon: TrendingUp,
    title: 'Resultados',
    description: 'Taxa média de sucesso em casos e campanhas',
    metric: '100% sucesso'
  }
];

const testimonials = [
  {
    name: 'Aline Estefany',
    text: 'A melhor!! Trabalho impecável !! Nota 1000000… confiaria meu trabalho a você quantas vezes fossem necessário!!',
    rating: 5
  },
  {
    name: 'Karolayne Alves',
    text: 'Excelente profissional, exerce um trabalho brilhante e com muita dedicação!',
    rating: 5
  },
  {
    name: 'Lorraine Moraes',
    text: 'Amei trabalhos perfeito ótima profissional 💓 nota 10 💓🌹',
    rating: 5
  }
];

const values = [
  {
    icon: Target,
    title: 'Excelência',
    description: 'Tudo o que entrego precisa refletir o mais alto nível. Não aceito atalhos nem resultados medianos: meu compromisso é sempre com a qualidade máxima.'
  },
  {
    icon: Users,
    title: 'Transparência',
    description: 'Trabalho com clareza em cada etapa do processo, para que o aluno saiba exatamente o que esperar e confie plenamente no resultado.'
  },
  {
    icon: BookOpen,
    title: 'Exigência',
    description: 'Minha marca é a exigência. Sou rigorosa comigo mesma e com cada projeto, porque só assim é possível alcançar consistência e autenticidade.'
  },
  {
    icon: Award,
    title: 'Compromisso',
    description: 'Cada trabalho que recebo carrega também a minha responsabilidade pessoal. Mais do que aprovação, entrego confiança e a certeza de que o resultado representa o melhor de cada trajetória acadêmica.'
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
              <h1 className="text-4xl lg:text-6xl font-bold text-gray-900 mb-6 text-center">
                Conheça a <span className="text-gradient">Dra. Ruth Monielly</span>
              </h1>
              <p className="text-xl text-gray-600 leading-relaxed text-justify mb-6">
                Sou advogada por formação desde 2018 e, iniciei minha trajetória como assessora acadêmica em 2017. Esse caminho começou ainda na graduação, quando percebi a dificuldade de muitos colegas em conciliar os trabalhos acadêmicos, do pré-projeto ao artigo final, com as múltiplas demandas da vida universitária. Movida pelo desejo de ajudar e pela necessidade de construir minha independência, decidi transformar essa realidade em oportunidade profissional.
              </p>
              <p className="text-xl text-gray-600 leading-relaxed text-justify mb-6">
                Desde então, desenvolvi uma postura marcada pela exigência e pelo compromisso absoluto com a excelência. Não aceito resultados medianos: cada trabalho precisa refletir qualidade, consistência e dedicação. Essa busca constante pelo mais alto nível consolidou minha identidade profissional e me permitiu conquistar resultados expressivos ao longo desses oito anos de atuação.
              </p>
              <p className="text-xl text-gray-600 leading-relaxed text-justify mb-8">
                Combinando minha formação jurídica com estratégias de escrita e organização acadêmica, ampliei minha atuação para diferentes áreas do conhecimento, atendendo alunos das ciências humanas às ciências jurídicas e exatas. Essa jornada me tornou referência na produção acadêmica, mantendo uma taxa de aprovação de 100% e conquistando a confiança de inúmeros clientes que encontraram, em meu trabalho, compromisso, excelência e entregas que superam expectativas.
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
                    Falar com Dra. Ruth Moniélly
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
                Tenho percebido, desde 2017, que a forma como desenvolvo meus trabalhos sempre se destacou pela clareza, profundidade e excelência. Esse diferencial, reconhecido por colegas e clientes, me levou a compreender que não deveria ficar restrito apenas às produções que eu mesma realizava. Assim, transformei minha experiência em uma técnica exclusiva de humanização acadêmica, fruto de anos de prática e constante aprimoramento.
                Essa metodologia vai além da revisão ou correção. Ela recria o texto em um nível superior, conferindo naturalidade, consistência e densidade científica, eliminando qualquer traço de artificialidade. O resultado é um conteúdo legítimo, autêntico e academicamente sólido, pronto para atender às exigências de graduação, mestrado e doutorado.
                Minha abordagem é única porque carrega a marca da exigência que sempre me acompanhou. Hoje, representa não apenas a possibilidade de aprovação, mas a confiança de apresentar um trabalho robusto, confiável e digno dos mais altos padrões acadêmicos.
              </p>
              <p className="text-xl text-gray-600 mb-8 leading-relaxed">
                <b>&quot;Minha técnica exclusiva nasceu da exigência e se tornou o caminho para transformar desespero acadêmico em confiança e excelência.&quot;</b>
              </p>
              <div className="grid grid-cols-2 gap-4">
                <div className="flex items-center space-x-3">
                  <CheckCircle className="h-5 w-5 text-green-500" />
                  <span className="text-gray-700">Advogada</span>
                </div>
                <div className="flex items-center space-x-3">
                  <CheckCircle className="h-5 w-5 text-green-500" />
                  <span className="text-gray-700">Assessora Acadêmica</span>
                </div>
                <div className="flex items-center space-x-3">
                  <CheckCircle className="h-5 w-5 text-green-500" />
                  <span className="text-gray-700">Especialista em Trabalhos Acadêmicos</span>
                </div>
                <div className="flex items-center space-x-3">
                  <CheckCircle className="h-5 w-5 text-green-500" />
                  <span className="text-gray-700">Atuação Consolidada em Escrita de Excelência</span>
                </div>
              </div>
            </div>

            <div>
              <div className="grid grid-cols-2 gap-4 mb-8">
                <div className="relative col-span-2 overflow-hidden rounded-2xl">
                  <Image
                    src={imgHero}
                    alt="Dra. Ruth Monielly"
                    className="w-full h-auto shadow-lg"
                    priority
                  />
                  <div className="absolute bottom-4 left-4 bg-white/90 backdrop-blur-sm px-4 py-2 rounded-lg shadow">
                    <p className="text-sm font-medium text-gray-900">Dra. Ruth Monielly</p>
                    <p className="text-xs text-gray-600">Brasil</p>
                  </div>
                </div>
                <div className="overflow-hidden rounded-2xl">
                  <Image
                    src={imgLeft}
                    alt="Atendimento profissional"
                    className="w-full h-auto shadow-lg"
                  />
                </div>
                <div className="overflow-hidden rounded-2xl">
                  <Image
                    src={imgRight}
                    alt="Trabalho em equipe"
                    className="w-full h-auto shadow-lg"
                  />
                </div>
              </div>
              <div className="bg-gradient-to-br from-blue-50 to-red-50 rounded-2xl p-8">
                <Quote className="h-12 w-12 text-blue-600 mb-6" />
                <blockquote className="text-xl text-gray-700 italic mb-6">
                  &quot;Acredito que todo conteúdo pode ser lapidado até atingir sua melhor versão.&quot;
                </blockquote>
                <div className="flex items-center space-x-4">
                  <div className="w-12 h-12 bg-gradient-to-r from-blue-600 to-red-600 rounded-full flex items-center justify-center">
                    <span className="text-white font-bold text-lg">R</span>
                  </div>
                  <div>
                    <div className="font-semibold text-gray-900">Dra. Ruth Monielly</div>
                    <div className="text-sm text-gray-500">Advogada & Assessora Acadêmica</div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Video Section */}
      <section className="py-20 bg-gray-50">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="text-3xl lg:text-4xl font-bold text-gray-900 mb-6">
            Conheça nossa ferramenta exclusiva
          </h2>
          <p className="text-lg text-gray-600 mb-10">
            Assista ao vídeo gravado e descubra mais sobre nossa ferramenta, desenvolvida para transformar sua experiência acadêmica.
          </p>
          <div className="mx-auto w-full max-w-sm sm:max-w-md">
            <div className="overflow-hidden rounded-2xl shadow-2xl bg-black">
              <video
                src="/video-1-sobre.mp4"
                controls
                preload="metadata"
                playsInline
                className="w-full h-auto"
              />
            </div>
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
            Se o que você procura não é apenas humanizar ou parafrasear o seu texto, mas sim um atendimento personalizado, 
            feito diretamente comigo, para te auxiliar em cada etapa da sua trajetória acadêmica, entre em contato.
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
                Falar com Dra. Ruth Moniélly
              </Link>
            </Button>
            <Button
              asChild
              size="lg"
              variant="outline"
              className="border-white text-white hover:bg-white hover:text-blue-600"
            >
              <Link href="/servicos" className="flex items-center">
                Ver Serviços
                <ArrowRight className="ml-2 h-5 w-5" />
              </Link>
            </Button>
          </div>
        </div>
      </section>

      <Footer />
    </div>
  );
}
