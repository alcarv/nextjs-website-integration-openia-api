import Navigation from '@/components/Navigation';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { 
  Shield, 
  Lock, 
  Eye, 
  Database, 
  UserCheck, 
  Mail,
  Calendar,
  AlertTriangle,
  CheckCircle,
  Phone,
  Globe
} from 'lucide-react';
import Footer from '@/components/Footer';

const sections = [
  {
    id: 'coleta',
    title: 'Coleta de Informações',
    icon: Database,
    content: [
      {
        subtitle: 'Informações que Coletamos',
        items: [
          'Nome completo e informações de contato (email, telefone)',
          'Dados de navegação e uso da plataforma',
          'Informações de pagamento (processadas por terceiros seguros)',
          'Textos submetidos para humanização (temporariamente)',
          'Logs de acesso e atividade no sistema'
        ]
      },
      {
        subtitle: 'Como Coletamos',
        items: [
          'Diretamente através de formulários de cadastro',
          'Automaticamente durante o uso dos serviços',
          'Através de cookies e tecnologias similares',
          'Por meio de integrações com serviços terceiros'
        ]
      }
    ]
  },
  {
    id: 'uso',
    title: 'Uso das Informações',
    icon: UserCheck,
    content: [
      {
        subtitle: 'Finalidades do Tratamento',
        items: [
          'Prestação dos serviços de humanização de textos',
          'Gerenciamento de contas e autenticação de usuários',
          'Processamento de pagamentos e cobrança',
          'Comunicação sobre serviços e atualizações',
          'Melhoria da qualidade dos serviços oferecidos',
          'Cumprimento de obrigações legais e regulamentares'
        ]
      },
      {
        subtitle: 'Base Legal',
        items: [
          'Execução de contrato (prestação de serviços)',
          'Consentimento do titular dos dados',
          'Legítimo interesse (melhoria dos serviços)',
          'Cumprimento de obrigação legal'
        ]
      }
    ]
  },
  {
    id: 'compartilhamento',
    title: 'Compartilhamento de Dados',
    icon: Globe,
    content: [
      {
        subtitle: 'Com Quem Compartilhamos',
        items: [
          'Provedores de serviços de pagamento (Stripe, PayPal)',
          'Serviços de hospedagem e infraestrutura (Supabase, Vercel)',
          'Provedores de IA (OpenAI) - apenas textos para processamento',
          'Autoridades competentes quando exigido por lei'
        ]
      },
      {
        subtitle: 'Proteções Implementadas',
        items: [
          'Contratos de proteção de dados com terceiros',
          'Criptografia de dados em trânsito e repouso',
          'Acesso limitado apenas ao necessário',
          'Monitoramento contínuo de segurança'
        ]
      }
    ]
  },
  {
    id: 'seguranca',
    title: 'Segurança dos Dados',
    icon: Shield,
    content: [
      {
        subtitle: 'Medidas de Segurança',
        items: [
          'Criptografia SSL/TLS para todas as comunicações',
          'Autenticação multifator disponível',
          'Backups regulares e seguros dos dados',
          'Monitoramento 24/7 de atividades suspeitas',
          'Controles de acesso baseados em funções',
          'Auditorias regulares de segurança'
        ]
      },
      {
        subtitle: 'Retenção de Dados',
        items: [
          'Dados de conta: mantidos enquanto a conta estiver ativa',
          'Textos processados: excluídos imediatamente após processamento',
          'Logs de sistema: mantidos por 12 meses para segurança',
          'Dados de pagamento: conforme exigências fiscais (5 anos)'
        ]
      }
    ]
  },
  {
    id: 'direitos',
    title: 'Seus Direitos',
    icon: UserCheck,
    content: [
      {
        subtitle: 'Direitos dos Titulares (LGPD)',
        items: [
          'Confirmação da existência de tratamento de dados',
          'Acesso aos dados pessoais tratados',
          'Correção de dados incompletos, inexatos ou desatualizados',
          'Anonimização, bloqueio ou eliminação de dados',
          'Portabilidade dos dados para outro fornecedor',
          'Eliminação dos dados tratados com consentimento',
          'Informação sobre compartilhamento de dados',
          'Revogação do consentimento'
        ]
      },
      {
        subtitle: 'Como Exercer seus Direitos',
        items: [
          'Entre em contato através do email: privacidade@draruth.com.br',
          'Responderemos em até 15 dias úteis',
          'Poderemos solicitar documentos para verificação de identidade',
          'Alguns direitos podem ter limitações legais'
        ]
      }
    ]
  },
  {
    id: 'cookies',
    title: 'Cookies e Tecnologias',
    icon: Eye,
    content: [
      {
        subtitle: 'Tipos de Cookies Utilizados',
        items: [
          'Cookies essenciais: necessários para funcionamento básico',
          'Cookies de autenticação: para manter sessões de usuário',
          'Cookies de preferências: para lembrar configurações',
          'Cookies analíticos: para melhorar a experiência do usuário'
        ]
      },
      {
        subtitle: 'Gerenciamento de Cookies',
        items: [
          'Você pode desabilitar cookies nas configurações do navegador',
          'Alguns recursos podem não funcionar sem cookies essenciais',
          'Cookies de terceiros seguem as políticas dos respectivos provedores'
        ]
      }
    ]
  }
];

const contactInfo = [
  {
    icon: Mail,
    title: 'Email para Privacidade',
    info: 'privacidade@draruth.com.br',
    description: 'Para questões específicas sobre dados pessoais'
  },
  {
    icon: Phone,
    title: 'Telefone',
    info: '+55 (64) 99676-2041',
    description: 'Atendimento de segunda a sexta, 9h às 18h'
  },
  {
    icon: Mail,
    title: 'Encarregado de Dados (DPO)',
    info: 'dpo@draruth.com.br',
    description: 'Responsável pela proteção de dados pessoais'
  }
];

