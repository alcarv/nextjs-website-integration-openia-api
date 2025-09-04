import Navigation from '@/components/Navigation';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import Link from 'next/link';
import { getWhatsAppUrl } from '@/lib/whatsapp';
import { 
  Phone, 
  Mail, 
  MapPin, 
  Clock, 
  Send,
  MessageSquare,
  Calendar,
  CheckCircle,
  ArrowRight,
  Linkedin,
  Instagram,
  Facebook
} from 'lucide-react';
import Footer from '@/components/Footer';

const contactInfo = [
  {
    icon: Mail,
    title: 'Email',
    info: 'contato@draruth.com.br',
    description: 'Resposta em até 24h'
  },
  {
    icon: MapPin,
    title: 'Localização',
    info: 'Goiânia, GO',
    description: 'Atendimento presencial e online'
  },
  {
    icon: Clock,
    title: 'Horário',
    info: 'Segunda a Sexta',
    description: '9h às 18h'
  }
];

const services = [
  {
    title: 'Consultoria Jurídica',
    description: 'Orientação especializada em direito empresarial, civil e trabalhista.',
    price: 'A partir de R$ 200/hora'
  },
  {
    title: 'Redação e Assessoria Profissional',
    description: 'Textos acadêmicos e jurídicos com rigor e qualidade.',
  },
  {
    title: 'Humanização de Textos IA',
    description: 'Transforme textos de IA em conteúdo natural e autêntico.',
    price: 'Planos a partir de R$ 17,90/mês'
  }
];

