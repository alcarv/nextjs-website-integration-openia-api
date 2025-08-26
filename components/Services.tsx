'use client';

import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Scale, PenTool, FileText, Users, Briefcase, Bot } from 'lucide-react';

const services = [
  {
    icon: Scale,
    title: 'Consultoria Jurídica',
    description: 'Orientação especializada em diversas áreas do direito com foco em resultados práticos.',
    features: ['Direito Empresarial', 'Direito Civil', 'Direito Trabalhista', 'Consultoria Preventiva']
  },
  {
    icon: PenTool,
    title: 'Copywriting Profissional',
    description: 'Textos persuasivos que convertem e engajam seu público-alvo de forma eficiente.',
    features: ['Sales Pages', 'E-mail Marketing', 'Conteúdo para Redes Sociais', 'Textos Publicitários']
  },
  {
    icon: FileText,
    title: 'Redação Jurídica',
    description: 'Documentos e peças jurídicas elaborados com precisão técnica e clareza.',
    features: ['Contratos', 'Petições', 'Pareceres', 'Documentos Empresariais']
  },
  {
    icon: Bot,
    title: 'Humanização de Textos IA',
    description: 'Transforme textos gerados por IA em conteúdo natural e humanizado.',
    features: ['Processamento Inteligente', 'Preservação do Sentido', 'Tom Natural', 'Detecção Zero IA']
  },
  {
    icon: Users,
    title: 'Treinamentos',
    description: 'Capacitação em comunicação jurídica e técnicas de copywriting para equipes.',
    features: ['Workshops', 'Palestras', 'Consultoria em Equipe', 'Material Didático']
  },
  {
    icon: Briefcase,
    title: 'Assessoria Empresarial',
    description: 'Suporte completo para empresas em questões jurídicas e comunicacionais.',
    features: ['Compliance', 'Due Diligence', 'Estratégia de Comunicação', 'Gestão de Riscos']
  }
];

export default function Services() {
  return (
    <section className="py-20 bg-gray-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
          <h2 className="text-3xl lg:text-4xl font-bold text-gray-900 mb-4">
            Nossos <span className="text-gradient">Serviços</span>
          </h2>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto">
            Oferecemos soluções completas que combinam expertise jurídica com estratégias 
            de comunicação inovadoras, incluindo tecnologia de IA para humanização de textos.
          </p>
        </div>

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
          {services.map((service, index) => {
            const IconComponent = service.icon;
            return (
            <Card key={index} className="bg-white hover:shadow-lg transition-shadow duration-300">
              <CardHeader>
                <div className="flex items-center space-x-3 mb-4">
                  <div className="p-3 bg-blue-100 rounded-lg">
                    <IconComponent className="h-6 w-6 text-blue-600" />
                  </div>
                  <CardTitle className="text-xl">{service.title}</CardTitle>
                </div>
                <CardDescription className="text-gray-600">
                  {service.description}
                </CardDescription>
              </CardHeader>
              <CardContent>
                <ul className="space-y-2">
                  {service.features.map((feature, idx) => (
                    <li key={idx} className="flex items-center space-x-2">
                      <div className="w-2 h-2 bg-blue-600 rounded-full"></div>
                      <span className="text-gray-700">{feature}</span>
                    </li>
                  ))}
                </ul>
              </CardContent>
            </Card>
            );
          })}
        </div>
      </div>
    </section>
  );
}