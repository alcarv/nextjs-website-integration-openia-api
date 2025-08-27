import Navigation from '@/components/Navigation';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { 
  Calendar, 
  User, 
  Clock, 
  ArrowRight, 
  Search,
  Tag,
  BookOpen,
  TrendingUp,
  Scale,
  PenTool,
  Bot,
  Briefcase,
  Eye,
  MessageSquare
} from 'lucide-react';
import Footer from '@/components/Footer';

const featuredPost = {
  id: 1,
  title: 'Como a IA está Revolucionando o Copywriting Jurídico',
  excerpt: 'Descubra como a inteligência artificial pode ser uma aliada poderosa na criação de textos jurídicos mais eficazes e persuasivos.',
  content: 'A integração entre IA e copywriting jurídico representa uma nova era na comunicação legal...',
  author: 'Dra. Ruth Monielly',
  date: '2024-01-15',
  readTime: '8 min',
  category: 'Tecnologia',
  image: 'https://images.pexels.com/photos/8849295/pexels-photo-8849295.jpeg?auto=compress&cs=tinysrgb&w=800',
  views: 1250,
  comments: 23,
  featured: true
};

const blogPosts = [
  {
    id: 2,
    title: '10 Técnicas de Copywriting para Advogados',
    excerpt: 'Estratégias comprovadas para tornar sua comunicação jurídica mais persuasiva e eficaz.',
    author: 'Dra. Ruth Monielly',
    date: '2024-01-12',
    readTime: '6 min',
    category: 'Copywriting',
    image: 'https://images.pexels.com/photos/5668473/pexels-photo-5668473.jpeg?auto=compress&cs=tinysrgb&w=600',
    views: 890,
    comments: 15
  },
  {
    id: 3,
    title: 'Contratos Digitais: O Futuro dos Negócios',
    excerpt: 'Como adaptar contratos tradicionais para o ambiente digital mantendo segurança jurídica.',
    author: 'Dra. Ruth Monielly',
    date: '2024-01-10',
    readTime: '5 min',
    category: 'Direito Digital',
    image: 'https://images.pexels.com/photos/5668858/pexels-photo-5668858.jpeg?auto=compress&cs=tinysrgb&w=600',
    views: 654,
    comments: 8
  },
  {
    id: 4,
    title: 'Sales Pages que Convertem: Guia Completo',
    excerpt: 'Passo a passo para criar páginas de vendas que realmente geram resultados.',
    author: 'Dra. Ruth Monielly',
    date: '2024-01-08',
    readTime: '10 min',
    category: 'Marketing',
    image: 'https://images.pexels.com/photos/265087/pexels-photo-265087.jpeg?auto=compress&cs=tinysrgb&w=600',
    views: 1100,
    comments: 31
  },
  {
    id: 5,
    title: 'Compliance para Startups: O que Você Precisa Saber',
    excerpt: 'Guia essencial de compliance para empresas em crescimento evitarem problemas legais.',
    author: 'Dra. Ruth Monielly',
    date: '2024-01-05',
    readTime: '7 min',
    category: 'Compliance',
    image: 'https://images.pexels.com/photos/3184465/pexels-photo-3184465.jpeg?auto=compress&cs=tinysrgb&w=600',
    views: 723,
    comments: 12
  },
  {
    id: 6,
    title: 'E-mail Marketing Jurídico: Estratégias Eficazes',
    excerpt: 'Como usar e-mail marketing para fortalecer relacionamentos e gerar novos clientes.',
    author: 'Dra. Ruth Monielly',
    date: '2024-01-03',
    readTime: '6 min',
    category: 'Marketing',
    image: 'https://images.pexels.com/photos/1591062/pexels-photo-1591062.jpeg?auto=compress&cs=tinysrgb&w=600',
    views: 567,
    comments: 9
  },
  {
    id: 7,
    title: 'Humanização de Textos: Por que é Importante?',
    excerpt: 'Entenda a importância de humanizar textos gerados por IA para manter autenticidade.',
    author: 'Dra. Ruth Monielly',
    date: '2024-01-01',
    readTime: '4 min',
    category: 'Tecnologia',
    image: 'https://images.pexels.com/photos/8849295/pexels-photo-8849295.jpeg?auto=compress&cs=tinysrgb&w=600',
    views: 445,
    comments: 6
  }
];

const categories = [
  { name: 'Todos', count: 25, icon: BookOpen },
  { name: 'Copywriting', count: 8, icon: PenTool },
  { name: 'Direito Digital', count: 6, icon: Scale },
  { name: 'Tecnologia', count: 5, icon: Bot },
  { name: 'Marketing', count: 4, icon: TrendingUp },
  { name: 'Compliance', count: 2, icon: Briefcase }
];

