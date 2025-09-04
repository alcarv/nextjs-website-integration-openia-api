'use client';

import { useEffect, useState } from 'react';
import Link from 'next/link';
import { Menu, X, Scale, PenTool, Bot, Phone, User as UserIcon, LogOut, Star } from 'lucide-react';
import { BookOpen } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { useAuth } from '@/contexts/AuthContext';
import AuthModal from '@/components/AuthModal';

export default function Navigation() {
  const [isOpen, setIsOpen] = useState(false);
  const [showAuthModal, setShowAuthModal] = useState(false);
  const { user, signOut, loading } = useAuth();
  const [mounted, setMounted] = useState(false);
  useEffect(() => { setMounted(true); }, []);

  const navItems = [
    { href: '/', label: 'Início', icon: UserIcon },
    { href: '/sobre', label: 'Sobre', icon: UserIcon },
    { href: '/servicos', label: 'Serviços', icon: Scale },
    { href: '/humanizar', label: 'Humanizador', icon: Bot },
    { href: '/parafraseador', label: 'Parafraseador', icon: PenTool },
    { href: '/complementador', label: 'Complementador', icon: Star },
    { href: '/blog', label: 'Blog', icon: BookOpen },
  ];

  if (!mounted) return null;

  return (
    <nav className="bg-white/95 backdrop-blur-sm border-b border-gray-200 sticky top-0 z-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center py-4">
          <Link href="/" className="flex items-center space-x-2">
            <Scale className="h-8 w-8 text-blue-600" />
            <span className="text-2xl font-bold text-gradient">
              Dra. Ruth Monielly
            </span>
          </Link>

          {/* Desktop Menu */}
          <div className="hidden md:flex items-center space-x-8">
            {navItems.map((item) => (
              <Link
                key={item.href}
                href={item.href}
                className="flex items-center space-x-1 text-gray-700 hover:text-blue-600 transition-colors duration-200"
              >
                <item.icon className="h-4 w-4" />
                <span>{item.label}</span>
              </Link>
            ))}
            {loading ? (
              <div className="h-9 w-32 bg-gray-200 rounded animate-pulse" />
            ) : user ? (
              <div className="flex items-center space-x-4">
                <Link
                  href="/conta"
                  className="text-sm text-gray-700 hover:text-blue-600 transition-colors"
                >
                  Olá, {user.name}
                </Link>
                <Button
                  onClick={signOut}
                  variant="outline"
                  size="sm"
                  className="border-red-600 text-red-600 hover:bg-red-50"
                >
                  <LogOut className="h-4 w-4 mr-1" />
                  Sair
                </Button>
              </div>
            ) : (
              <Button 
                onClick={() => setShowAuthModal(true)}
                className="bg-blue-600 hover:bg-blue-700 text-white"
              >
                Entrar / Cadastrar
              </Button>
            )}
          </div>

          {/* Mobile Menu Button */}
          <button
            onClick={() => setIsOpen(!isOpen)}
            className="md:hidden p-2 rounded-md text-gray-700 hover:text-blue-600 hover:bg-gray-100"
          >
            {isOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
          </button>
        </div>

        {/* Mobile Menu */}
        {isOpen && (
          <div className="md:hidden py-4 border-t border-gray-200">
            <div className="flex flex-col space-y-4">
              {navItems.map((item) => (
                <Link
                  key={item.href}
                  href={item.href}
                  className="flex items-center space-x-2 text-gray-700 hover:text-blue-600 transition-colors duration-200"
                  onClick={() => setIsOpen(false)}
                >
                  <item.icon className="h-4 w-4" />
                  <span>{item.label}</span>
                </Link>
              ))}
              {loading ? (
                <div className="h-10 bg-gray-200 rounded animate-pulse" />
              ) : user ? (
                <div className="space-y-2">
                  <Link
                    href="/conta"
                    className="text-sm text-gray-700 hover:text-blue-600"
                    onClick={() => setIsOpen(false)}
                  >
                    Olá, {user.name}
                  </Link>
                  <Button
                    onClick={signOut}
                    variant="outline"
                    className="border-red-600 text-red-600 hover:bg-red-50 w-full"
                  >
                    <LogOut className="h-4 w-4 mr-1" />
                    Sair
                  </Button>
                </div>
              ) : (
                <Button 
                  onClick={() => setShowAuthModal(true)}
                  className="bg-blue-600 hover:bg-blue-700 text-white w-full"
                >
                  Entrar / Cadastrar
                </Button>
              )}
            </div>
          </div>
        )}
      </div>
      
      <AuthModal isOpen={showAuthModal} onClose={() => setShowAuthModal(false)} />
    </nav>
  );
}
