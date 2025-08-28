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
  CreditCard, 
  QrCode, 
  FileText, 
  Check,
  Calendar,
  Shield,
  Zap
} from 'lucide-react';

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
  const [selectedPayment, setSelectedPayment] = useState('credit');

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

  const paymentMethods = [
    {
      id: 'credit',
      name: 'Cartão de Crédito',
      description: 'Aprovação instantânea',
      icon: CreditCard,
      color: 'blue',
      features: ['Parcelamento em até 12x', 'Aprovação imediata', 'Seguro e protegido'],
      processing: 'Instantâneo'
    },
    {
      id: 'pix',
      name: 'PIX',
      description: 'Pagamento instantâneo',
      icon: QrCode,
      color: 'green',
      features: ['Desconto de 5%', 'Aprovação em segundos', 'Disponível 24/7'],
      processing: 'Imediato'
    },
    {
      id: 'boleto',
      name: 'Boleto Bancário',
      description: 'Vencimento em 3 dias',
      icon: FileText,
      color: 'orange',
      features: ['Sem taxas extras', 'Pague em qualquer banco', 'Até 3 dias para pagar'],
      processing: '1-2 dias úteis'
    }
  ];

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

                <Separator />

                <div>
                  <h2 className="text-lg font-semibold mb-6">Método de Pagamento</h2>
                  <div className="grid gap-4">
                    {paymentMethods.map((method) => {
                      const IconComponent = method.icon;
                      const isSelected = selectedPayment === method.id;
                      const colorClasses = {
                        blue: {
                          border: isSelected ? 'border-blue-500 bg-blue-50' : 'border-gray-200 hover:border-blue-300',
                          icon: 'text-blue-600 bg-blue-100',
                          badge: 'bg-blue-100 text-blue-800'
                        },
                        green: {
                          border: isSelected ? 'border-green-500 bg-green-50' : 'border-gray-200 hover:border-green-300',
                          icon: 'text-green-600 bg-green-100',
                          badge: 'bg-green-100 text-green-800'
                        },
                        orange: {
                          border: isSelected ? 'border-orange-500 bg-orange-50' : 'border-gray-200 hover:border-orange-300',
                          icon: 'text-orange-600 bg-orange-100',
                          badge: 'bg-orange-100 text-orange-800'
                        }
                      };
                      
                      return (
                        <div
                          key={method.id}
                          onClick={() => setSelectedPayment(method.id)}
                          className={`relative p-6 border-2 rounded-xl cursor-pointer transition-all duration-200 ${colorClasses[method.color as keyof typeof colorClasses].border}`}
                        >
                          {isSelected && (
                            <div className="absolute top-4 right-4">
                              <div className="w-6 h-6 bg-blue-600 rounded-full flex items-center justify-center">
                                <Check className="w-4 h-4 text-white" />
                              </div>
                            </div>
                          )}
                          
                          <div className="flex items-start space-x-4">
                            <div className={`p-3 rounded-lg ${colorClasses[method.color as keyof typeof colorClasses].icon}`}>
                              <IconComponent className="w-6 h-6" />
                            </div>
                            
                            <div className="flex-1">
                              <div className="flex items-center space-x-3 mb-2">
                                <h3 className="text-lg font-semibold text-gray-900">{method.name}</h3>
                                <span className={`px-2 py-1 rounded-full text-xs font-medium ${colorClasses[method.color as keyof typeof colorClasses].badge}`}>
                                  {method.processing}
                                </span>
                              </div>
                              
                              <p className="text-gray-600 mb-3">{method.description}</p>
                              
                              <ul className="space-y-1">
                                {method.features.map((feature, index) => (
                                  <li key={index} className="flex items-center space-x-2 text-sm text-gray-600">
                                    <div className="w-1.5 h-1.5 bg-gray-400 rounded-full"></div>
                                    <span>{feature}</span>
                                  </li>
                                ))}
                              </ul>
                            </div>
                          </div>
                        </div>
                      );
                    })}
                  </div>
                </div>

                <Separator />

                {/* Payment Details */}
                {selectedPayment === 'credit' && (
                  <div>
                    <h3 className="text-lg font-semibold mb-4 flex items-center">
                      <CreditCard className="w-5 h-5 mr-2 text-blue-600" />
                      Dados do Cartão
                    </h3>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      <div className="md:col-span-2">
                        <Label htmlFor="cardNumber">Número do Cartão</Label>
                        <Input
                          id="cardNumber"
                          placeholder="0000 0000 0000 0000"
                          className="text-lg tracking-wider"
                        />
                      </div>
                      <div>
                        <Label htmlFor="cardName">Nome no Cartão</Label>
                        <Input
                          id="cardName"
                          placeholder="Nome como no cartão"
                        />
                      </div>
                      <div className="grid grid-cols-2 gap-2">
                        <div>
                          <Label htmlFor="expiry">Validade</Label>
                          <Input
                            id="expiry"
                            placeholder="MM/AA"
                          />
                        </div>
                        <div>
                          <Label htmlFor="cvv">CVV</Label>
                          <Input
                            id="cvv"
                            placeholder="123"
                            type="password"
                          />
                        </div>
                      </div>
                    </div>
                    
                    <div className="mt-4 p-4 bg-blue-50 rounded-lg">
                      <div className="flex items-center space-x-2 mb-2">
                        <Shield className="w-4 h-4 text-blue-600" />
                        <span className="text-sm font-medium text-blue-900">Pagamento Seguro</span>
                      </div>
                      <p className="text-xs text-blue-700">
                        Seus dados são protegidos com criptografia SSL de 256 bits. 
                        Não armazenamos informações do cartão.
                      </p>
                    </div>
                  </div>
                )}

                {selectedPayment === 'pix' && (
                  <div>
                    <h3 className="text-lg font-semibold mb-4 flex items-center">
                      <QrCode className="w-5 h-5 mr-2 text-green-600" />
                      Pagamento via PIX
                    </h3>
                    <div className="bg-green-50 border border-green-200 rounded-lg p-6">
                      <div className="text-center">
                        <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-4">
                          <QrCode className="w-8 h-8 text-green-600" />
                        </div>
                        <h4 className="text-lg font-semibold text-green-900 mb-2">
                          Desconto de 5% no PIX!
                        </h4>
                        <p className="text-green-700 mb-4">
                          Após finalizar o pedido, você receberá o QR Code para pagamento instantâneo.
                        </p>
                        <div className="flex items-center justify-center space-x-4 text-sm text-green-600">
                          <div className="flex items-center space-x-1">
                            <Zap className="w-4 h-4" />
                            <span>Aprovação imediata</span>
                          </div>
                          <div className="flex items-center space-x-1">
                            <Shield className="w-4 h-4" />
                            <span>100% seguro</span>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                )}

                {selectedPayment === 'boleto' && (
                  <div>
                    <h3 className="text-lg font-semibold mb-4 flex items-center">
                      <FileText className="w-5 h-5 mr-2 text-orange-600" />
                      Boleto Bancário
                    </h3>
                    <div className="bg-orange-50 border border-orange-200 rounded-lg p-6">
                      <div className="text-center">
                        <div className="w-16 h-16 bg-orange-100 rounded-full flex items-center justify-center mx-auto mb-4">
                          <FileText className="w-8 h-8 text-orange-600" />
                        </div>
                        <h4 className="text-lg font-semibold text-orange-900 mb-2">
                          Boleto com vencimento em 3 dias
                        </h4>
                        <p className="text-orange-700 mb-4">
                          Após finalizar o pedido, você receberá o boleto por email para pagamento.
                        </p>
                        <div className="flex items-center justify-center space-x-4 text-sm text-orange-600">
                          <div className="flex items-center space-x-1">
                            <Calendar className="w-4 h-4" />
                            <span>Até 3 dias para pagar</span>
                          </div>
                          <div className="flex items-center space-x-1">
                            <Shield className="w-4 h-4" />
                            <span>Sem taxas extras</span>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                )}
              </CardContent>
              <CardFooter className="flex justify-end">
                <div className="w-full space-y-4">
                  {/* Order Summary */}
                  <div className="bg-gray-50 rounded-lg p-4">
                    <div className="flex justify-between items-center mb-2">
                      <span className="text-gray-600">Subtotal:</span>
                      <span className="font-semibold">R$ {selectedPlan?.price ?? 0}</span>
                    </div>
                    {selectedPayment === 'pix' && (
                      <div className="flex justify-between items-center mb-2">
                        <span className="text-green-600">Desconto PIX (5%):</span>
                        <span className="font-semibold text-green-600">
                          -R$ {((selectedPlan?.price ?? 0) * 0.05).toFixed(2)}
                        </span>
                      </div>
                    )}
                    <Separator className="my-2" />
                    <div className="flex justify-between items-center">
                      <span className="text-lg font-bold">Total:</span>
                      <span className="text-lg font-bold text-blue-600">
                        R$ {selectedPayment === 'pix' 
                          ? ((selectedPlan?.price ?? 0) * 0.95).toFixed(2)
                          : (selectedPlan?.price ?? 0)
                        }
                      </span>
                    </div>
                  </div>
                  
                <Button
                  type="submit"
                  className="w-full bg-gradient-to-r from-blue-600 to-red-600 hover:from-blue-700 hover:to-red-700 text-white py-3 text-lg font-semibold"
                >
                  {selectedPayment === 'credit' && 'Finalizar Pagamento'}
                  {selectedPayment === 'pix' && 'Gerar QR Code PIX'}
                  {selectedPayment === 'boleto' && 'Gerar Boleto'}
                </Button>
                </div>
              </CardFooter>
            </form>
          </Card>

        </div>
      ) : null}
      <AuthModal isOpen={showAuthModal} onClose={() => setShowAuthModal(false)} />
    </div>
  );
}