const popularPosts = [
  { title: 'Como a IA está Revolucionando o Copywriting', views: 1250 },
  { title: 'Sales Pages que Convertem: Guia Completo', views: 1100 },
  { title: '10 Técnicas de Copywriting para Advogados', views: 890 },
  { title: 'Compliance para Startups: O que Você Precisa Saber', views: 723 }
];

export default function BlogPage() {
  const formatDate = (dateString: string) => {
    const date = new Date(dateString);
    return date.toLocaleDateString('pt-BR', { 
      year: 'numeric', 
      month: 'long', 
      day: 'numeric' 
    });
  };

  return (
    <div className="min-h-screen bg-white">
      <Navigation />
      
      {/* Hero Section */}
      <section className="gradient-bg py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h1 className="text-4xl lg:text-5xl font-bold text-gray-900 mb-6">
            <span className="text-gradient">Blog</span> Jurídico & Copywriting
          </h1>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto mb-8">
            Insights, estratégias e tendências sobre direito, copywriting e tecnologia 
            para impulsionar seu negócio e carreira.
          </p>
          <div className="max-w-md mx-auto">
            <div className="relative">
              <Search className="absolute left-3 top-3 h-5 w-5 text-gray-400" />
              <Input 
                placeholder="Buscar artigos..." 
                className="pl-10 py-3 text-lg"
              />
            </div>
          </div>
        </div>
      </section>

      {/* Featured Post */}
      <section className="py-20 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="mb-12">
            <h2 className="text-3xl font-bold text-gray-900 mb-4">
              Artigo em <span className="text-gradient">Destaque</span>
            </h2>
          </div>

          <Card className="bg-white shadow-xl overflow-hidden">
            <div className="grid lg:grid-cols-2">
              <div className="relative h-64 lg:h-auto">
                <img 
                  src={featuredPost.image} 
                  alt={featuredPost.title}
                  className="w-full h-full object-cover"
                />
                <div className="absolute top-4 left-4">
                  <span className="bg-blue-600 text-white px-3 py-1 rounded-full text-sm font-medium">
                    {featuredPost.category}
                  </span>
                </div>
              </div>
              <div className="p-8 lg:p-12">
                <CardHeader className="p-0 mb-6">
                  <CardTitle className="text-2xl lg:text-3xl font-bold text-gray-900 mb-4">
                    {featuredPost.title}
                  </CardTitle>
                  <CardDescription className="text-lg text-gray-600 leading-relaxed">
                    {featuredPost.excerpt}
                  </CardDescription>
                </CardHeader>
                <CardContent className="p-0">
                  <div className="flex items-center space-x-6 text-sm text-gray-500 mb-6">
                    <div className="flex items-center space-x-2">
                      <User className="h-4 w-4" />
                      <span>{featuredPost.author}</span>
                    </div>
                    <div className="flex items-center space-x-2">
                      <Calendar className="h-4 w-4" />
                      <span>{formatDate(featuredPost.date)}</span>
                    </div>
                    <div className="flex items-center space-x-2">
                      <Clock className="h-4 w-4" />
                      <span>{featuredPost.readTime}</span>
                    </div>
                  </div>
                  <div className="flex items-center justify-between">
                    <Button className="bg-blue-600 hover:bg-blue-700 text-white">
                      Ler Artigo Completo
                      <ArrowRight className="ml-2 h-4 w-4" />
                    </Button>
                    <div className="flex items-center space-x-4 text-sm text-gray-500">
                      <div className="flex items-center space-x-1">
                        <Eye className="h-4 w-4" />
                        <span>{featuredPost.views}</span>
                      </div>
                      <div className="flex items-center space-x-1">
                        <MessageSquare className="h-4 w-4" />
                        <span>{featuredPost.comments}</span>
                      </div>
                    </div>
                  </div>
                </CardContent>
              </div>
            </div>
          </Card>
        </div>
      </section>

      {/* Blog Posts Grid */}
      <section className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid lg:grid-cols-4 gap-8">
            {/* Main Content */}
            <div className="lg:col-span-3">
              <div className="mb-8">
                <h2 className="text-3xl font-bold text-gray-900 mb-4">
                  Últimos <span className="text-gradient">Artigos</span>
                </h2>
              </div>

              <div className="grid md:grid-cols-2 gap-8">
                {blogPosts.map((post) => (
                  <Card key={post.id} className="bg-white shadow-lg hover:shadow-xl transition-shadow duration-300">
                    <div className="relative">
                      <img 
                        src={post.image} 
                        alt={post.title}
                        className="w-full h-48 object-cover rounded-t-lg"
                      />
                      <div className="absolute top-4 left-4">
                        <span className="bg-blue-600 text-white px-3 py-1 rounded-full text-sm font-medium">
                          {post.category}
                        </span>
                      </div>
                    </div>
                    <CardContent className="p-6">
                      <CardTitle className="text-xl font-bold text-gray-900 mb-3 line-clamp-2">
                        {post.title}
                      </CardTitle>
                      <CardDescription className="text-gray-600 mb-4 line-clamp-3">
                        {post.excerpt}
                      </CardDescription>
                      <div className="flex items-center space-x-4 text-sm text-gray-500 mb-4">
                        <div className="flex items-center space-x-1">
                          <Calendar className="h-4 w-4" />
                          <span>{formatDate(post.date)}</span>
                        </div>
                        <div className="flex items-center space-x-1">
                          <Clock className="h-4 w-4" />
                          <span>{post.readTime}</span>
                        </div>
                      </div>
                      <div className="flex items-center justify-between">
                        <Button variant="outline" className="border-blue-600 text-blue-600 hover:bg-blue-50">
                          Ler Mais
                        </Button>
                        <div className="flex items-center space-x-3 text-sm text-gray-500">
                          <div className="flex items-center space-x-1">
                            <Eye className="h-4 w-4" />
                            <span>{post.views}</span>
                          </div>
                          <div className="flex items-center space-x-1">
                            <MessageSquare className="h-4 w-4" />
                            <span>{post.comments}</span>
                          </div>
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                ))}
              </div>

              {/* Load More Button */}
              <div className="text-center mt-12">
                <Button size="lg" variant="outline" className="border-blue-600 text-blue-600 hover:bg-blue-50">
                  Carregar Mais Artigos
                </Button>
              </div>
            </div>

            {/* Sidebar */}
            <div className="lg:col-span-1 space-y-8">
              {/* Categories */}
              <Card className="bg-white shadow-lg">
                <CardHeader>
                  <CardTitle className="flex items-center">
                    <Tag className="mr-2 h-5 w-5 text-blue-600" />
                    Categorias
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="space-y-3">
                    {categories.map((category) => {
                      const IconComponent = category.icon;
                      return (
                        <div key={category.name} className="flex items-center justify-between p-2 hover:bg-gray-50 rounded-lg cursor-pointer transition-colors">
                          <div className="flex items-center space-x-3">
                            <IconComponent className="h-4 w-4 text-blue-600" />
                            <span className="text-gray-700">{category.name}</span>
                          </div>
                          <span className="text-sm text-gray-500 bg-gray-100 px-2 py-1 rounded-full">
                            {category.count}
                          </span>
                        </div>
                      );
                    })}
                  </div>
                </CardContent>
              </Card>

              {/* Popular Posts */}
              <Card className="bg-white shadow-lg">
                <CardHeader>
                  <CardTitle className="flex items-center">
                    <TrendingUp className="mr-2 h-5 w-5 text-blue-600" />
                    Mais Populares
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    {popularPosts.map((post, index) => (
                      <div key={index} className="flex items-start space-x-3 p-2 hover:bg-gray-50 rounded-lg cursor-pointer transition-colors">
                        <div className="w-8 h-8 bg-blue-100 rounded-full flex items-center justify-center flex-shrink-0">
                          <span className="text-blue-600 font-bold text-sm">{index + 1}</span>
                        </div>
                        <div>
                          <h4 className="text-sm font-medium text-gray-900 line-clamp-2 mb-1">
                            {post.title}
                          </h4>
                          <div className="flex items-center space-x-1 text-xs text-gray-500">
                            <Eye className="h-3 w-3" />
                            <span>{post.views} visualizações</span>
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>
                </CardContent>
              </Card>

              {/* Newsletter */}
              <Card className="bg-gradient-to-br from-blue-50 to-red-50 shadow-lg">
                <CardContent className="p-6">
                  <h3 className="text-lg font-bold text-gray-900 mb-3">
                    Newsletter Exclusiva
                  </h3>
                  <p className="text-gray-600 mb-4 text-sm">
                    Receba insights semanais sobre direito, copywriting e tecnologia.
                  </p>
                  <div className="space-y-3">
                    <Input placeholder="Seu email" />
                    <Button className="w-full bg-gradient-to-r from-blue-600 to-red-600 text-white">
                      Assinar Grátis
                    </Button>
                  </div>
                  <p className="text-xs text-gray-500 mt-2">
                    Sem spam. Cancele quando quiser.
                  </p>
                </CardContent>
              </Card>
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 bg-gradient-to-r from-blue-600 to-red-600">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="text-3xl lg:text-4xl font-bold text-white mb-6">
            Quer conteúdo personalizado?
          </h2>
          <p className="text-xl text-white/90 mb-8">
            Entre em contato para criar conteúdo estratégico para seu negócio.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Button size="lg" className="bg-white text-blue-600 hover:bg-gray-100">
              Solicitar Consultoria
            </Button>
            <Button size="lg" variant="outline" className="border-white text-white hover:bg-white hover:text-blue-600">
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