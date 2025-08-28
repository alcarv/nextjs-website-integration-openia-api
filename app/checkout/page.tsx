'use client';

import Navigation from '@/components/Navigation';
import AuthModal from '@/components/AuthModal';
import { useAuth } from '@/contexts/AuthContext';
import { useEffect, useState } from 'react';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Button } from '@/components/ui/button';
import { useSearchParams } from 'next/navigation';
import { usePlans } from '@/hooks/usePlans';

import {
  Card,
  CardHeader,
  CardTitle,
  CardDescription,
  CardContent,
  CardFooter,
} from '@/components/ui/card';
import { Separator } from '@/components/ui/separator';

export default function CheckoutPage() {
  const { user } = useAuth();
  const searchParams = useSearchParams();
  const { plans } = usePlans();
  const planSlug = searchParams.get('plan') || 'premium';
  const selectedPlan = plans.find((p) => p.slug === planSlug);
  const [showAuthModal, setShowAuthModal] = useState(false);
  const [formData, setFormData] = useState({
    cpf: '',
    fullName: '',
    email: '',
    phone: '',
    cep: '',
    street: '',
    number: '',
    complement: '',
    city: '',
    state: '',
  });

  useEffect(() => {
    setShowAuthModal(!user);
  }, [user]);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    console.log(formData);
  };

  return (
    <div className="min-h-screen gradient-bg">
      <Navigation />
      {user ? (
        <div className="max-w-4xl mx-auto px-4 py-20">
          <Card className="shadow-lg">
            <CardHeader>
              <CardTitle>Checkout</CardTitle>
              <CardDescription>
                {selectedPlan
                  ? `Finalize sua assinatura do plano ${selectedPlan.name}.`
                  : 'Carregando informações do plano...'}
              </CardDescription>
            </CardHeader>
            <form onSubmit={handleSubmit}>
              <CardContent className="space-y-8">
                {selectedPlan && (
                  <div className="p-4 bg-gray-50 rounded-md">
                    <h2 className="text-md font-semibold">Plano Selecionado</h2>
                    <p className="text-sm text-gray-600">
                      {selectedPlan.name} - R$ {selectedPlan.price}/mês
                    </p>
                    {selectedPlan.humanizations_per_month !== null && (
                      <p className="text-xs text-gray-500">
                        {selectedPlan.humanizations_per_month} humanizações por mês
                      </p>
                    )}
                  </div>
                )}
                <div>
                  <h2 className="text-lg font-semibold mb-4">
                    Informações Pessoais
                  </h2>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div>
                      <Label htmlFor="cpf">CPF</Label>
                      <Input
                        id="cpf"
                        name="cpf"
                        placeholder="000.000.000-00"
                        value={formData.cpf}
                        onChange={handleChange}
                        required
                      />
                    </div>
                    <div className="md:col-span-2">
                      <Label htmlFor="fullName">Nome Completo</Label>
                      <Input
                        id="fullName"
                        name="fullName"
                        placeholder="Seu nome completo"
                        value={formData.fullName}
                        onChange={handleChange}
                        required
                      />
                    </div>
                    <div>
                      <Label htmlFor="email">Email</Label>
                      <Input
                        id="email"
                        type="email"
                        name="email"
                        placeholder="seu@email.com"
                        value={formData.email}
                        onChange={handleChange}
                        required
                      />
                    </div>
                    <div>
                      <Label htmlFor="phone">Número de Telefone</Label>
                      <Input
                        id="phone"
                        name="phone"
                        placeholder="(00) 00000-0000"
                        value={formData.phone}
                        onChange={handleChange}
                      />
                    </div>
                  </div>
                </div>

                <Separator />

                <div>
                  <h2 className="text-lg font-semibold mb-4">Endereço</h2>
                  <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                    <div>
                      <Label htmlFor="cep">CEP</Label>
                      <Input
                        id="cep"
                        name="cep"
                        placeholder="00000-000"
                        value={formData.cep}
                        onChange={handleChange}
                      />
                    </div>
                    <div className="md:col-span-2">
                      <Label htmlFor="street">Rua</Label>
                      <Input
                        id="street"
                        name="street"
                        placeholder="Nome da rua"
                        value={formData.street}
                        onChange={handleChange}
                      />
                    </div>
                    <div>
                      <Label htmlFor="number">Número</Label>
                      <Input
                        id="number"
                        name="number"
                        placeholder="123"
                        value={formData.number}
                        onChange={handleChange}
                      />
                    </div>
                    <div className="md:col-span-2">
                      <Label htmlFor="complement">Complemento</Label>
                      <Input
                        id="complement"
                        name="complement"
                        placeholder="Apto, bloco, etc."
                        value={formData.complement}
                        onChange={handleChange}
                      />
                    </div>
                    <div className="md:col-span-2">
                      <Label htmlFor="city">Cidade</Label>
                      <Input
                        id="city"
                        name="city"
                        placeholder="Sua cidade"
                        value={formData.city}
                        onChange={handleChange}
                      />
                    </div>
                    <div>
                      <Label htmlFor="state">Estado</Label>
                      <Input
                        id="state"
                        name="state"
                        placeholder="UF"
                        value={formData.state}
                        onChange={handleChange}
                      />
                    </div>
                  </div>
                </div>
              </CardContent>
              <CardFooter className="flex justify-end">
                <Button
                  type="submit"
                  className="w-full md:w-auto bg-blue-600 hover:bg-blue-700"
                >
                  Finalizar
                </Button>
              </CardFooter>
            </form>
          </Card>

        </div>
      ) : null}
      <AuthModal isOpen={showAuthModal} onClose={() => setShowAuthModal(false)} />
    </div>
  );
}

