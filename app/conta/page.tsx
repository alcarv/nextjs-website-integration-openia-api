'use client';

import Navigation from '@/components/Navigation';
import Footer from '@/components/Footer';
import AuthModal from '@/components/AuthModal';
import { useAuth } from '@/contexts/AuthContext';
import { useMemo, useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Skeleton } from '@/components/ui/skeleton';
import Link from 'next/link';

function formatDate(dateStr?: string | null) {
  if (!dateStr) return '—';
  try {
    const d = new Date(dateStr);
    return new Intl.DateTimeFormat('pt-BR', {
      day: '2-digit', month: '2-digit', year: 'numeric',
      hour: '2-digit', minute: '2-digit'
    }).format(d);
  } catch {
    return dateStr;
  }
}

export default function ContaPage() {
  const { user, loading, signOut, refreshUser } = useAuth();
  const [showAuthModal, setShowAuthModal] = useState(false);

  const planBadge = useMemo(() => {
    const map: Record<string, { label: string; variant: 'default' | 'secondary' | 'destructive' | 'outline' }> = {
      free: { label: 'Gratuito', variant: 'secondary' },
      basic: { label: 'Básico', variant: 'default' },
      intermediate: { label: 'Intermediário', variant: 'default' },
      advanced: { label: 'Avançado', variant: 'default' },
      professional: { label: 'Profissional', variant: 'default' },
    };
    if (!user) return { label: '—', variant: 'outline' as const };
    return map[user.plan] || { label: user.plan, variant: 'outline' as const };
  }, [user]);

  return (
    <div className="min-h-screen bg-white">
      <Navigation />

      <main className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-10">
        <h1 className="text-3xl font-bold mb-6">Minha Conta</h1>

        {loading ? (
          <div className="space-y-4">
            <Skeleton className="h-8 w-48" />
            <Card>
              <CardContent className="grid grid-cols-1 md:grid-cols-2 gap-4 py-6">
                {Array.from({ length: 8 }).map((_, i) => (
                  <div key={i} className="space-y-2">
                    <Skeleton className="h-4 w-24" />
                    <Skeleton className="h-6 w-56" />
                  </div>
                ))}
              </CardContent>
            </Card>
          </div>
        ) : !user ? (
          <Card>
            <CardHeader>
              <CardTitle>Acesse sua conta</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <p className="text-gray-600">Para ver suas informações, faça login ou crie uma conta.</p>
              <div className="flex flex-wrap gap-3">
                <Button className="bg-blue-600 hover:bg-blue-700" onClick={() => setShowAuthModal(true)}>
                  Entrar / Cadastrar
                </Button>
                <Link href="/">
                  <Button variant="outline">Voltar ao início</Button>
                </Link>
              </div>
            </CardContent>
          </Card>
        ) : (
          <div className="space-y-6">
            <Card>
              <CardHeader className="flex flex-row items-center justify-between">
                <CardTitle>Informações da Conta</CardTitle>
                <div className="flex items-center gap-2">
                  <Button variant="outline" onClick={refreshUser}>Atualizar</Button>
                  <Button variant="outline" className="border-red-600 text-red-600 hover:bg-red-50" onClick={signOut}>Sair</Button>
                </div>
              </CardHeader>
              <CardContent>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div>
                    <div className="text-sm text-gray-500">Nome</div>
                    <div className="text-base font-medium">{user.name}</div>
                  </div>
                  <div>
                    <div className="text-sm text-gray-500">Email</div>
                    <div className="text-base font-medium">{user.email}</div>
                  </div>
                  <div>
                    <div className="text-sm text-gray-500">Plano Atual</div>
                    <div className="mt-1">
                      <Badge variant={planBadge.variant}>{planBadge.label}</Badge>
                    </div>
                  </div>
                  <div>
                    <div className="text-sm text-gray-500">Expira em</div>
                    <div className="text-base font-medium">{user.plan_expires_at ? formatDate(user.plan_expires_at) : 'Sem expiração'}</div>
                  </div>
                  <div>
                    <div className="text-sm text-gray-500">Uso de caracteres</div>
                    <div className="text-base font-medium">{user.characters_used?.toLocaleString('pt-BR') ?? 0}</div>
                  </div>
                  <div>
                    <div className="text-sm text-gray-500">Próximo reset de uso</div>
                    <div className="text-base font-medium">{formatDate(user.usage_reset_date)}</div>
                  </div>
                  <div>
                    <div className="text-sm text-gray-500">Usos (legado)</div>
                    <div className="text-base font-medium">{user.usage_count?.toLocaleString('pt-BR') ?? 0}</div>
                  </div>
                  <div>
                    <div className="text-sm text-gray-500">Criado em</div>
                    <div className="text-base font-medium">{formatDate(user.created_at)}</div>
                  </div>
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle>Assinatura</CardTitle>
              </CardHeader>
              <CardContent className="flex flex-wrap gap-3">
                <Link href="/checkout">
                  <Button className="bg-blue-600 hover:bg-blue-700">Gerenciar / Trocar Plano</Button>
                </Link>
                <Link href="/checkout/success">
                  <Button variant="outline">Histórico recente</Button>
                </Link>
              </CardContent>
            </Card>
          </div>
        )}
      </main>

      <Footer />

      <AuthModal isOpen={showAuthModal} onClose={() => setShowAuthModal(false)} />
    </div>
  );
}

