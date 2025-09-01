'use client';

import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Star, Award, Shield, Users, CheckCircle, Crown } from 'lucide-react';
import Link from 'next/link';
import { getWhatsAppUrl } from '@/lib/whatsapp';

const teamLevels = [
  {
    icon: Users,
    title: 'Nível Start',
    subtitle: 'Redator Técnico Terceirizado',
    description: 'Texto produzido por redator externo da minha confiança, com escrita objetiva, funcional e acadêmica.',
    features: [
      'Redator externo de confiança',
      'Escrita objetiva e funcional',
      'Entrega gradual com revisão',
      'Revisão final feita por mim',
      'Preço mais acessível',
      '100% original, sem plágio e sem IA'
    ],
    price: 'Mais Acessível',
    color: 'blue',
    guarantee: 'Comprovante de originalidade incluído'
  },
  {
    icon: Award,
    title: 'Nível Pró',
    subtitle: 'Redator Treinado por Mim',
    description: 'Redator treinado pessoalmente no meu escritório, seguindo minhas orientações e padrões de qualidade.',
    features: [
      'Treinamento pessoal no escritório',
      'Acompanhamento direto em todas as fases',
      'Revisão parcial e final por mim',
      'Texto bem estruturado e fundamentado',
      'Fontes confiáveis e normas acadêmicas',
      'Excelente custo-benefício'
    ],
    price: 'Custo-Benefício',
    color: 'green',
    guarantee: 'Supervisão técnica em cada etapa'
  },
  {
    icon: Crown,
    title: 'Nível Premium',
    subtitle: 'Produção Exclusiva por Mim',
    description: 'Produção feita integralmente por mim, com linguagem refinada e análise crítica aprofundada.',
    features: [
      'Produção 100% por Dra. Ruth',
      'Linguagem refinada e técnica',
      'Planejamento por etapas',
      'Entregas parciais e ajustes',
      'Suporte direto comigo',
      'Altíssimo nível técnico'
    ],
    price: 'Premium',
    color: 'purple',
    guarantee: 'Maturidade acadêmica e argumentação sólida',
    popular: true
  }
];