export default function PrivacidadePage() {
  return (
    <div className="min-h-screen bg-white">
      <Navigation />
      
      {/* Hero Section */}
      <section className="gradient-bg py-20">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <div className="flex justify-center mb-6">
            <div className="p-4 bg-white rounded-full shadow-lg">
              <Shield className="h-12 w-12 text-blue-600" />
            </div>
          </div>
          <h1 className="text-4xl lg:text-5xl font-bold text-gray-900 mb-6">
            Política de <span className="text-gradient">Privacidade</span>
          </h1>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto mb-8">
            Transparência total sobre como coletamos, usamos e protegemos seus dados pessoais. 
            Seu direito à privacidade é nossa prioridade.
          </p>
          <div className="flex items-center justify-center space-x-4 text-sm text-gray-500">
            <div className="flex items-center space-x-2">
              <Calendar className="h-4 w-4" />
              <span>Última atualização: 15 de Janeiro de 2024</span>
            </div>
            <div className="flex items-center space-x-2">
              <CheckCircle className="h-4 w-4 text-green-500" />
              <span>Conforme LGPD</span>
            </div>
          </div>
        </div>
      </section>

      {/* Introduction */}
      <section className="py-16 bg-white">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <Card className="bg-blue-50 border-blue-200">
            <CardContent className="p-8">
              <div className="flex items-start space-x-4">
                <AlertTriangle className="h-6 w-6 text-blue-600 mt-1 flex-shrink-0" />
                <div>
                  <h3 className="text-lg font-semibold text-gray-900 mb-3">
                    Compromisso com sua Privacidade
                  </h3>
                  <p className="text-gray-700 leading-relaxed">
                    Esta Política de Privacidade descreve como a <strong>Dra. Ruth Monielly</strong> coleta, 
                    usa, armazena e protege suas informações pessoais quando você utiliza nossos serviços 
                    de advocacia, assessoria acadêmica e humanização de textos IA. Estamos comprometidos com a 
                    transparência e o cumprimento da Lei Geral de Proteção de Dados (LGPD).
                  </p>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>
      </section>

      {/* Main Content */}
      <section className="py-16 bg-gray-50">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="space-y-12">
            {sections.map((section) => {
              const IconComponent = section.icon;
              return (
                <Card key={section.id} className="bg-white shadow-lg">
                  <CardHeader>
                    <CardTitle className="flex items-center text-2xl">
                      <div className="p-3 bg-blue-100 rounded-lg mr-4">
                        <IconComponent className="h-6 w-6 text-blue-600" />
                      </div>
                      {section.title}
                    </CardTitle>
                  </CardHeader>
                  <CardContent className="space-y-8">
                    {section.content.map((subsection, index) => (
                      <div key={index}>
                        <h4 className="text-lg font-semibold text-gray-900 mb-4">
                          {subsection.subtitle}
                        </h4>
                        <ul className="space-y-3">
                          {subsection.items.map((item, itemIndex) => (
                            <li key={itemIndex} className="flex items-start space-x-3">
                              <CheckCircle className="h-5 w-5 text-green-500 mt-0.5 flex-shrink-0" />
                              <span className="text-gray-700">{item}</span>
                            </li>
                          ))}
                        </ul>
                      </div>
                    ))}
                  </CardContent>
                </Card>
              );
            })}
          </div>
        </div>
      </section>

      {/* Contact Section */}
      <section className="py-16 bg-white">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold text-gray-900 mb-4">
              Dúvidas sobre <span className="text-gradient">Privacidade</span>?
            </h2>
            <p className="text-xl text-gray-600">
              Entre em contato conosco através dos canais abaixo.
            </p>
          </div>

          <div className="grid md:grid-cols-3 gap-8">
            {contactInfo.map((contact, index) => {
              const IconComponent = contact.icon;
              return (
                <Card key={index} className="bg-white border-2 border-gray-100 hover:border-blue-300 transition-colors text-center">
                  <CardContent className="p-6">
                    <div className="mx-auto w-12 h-12 bg-blue-100 rounded-full flex items-center justify-center mb-4">
                      <IconComponent className="h-6 w-6 text-blue-600" />
                    </div>
                    <h3 className="font-semibold text-gray-900 mb-2">{contact.title}</h3>
                    <p className="text-blue-600 font-medium mb-2">{contact.info}</p>
                    <p className="text-sm text-gray-500">{contact.description}</p>
                  </CardContent>
                </Card>
              );
            })}
          </div>
        </div>
      </section>

      {/* Legal Notice */}
      <section className="py-16 bg-gray-50">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <Card className="bg-white">
            <CardContent className="p-8">
              <h3 className="text-xl font-bold text-gray-900 mb-4">
                Alterações nesta Política
              </h3>
              <p className="text-gray-700 mb-4">
                Podemos atualizar esta Política de Privacidade periodicamente para refletir 
                mudanças em nossas práticas ou por outros motivos operacionais, legais ou 
                regulamentares.
              </p>
              <p className="text-gray-700 mb-4">
                Quando fizermos alterações significativas, notificaremos você por email 
                (se fornecido) ou através de um aviso em nosso site antes que as alterações 
                entrem em vigor.
              </p>
              <div className="bg-blue-50 p-4 rounded-lg">
                <p className="text-sm text-blue-800">
                  <strong>Recomendação:</strong> Revise esta política periodicamente para 
                  se manter informado sobre como protegemos suas informações.
                </p>
              </div>
            </CardContent>
          </Card>
        </div>
      </section>

      {/* Footer */}
      <Footer />
    </div>
  );
}