export default function ContatoPage() {
  return (
    <div className="min-h-screen bg-white">
      <Navigation />
      
      {/* Hero Section */}
      <section className="gradient-bg py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h1 className="text-4xl lg:text-5xl font-bold text-gray-900 mb-6">
            Entre em <span className="text-gradient">Contato</span>
          </h1>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto mb-8">
            Pronto para transformar seus resultados? Vamos conversar sobre como podemos
            ajudar seu negócio a crescer com soluções jurídicas e de redação.
          </p>
          <Button
            asChild
            size="lg"
            className="bg-blue-600 hover:bg-blue-700 text-white"
          >
            <Link
              href={getWhatsAppUrl('Olá! Gostaria de agendar uma consulta gratuita')}
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center"
            >
              <Calendar className="mr-2 h-5 w-5" />
              Agendar Consulta Gratuita
            </Link>
          </Button>
        </div>
      </section>

      {/* Contact Form & Info */}
      <section className="py-20 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid lg:grid-cols-2 gap-12">
            {/* Contact Form */}
            <div id="form">
            <Card className="bg-white shadow-xl">
              <CardHeader>
                <CardTitle className="text-2xl text-gray-900 flex items-center">
                  <MessageSquare className="mr-3 h-6 w-6 text-blue-600" />
                  Envie sua Mensagem
                </CardTitle>
                <CardDescription className="text-gray-600">
                  Preencha o formulário abaixo e retornaremos em até 24 horas.
                </CardDescription>
              </CardHeader>
              <CardContent className="space-y-6">
                <div className="grid md:grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <Label htmlFor="name">Nome Completo</Label>
                    <Input id="name" placeholder="Seu nome completo" />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="email">Email</Label>
                    <Input id="email" type="email" placeholder="seu@email.com" />
                  </div>
                </div>
                
                <div className="grid md:grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <Label htmlFor="phone">Telefone</Label>
                    <Input id="phone" placeholder="(99) 99998-9999" />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="company">Empresa (opcional)</Label>
                    <Input id="company" placeholder="Nome da empresa" />
                  </div>
                </div>

                <div className="space-y-2">
                  <Label htmlFor="service">Serviço de Interesse</Label>
                  <select 
                    id="service" 
                    className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                  >
                    <option value="">Selecione um serviço</option>
                    <option value="consultoria">Consultoria Jurídica</option>
                    <option value="copywriting">Copywriting</option>
                    <option value="redacao">Redação Jurídica</option>
                    <option value="humanizacao">Humanização de Textos IA</option>
                    <option value="treinamento">Treinamentos</option>
                    <option value="assessoria">Assessoria Empresarial</option>
                    <option value="outro">Outro</option>
                  </select>
                </div>

                <div className="space-y-2">
                  <Label htmlFor="message">Mensagem</Label>
                  <Textarea 
                    id="message" 
                    placeholder="Descreva seu projeto ou necessidade..."
                    className="min-h-[120px]"
                  />
                </div>

                <Button className="w-full bg-blue-600 hover:bg-blue-700 text-white">
                  <Send className="mr-2 h-4 w-4" />
                  Enviar Mensagem
                </Button>
              </CardContent>
            </Card>
            </div>

            {/* Contact Info */}
            <div className="space-y-8">
              <div>
                <h2 className="text-3xl font-bold text-gray-900 mb-6">
                  Informações de <span className="text-gradient">Contato</span>
                </h2>
                <p className="text-lg text-gray-600 mb-8">
                  Estamos aqui para ajudar você a alcançar seus objetivos. 
                  Entre em contato através de qualquer um dos canais abaixo.
                </p>
              </div>

              <div className="grid gap-6">
                {contactInfo.map((contact, index) => {
                  const IconComponent = contact.icon;
                  return (
                    <div key={index} className="flex items-start space-x-4 p-4 bg-white rounded-lg shadow-md">
                      <div className="p-3 bg-blue-100 rounded-lg">
                        <IconComponent className="h-6 w-6 text-blue-600" />
                      </div>
                      <div>
                        <h3 className="font-semibold text-gray-900 mb-1">{contact.title}</h3>
                        <p className="text-blue-600 font-medium mb-1">{contact.info}</p>
                        <p className="text-sm text-gray-500">{contact.description}</p>
                      </div>
                    </div>
                  );
                })}
              </div>

              {/* Social Media */}
              <div className="bg-white p-6 rounded-lg shadow-md">
                <h3 className="text-xl font-bold text-gray-900 mb-4">Redes Sociais</h3>
                <div className="flex space-x-4">
                  <Button variant="outline" size="sm" className="border-blue-600 text-blue-600 hover:bg-blue-50">
                    <Linkedin className="h-4 w-4 mr-2" />
                    LinkedIn
                  </Button>
                  <Button variant="outline" size="sm" className="border-pink-600 text-pink-600 hover:bg-pink-50">
                    <Instagram className="h-4 w-4 mr-2" />
                    Instagram
                  </Button>
                  <Button variant="outline" size="sm" className="border-blue-800 text-blue-800 hover:bg-blue-50">
                    <Facebook className="h-4 w-4 mr-2" />
                    Facebook
                  </Button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Services Overview */}
      <section className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-3xl lg:text-4xl font-bold text-gray-900 mb-4">
              Nossos <span className="text-gradient">Serviços</span>
            </h2>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              Soluções completas para suas necessidades jurídicas e de comunicação.
            </p>
          </div>

          <div className="grid md:grid-cols-3 gap-8">
            {services.map((service, index) => (
              <Card key={index} className="bg-white border-2 border-gray-100 hover:border-blue-300 transition-colors">
                <CardHeader>
                  <CardTitle className="text-xl text-gray-900">{service.title}</CardTitle>
                  <CardDescription className="text-gray-600">
                    {service.description}
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="flex justify-between items-center mb-4">
                    <span className="text-lg font-semibold text-blue-600">{service.price}</span>
                  </div>
                  <Button
                    asChild
                    className="w-full bg-blue-600 hover:bg-blue-700 text-white"
                  >
                    <Link
                      href={getWhatsAppUrl(`Olá! Gostaria de solicitar um orçamento para ${service.title}`)}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="flex items-center justify-center"
                    >
                      Solicitar Orçamento
                      <ArrowRight className="ml-2 h-4 w-4" />
                    </Link>
                  </Button>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* FAQ Section */}
      <section id="faq" className="py-20 bg-gray-50">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-3xl lg:text-4xl font-bold text-gray-900 mb-4">
              Perguntas <span className="text-gradient">Frequentes</span>
            </h2>
            <p className="text-xl text-gray-600">
              Respostas para as dúvidas mais comuns sobre nossos serviços.
            </p>
          </div>

          <div className="space-y-6">
            {[
              {
                question: 'Qual o prazo para entrega dos projetos?',
                answer: 'Os prazos variam conforme o tipo de projeto. Consultoria jurídica: 3-5 dias úteis. Copywriting: 5-7 dias úteis. Projetos maiores são acordados individualmente.'
              },
              {
                question: 'Vocês atendem empresas de todo o Brasil?',
                answer: 'Sim! Atendemos clientes em todo território nacional através de consultas online e presenciais (quando possível).'
              },
              {
                question: 'Como funciona a consultoria jurídica?',
                answer: 'Oferecemos consultoria preventiva e soluções para questões empresariais, trabalhistas e civis. O atendimento pode ser pontual ou através de assessoria mensal.'
              },
              {
                question: 'O que está incluído no serviço de copywriting?',
                answer: 'Inclui pesquisa de mercado, criação do copy, revisões ilimitadas e orientações para implementação. Testes A/B podem ser inclusos conforme o projeto.'
              },
              {
                question: 'Como funciona o humanizador de textos IA?',
                answer: 'Nossa ferramenta transforma textos gerados por IA em conteúdo natural e indetectável. Oferecemos planos gratuitos e premium com diferentes limites de uso.'
              }
            ].map((faq, index) => (
              <Card key={index} className="bg-white">
                <CardContent className="p-6">
                  <div className="flex items-start space-x-4">
                    <div className="p-2 bg-blue-100 rounded-full">
                      <CheckCircle className="h-5 w-5 text-blue-600" />
                    </div>
                    <div>
                      <h3 className="text-lg font-semibold text-gray-900 mb-2">{faq.question}</h3>
                      <p className="text-gray-600">{faq.answer}</p>
                    </div>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>

          {/* Feedback CTA */}
          <div className="mt-10 text-center">
            <Card className="inline-block text-left">
              <CardContent className="p-6">
                <h3 className="text-xl font-semibold text-gray-900 mb-2">Tem melhorias, reclamações ou sugestões?</h3>
                <p className="text-gray-600 mb-4">Ficaremos felizes em ouvir você. Envie seu feedback pelo formulário.</p>
                <Button asChild className="bg-blue-600 hover:bg-blue-700 text-white">
                  <Link href="#form">Enviar feedback</Link>
                </Button>
              </CardContent>
            </Card>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 bg-gradient-to-r from-blue-600 to-red-600">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="text-3xl lg:text-4xl font-bold text-white mb-6">
            Pronto para começar seu projeto?
          </h2>
          <p className="text-xl text-white/90 mb-8">
            Entre em contato conosco hoje mesmo e descubra como podemos ajudar 
            seu negócio a alcançar novos patamares.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Button size="lg" className="bg-white text-blue-600 hover:bg-gray-100">
              <Phone className="mr-2 h-5 w-5" />
              Ligar Agora
            </Button>
            <Button size="lg" variant="outline" className="border-white text-white hover:bg-white hover:text-blue-600">
              <Mail className="mr-2 h-5 w-5" />
              Enviar Email
            </Button>
          </div>
        </div>
      </section>
      <Footer />
    </div>
  );
}
