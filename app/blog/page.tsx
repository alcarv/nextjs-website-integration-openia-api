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
import Link from 'next/link';
import { posts as allPosts, featuredPost as featured } from '@/lib/posts';

const featuredPost = featured;
const basePosts = allPosts.filter((p) => !p.featured);

const categories = (() => {
  const map = new Map<string, number>();
  allPosts.forEach((p) => map.set(p.category, (map.get(p.category) || 0) + 1));
  const list = Array.from(map.entries()).map(([name, count]) => ({ name, count }));
  return [
    { name: 'Todos', count: allPosts.length, icon: BookOpen },
    ...list.map((c) => ({ ...c, icon: c.name.includes('Direito') ? Scale : c.name.includes('Marketing') ? TrendingUp : c.name.includes('Compliance') ? Briefcase : c.name.includes('Tecnologia') ? Bot : PenTool })),
  ];
})();

const popularPosts = [...allPosts]
  .sort((a, b) => (b.views || 0) - (a.views || 0))
  .slice(0, 4)
  .map((p) => ({ title: p.title, views: p.views || 0, slug: p.slug }));

export default function BlogPage({
  searchParams,
}: {
  searchParams?: { category?: string };
}) {
  const activeCategory = (searchParams?.category || '').trim();

  const formatDate = (dateString: string) => {
    const date = new Date(dateString);
    return date.toLocaleDateString('pt-BR', { 
      year: 'numeric', 
      month: 'long', 
      day: 'numeric' 
    });
  };

  const blogPosts = !activeCategory
    ? basePosts
    : basePosts.filter((p) => p.category === activeCategory);

  return (
    <div className="min-h-screen bg-white">
      <Navigation />
      
      {/* Hero Section */}
      <section className="gradient-bg py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h1 className="text-4xl lg:text-5xl font-bold text-gray-900 mb-6">
            <span className="text-gradient">Produções</span> Autorais
          </h1>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto mb-8">
            Artigos, textos, reflexões e conteúdos acadêmicos reunidos em um só espaço.
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
                  <Link href={featuredPost.category ? `/blog?category=${encodeURIComponent(featuredPost.category)}` : '/blog'}>
                    <span className="bg-blue-600 text-white px-3 py-1 rounded-full text-sm font-medium hover:opacity-90">
                      {featuredPost.category}
                    </span>
                  </Link>
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
                    <Link href={`/blog/${featuredPost.slug}`}>
                      <Button className="bg-blue-600 hover:bg-blue-700 text-white">
                        Ler Artigo Completo
                        <ArrowRight className="ml-2 h-4 w-4" />
                      </Button>
                    </Link>
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
                        <Link href={post.category ? `/blog?category=${encodeURIComponent(post.category)}` : '/blog'}>
                          <span className="bg-blue-600 text-white px-3 py-1 rounded-full text-sm font-medium hover:opacity-90">
                            {post.category}
                          </span>
                        </Link>
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
                        <Link href={`/blog/${post.slug}`}>
                          <Button variant="outline" className="border-blue-600 text-blue-600 hover:bg-blue-50">
                            Ler Mais
                          </Button>
                        </Link>
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
                      const isActive = (!activeCategory && category.name === 'Todos') || activeCategory === category.name;
                      const href =
                        category.name === 'Todos'
                          ? '/blog'
                          : `/blog?category=${encodeURIComponent(category.name)}`;
                      return (
                        <Link key={category.name} href={href} className="block">
                          <div
                            className={`flex items-center justify-between p-2 rounded-lg transition-colors ${
                              isActive ? 'bg-blue-50 ring-1 ring-blue-200' : 'hover:bg-gray-50'
                            }`}
                          >
                            <div className="flex items-center space-x-3">
                              <IconComponent className={`h-4 w-4 ${isActive ? 'text-blue-700' : 'text-blue-600'}`} />
                              <span className={`text-gray-700 ${isActive ? 'font-medium' : ''}`}>
                                {category.name}
                              </span>
                            </div>
                            <span className={`text-sm px-2 py-1 rounded-full ${
                              isActive ? 'text-blue-700 bg-blue-100' : 'text-gray-500 bg-gray-100'
                            }`}>
                              {category.count}
                            </span>
                          </div>
                        </Link>
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
                      <Link key={index} href={`/blog/${post.slug}`} className="flex items-start space-x-3 p-2 hover:bg-gray-50 rounded-lg transition-colors">
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
                      </Link>
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
            <Button asChild size="lg" variant="outline" className="border-white text-white hover:bg-white hover:text-blue-600">
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
