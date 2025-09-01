import Link from 'next/link';
import { Scale, Mail, Phone, MapPin, Facebook, Instagram, Linkedin, Twitter } from 'lucide-react';

export default function Footer() {
  const currentYear = new Date().getFullYear();

  const services = [
    { name: 'Consultoria Jurídica', href: '/servicos' },
    { name: 'Redação Jurídica', href: '/servicos' },
    { name: 'Humanizar Textos IA', href: '/humanizar' },
    { name: 'Treinamentos', href: '/servicos' },
    { name: 'Assessoria Empresarial', href: '/servicos' }
  ];

  const quickLinks = [
    { name: 'Início', href: '/' },
    { name: 'Sobre', href: '/sobre' },
    { name: 'Serviços', href: '/servicos' },
    { name: 'Blog', href: '/blog' },
    { name: 'Contato', href: '/contato' },
    { name: 'Política de Privacidade', href: '/privacidade' }
  ];

  const socialLinks = [
    { name: 'Facebook', href: '#', icon: Facebook },
    { name: 'Instagram', href: '#', icon: Instagram },
    { name: 'LinkedIn', href: '#', icon: Linkedin },
    { name: 'Twitter', href: '#', icon: Twitter }
  ];

  return (
    <footer className="bg-gray-900 text-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {/* Brand Section */}
          <div className="lg:col-span-1">
            <Link href="/" className="flex items-center space-x-2 mb-6">
              <Scale className="h-8 w-8 text-blue-400" />
              <span className="text-2xl font-bold bg-gradient-to-r from-blue-400 to-red-400 bg-clip-text text-transparent">
                Dra. Ruth Monielly
              </span>
            </Link>
            <p className="text-gray-300 mb-6 leading-relaxed">
              Ajudo alunos de graduação, mestrado e doutorado a desenvolver trabalhos científicos com excelência, 
              clareza e autenticidade. Especialista em escrita, humanização acadêmica, revisão e estruturação de pesquisas de alto nível.
            </p>
            <div className="space-y-3">
              <div className="flex items-center space-x-3">
                <Phone className="h-5 w-5 text-blue-400" />
                <span className="text-gray-300">+55 (64) 99676-2041</span>
              </div>
              <div className="flex items-center space-x-3">
                <Mail className="h-5 w-5 text-blue-400" />
                <span className="text-gray-300">draruthmoniélly@gmail.com</span>
              </div>
              <div className="flex items-center space-x-3">
                <MapPin className="h-5 w-5 text-blue-400" />
                <span className="text-gray-300">Goías - Atendimento online em todo o Brasil</span>
              </div>
            </div>
          </div>

          {/* Services */}
          <div>
            <h3 className="text-lg font-semibold mb-6 text-white">Serviços</h3>
            <ul className="space-y-3">
              {services.map((service) => (
                <li key={service.name}>
                  <Link 
                    href={service.href}
                    className="text-gray-300 hover:text-blue-400 transition-colors duration-200"
                  >
                    {service.name}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Quick Links */}
          <div>
            <h3 className="text-lg font-semibold mb-6 text-white">Links Rápidos</h3>
            <ul className="space-y-3">
              {quickLinks.map((link) => (
                <li key={link.name}>
                  <Link 
                    href={link.href}
                    className="text-gray-300 hover:text-blue-400 transition-colors duration-200"
                  >
                    {link.name}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Newsletter & Social */}
          <div>
            <h3 className="text-lg font-semibold mb-6 text-white">Conecte-se</h3>
            <p className="text-gray-300 mb-4">
              Receba dicas jurídicas e de copywriting diretamente no seu email.
            </p>
            <div className="mb-6">
              <div className="flex">
                <input
                  type="email"
                  placeholder="Seu email"
                  className="flex-1 px-4 py-2 bg-gray-800 border border-gray-700 rounded-l-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent text-white placeholder-gray-400"
                />
                <button className="px-6 py-2 bg-gradient-to-r from-blue-600 to-red-600 hover:from-blue-700 hover:to-red-700 rounded-r-md transition-colors duration-200 font-medium">
                  Assinar
                </button>
              </div>
            </div>
            
            {/* Social Links */}
            <div>
              <h4 className="text-sm font-semibold mb-3 text-white">Redes Sociais</h4>
              <div className="flex space-x-4">
                {socialLinks.map((social) => {
                  const IconComponent = social.icon;
                  return (
                    <a
                      key={social.name}
                      href={social.href}
                      className="w-10 h-10 bg-gray-800 rounded-full flex items-center justify-center hover:bg-gradient-to-r hover:from-blue-600 hover:to-red-600 transition-all duration-200"
                      aria-label={social.name}
                    >
                      <IconComponent className="h-5 w-5" />
                    </a>
                  );
                })}
              </div>
            </div>
          </div>
        </div>

        {/* Bottom Section */}
        <div className="border-t border-gray-800 mt-12 pt-8">
          <div className="flex flex-col md:flex-row justify-between items-center space-y-4 md:space-y-0">
            <div className="text-gray-400 text-sm">
              © {currentYear} Dra. Ruth Monielly. Todos os direitos reservados.
            </div>
            <div className="flex space-x-6 text-sm">
              <Link href="/termos" className="text-gray-400 hover:text-blue-400 transition-colors">
                Termos de Uso
              </Link>
              <Link href="/privacidade" className="text-gray-400 hover:text-blue-400 transition-colors">
                Política de Privacidade
              </Link>
              <Link href="/cookies" className="text-gray-400 hover:text-blue-400 transition-colors">
                Cookies
              </Link>
            </div>
          </div>
        </div>

        {/* Professional Badges */}
        <div className="border-t border-gray-800 mt-8 pt-8">
          <div className="flex flex-col md:flex-row justify-center items-center space-y-4 md:space-y-0 md:space-x-8">
            <div className="flex items-center space-x-2 text-gray-400 text-sm">
              <Scale className="h-4 w-4" />
              <span>OAB/SP 123.456</span>
            </div>
            <div className="flex items-center space-x-2 text-gray-400 text-sm">
              <span className="w-2 h-2 bg-green-500 rounded-full"></span>
              <span>Certificado em Assessoria Acadêmica</span>
            </div>
            <div className="flex items-center space-x-2 text-gray-400 text-sm">
              <span className="w-2 h-2 bg-blue-500 rounded-full"></span>
              <span>Especialista em IA</span>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
}