export default function Services() {
  return (
    <section className="py-20 bg-gray-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
          <h2 className="text-3xl lg:text-4xl font-bold text-gray-900 mb-6">
            Minha <span className="text-gradient">Equipe</span>
          </h2>
          <div className="max-w-4xl mx-auto space-y-6 text-lg text-gray-600 leading-relaxed">
            <p>
              A busca incansável dos alunos por trabalhos de excelência, com qualidade e custo-benefício, 
              me levou a ampliar minha forma de atuação. Percebi que não bastava atender sozinha a todas 
              as demandas: era necessário formar uma equipe capaz de seguir meus padrões de exigência e 
              entregar resultados à altura do meu nome.
            </p>
            <p>
              Por isso, selecionei redatores de confiança e os treinei pessoalmente, transmitindo minha 
              técnica exclusiva de escrita acadêmica e meu rigor em cada detalhe. Hoje, eles atuam comigo, 
              garantindo que cada aluno tenha opções que se ajustem ao seu perfil: desde produções premium, 
              feitas integralmente por mim, até alternativas com excelente custo-benefício, sem abrir mão da segurança.
            </p>
            <p className="font-semibold text-gray-800">
              Independente da escolha, todos os trabalhos passam pela minha supervisão final e são entregues 
              com comprovantes de originalidade, sem plágio e sem índice de IA. Assim, cada aluno encontra 
              na minha equipe não apenas ajuda acadêmica, mas a certeza de um trabalho legítimo, confiável 
              e de alto padrão.
            </p>
          </div>
        </div>

        <div className="mb-12 text-center">
          <h3 className="text-2xl font-bold text-gray-900 mb-4">
            Opções de Atendimento – <span className="text-gradient">Equipe Dra. Ruth Moniélly</span>
          </h3>
        </div>

        <div className="grid md:grid-cols-1 lg:grid-cols-3 gap-8">
          {teamLevels.map((level, index) => {
            const IconComponent = level.icon;
            const colorClasses = {
              blue: 'border-blue-500 bg-blue-50',
              green: 'border-green-500 bg-green-50',
              purple: 'border-purple-500 bg-purple-50'
            };
            const iconColors = {
              blue: 'text-blue-600 bg-blue-100',
              green: 'text-green-600 bg-green-100',
              purple: 'text-purple-600 bg-purple-100'
            };
            const buttonColors = {
              blue: 'bg-blue-600 hover:bg-blue-700',
              green: 'bg-green-600 hover:bg-green-700',
              purple: 'bg-purple-600 hover:bg-purple-700'
            };

            return (
              <Card 
                key={index} 
                className={`relative bg-white hover:shadow-xl transition-all duration-300 border-2 ${
                  level.popular ? 'border-green-500 shadow-lg' : 'border-gray-200 hover:border-gray-300'
                }`}
              >
                {level.popular && (
                  <div className="absolute -top-4 left-1/2 transform -translate-x-1/2">
                    <span className="bg-green-500 text-white px-4 py-1 rounded-full text-sm font-medium flex items-center">
                      <Star className="w-4 h-4 mr-1" />
                      Mais Popular
                    </span>
                  </div>
                )}
                
                <CardHeader className="text-center pb-4">
                  <div className={`mx-auto w-16 h-16 rounded-full flex items-center justify-center mb-4 ${iconColors[level.color as keyof typeof iconColors]}`}>
                    <IconComponent className="h-8 w-8" />
                  </div>
                  <CardTitle className="text-xl font-bold text-gray-900 mb-2">
                    {level.title}
                  </CardTitle>
                  <div className="text-sm font-medium text-gray-600 mb-3">
                    {level.subtitle}
                  </div>
                  <CardDescription className="text-gray-600 leading-relaxed">
                    {level.description}
                  </CardDescription>
                </CardHeader>
                
                <CardContent className="pt-0">
                  <ul className="space-y-3 mb-6">
                    {level.features.map((feature, idx) => (
                      <li key={idx} className="flex items-start space-x-3">
                        <CheckCircle className="h-5 w-5 text-green-500 mt-0.5 flex-shrink-0" />
                        <span className="text-gray-700 text-sm">{feature}</span>
                      </li>
                    ))}
                  </ul>
                  
                  <div className="border-t pt-4 space-y-4">
                    <div className="text-center">
                      <div className="text-lg font-semibold text-gray-900 mb-1">
                        {level.price}
                      </div>
                      <div className="text-sm text-gray-600 mb-3">
                        <Shield className="inline w-4 h-4 mr-1" />
                        {level.guarantee}
                      </div>
                    </div>
                    
                    <Button
                      asChild
                      className={`w-full text-white ${buttonColors[level.color as keyof typeof buttonColors]}`}
                    >
                      <Link
                        href={getWhatsAppUrl(`Olá! Gostaria de solicitar um orçamento para ${level.title} - ${level.subtitle}`)}
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

        {/* Guarantee Section */}
        <div className="mt-16 bg-white rounded-2xl shadow-lg p-8">
          <div className="text-center mb-8">
            <Shield className="mx-auto w-12 h-12 text-green-600 mb-4" />
            <h3 className="text-2xl font-bold text-gray-900 mb-4">
              Garantia de <span className="text-gradient">Qualidade</span>
            </h3>
          </div>
          
          <div className="grid md:grid-cols-3 gap-8 text-center">
            <div>
              <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-4">
                <CheckCircle className="w-8 h-8 text-green-600" />
              </div>
              <h4 className="font-semibold text-gray-900 mb-2">100% Original</h4>
              <p className="text-gray-600 text-sm">
                Todos os trabalhos são únicos, sem plágio e com comprovante de originalidade.
              </p>
            </div>
            
            <div>
              <div className="w-16 h-16 bg-blue-100 rounded-full flex items-center justify-center mx-auto mb-4">
                <Shield className="w-8 h-8 text-blue-600" />
              </div>
              <h4 className="font-semibold text-gray-900 mb-2">Sem IA</h4>
              <p className="text-gray-600 text-sm">
                Produção 100% humana, sem uso de inteligência artificial, com comprovante.
              </p>
            </div>
            
            <div>
              <div className="w-16 h-16 bg-purple-100 rounded-full flex items-center justify-center mx-auto mb-4">
                <Award className="w-8 h-8 text-purple-600" />
              </div>
              <h4 className="font-semibold text-gray-900 mb-2">Supervisão Final</h4>
              <p className="text-gray-600 text-sm">
                Todos os trabalhos passam pela minha revisão final antes da entrega.
              </p>
            </div>
          </div>
        </div>

        {/* CTA Section */}
        <div className="mt-16 text-center">
          <div className="bg-gradient-to-r from-blue-600 to-purple-600 rounded-2xl p-8 text-white">
            <h3 className="text-2xl font-bold mb-4">
              Pronto para ter o melhor suporte acadêmico?
            </h3>
            <p className="text-lg mb-6 opacity-90">
              Escolha o nível que melhor se adequa ao seu perfil e orçamento.
            </p>
            <Button
              asChild
              size="lg"
              className="bg-white text-blue-600 hover:bg-gray-100"
            >
              <Link
                href={getWhatsAppUrl('Olá! Gostaria de conhecer melhor os níveis de atendimento da equipe')}
                target="_blank"
                rel="noopener noreferrer"
              >
                Falar com a Equipe
              </Link>
            </Button>
          </div>
        </div>
      </div>
    </section>
  );
}