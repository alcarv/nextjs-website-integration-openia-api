import Navigation from '@/components/Navigation';
import Footer from '@/components/Footer';
import { notFound } from 'next/navigation';
import { posts } from '@/lib/posts';
import { Calendar, User, Clock } from 'lucide-react';
import Link from 'next/link';

type Props = {
  params: { slug: string };
};

const formatDate = (dateString: string) => {
  const date = new Date(dateString);
  return date.toLocaleDateString('pt-BR', {
    year: 'numeric',
    month: 'long',
    day: 'numeric',
  });
};

export default function BlogPostPage({ params }: Props) {
  const post = posts.find((p) => p.slug === params.slug);
  if (!post) return notFound();

  return (
    <div className="min-h-screen bg-white">
      <Navigation />

      <article className="py-14">
        <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8">
          <header className="mb-8">
            <Link href={`/blog?category=${encodeURIComponent(post.category)}`} className="inline-block">
              <p className="text-sm text-blue-600 font-medium mb-3 hover:underline">{post.category}</p>
            </Link>
            <h1 className="text-3xl lg:text-4xl font-bold text-gray-900 mb-4">{post.title}</h1>
            <div className="flex items-center space-x-6 text-sm text-gray-500">
              <div className="flex items-center space-x-2">
                <User className="h-4 w-4" />
                <span>{post.author}</span>
              </div>
              <div className="flex items-center space-x-2">
                <Calendar className="h-4 w-4" />
                <span>{formatDate(post.date)}</span>
              </div>
              <div className="flex items-center space-x-2">
                <Clock className="h-4 w-4" />
                <span>{post.readTime}</span>
              </div>
            </div>
          </header>

          {post.image && (
            <div className="mb-8">
              <img
                src={post.image}
                alt={post.title}
                className="w-full h-64 object-cover rounded-lg"
              />
            </div>
          )}

          <div className="prose prose-lg max-w-none text-gray-800">
            {post.content.split('\n\n').map((para, idx) => (
              <p key={idx} className="mb-5 leading-relaxed">{para}</p>
            ))}
          </div>
        </div>
      </article>

      <Footer />
    </div>
  );
}
