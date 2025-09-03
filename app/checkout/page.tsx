'use client';

import Navigation from '@/components/Navigation';
import AuthModal from '@/components/AuthModal';
import { useAuth } from '@/contexts/AuthContext';
import { useEffect, useState } from 'react';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Button } from '@/components/ui/button';
import { useRouter, useSearchParams } from 'next/navigation';
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
import { ArrowLeft } from 'lucide-react';

import {
  Card,
  CardHeader,
  CardTitle,
  CardDescription,
  CardContent,
  CardFooter,
} from '@/components/ui/card';
import { Separator } from '@/components/ui/separator';
import {
  formatCEP,
  formatCPF,
  formatCardNumber,
  formatCVV,
  formatExpiry,
  formatPhoneBR,
  formatUF,
  luhnCheck,
  onlyDigits,
  validateCPF,
  validateEmail,
  validateExpiry,
} from '@/lib/format';

export default function CheckoutPage() {
  const { user } = useAuth();
  const router = useRouter();
  const searchParams = useSearchParams();
  const { plans } = usePlans();
  const planSlug = searchParams.get('plan') || 'intermediate';
  const selectedPlan = plans.find((p) => p.slug === planSlug);
  const initialInterval = (searchParams.get('interval') as 'monthly' | 'annual') || 'monthly';
  const [billingInterval, setBillingInterval] = useState<'monthly' | 'annual'>(initialInterval);
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
  const [submitting, setSubmitting] = useState(false);
  const [cardData, setCardData] = useState({
    number: '',
    holderName: '',
    expiry: '', // MM/YY
    cvv: '',
  });
  const [errors, setErrors] = useState<Record<string, string>>({});
  const [paymentResult, setPaymentResult] = useState<
    | null
    | { type: 'pix'; qrCodeImage?: string; qrCodePayload?: string; expirationDate?: string }
    | { type: 'boleto'; bankSlipUrl?: string; identificationField?: string; invoiceUrl?: string; dueDate?: string }
    | { type: 'credit'; status?: string; invoiceUrl?: string }
  >(null);

  useEffect(() => {
    setShowAuthModal(!user);
  }, [user]);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    let v = value;
    if (name === 'cpf') v = formatCPF(value);
    if (name === 'phone') v = formatPhoneBR(value);
    if (name === 'cep') v = formatCEP(value);
    if (name === 'state') v = formatUF(value);
    if (name === 'number') v = onlyDigits(value).slice(0, 8);
    setFormData((prev) => ({ ...prev, [name]: v }));
    setErrors((prev) => ({ ...prev, [name]: '' }));
  };

  const handleCardChange = (field: 'number' | 'holderName' | 'expiry' | 'cvv', value: string) => {
    let v = value;
    if (field === 'number') v = formatCardNumber(value);
    if (field === 'expiry') v = formatExpiry(value);
    if (field === 'cvv') v = formatCVV(value);
    setCardData((p) => ({ ...p, [field]: v }));
    setErrors((prev) => ({ ...prev, [field]: '' }));
  };

  const validateForm = (): Record<string, string> => {
    const next: Record<string, string> = {};
    // Personal info
    if (!validateCPF(formData.cpf)) next.cpf = 'CPF inválido';
    if (!formData.fullName.trim()) next.fullName = 'Informe seu nome completo';
    if (!validateEmail(formData.email)) next.email = 'Email inválido';
    if (formData.phone) {
      const digits = onlyDigits(formData.phone);
      if (digits.length < 10 || digits.length > 11) next.phone = 'Telefone inválido';
    }

    // Address required only for credit card
    if (selectedPayment === 'credit') {
      const cepDigits = onlyDigits(formData.cep);
      if (cepDigits.length !== 8) next.cep = 'CEP inválido';
      if (!formData.number) next.number = 'Número obrigatório';
    }

    // Card
    if (selectedPayment === 'credit') {
      const cardDigits = onlyDigits(cardData.number);
      if (!luhnCheck(cardDigits)) next.numberCard = 'Número do cartão inválido';
      if (!cardData.holderName.trim()) next.holderName = 'Nome no cartão obrigatório';
      if (!validateExpiry(cardData.expiry)) next.expiry = 'Validade inválida';
      const cvvDigits = onlyDigits(cardData.cvv);
      if (cvvDigits.length < 3 || cvvDigits.length > 4) next.cvv = 'CVV inválido';
    }

    setErrors(next);
    return next;
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!user || !selectedPlan) return;
    const nextErrors = validateForm();
    if (Object.keys(nextErrors).length > 0) {
      // scroll to first error field (best effort)
      const firstKey = Object.keys(nextErrors)[0];
      const idMap: Record<string, string> = {
        numberCard: 'cardNumber',
        holderName: 'cardName',
      };
      const targetId = idMap[firstKey] || firstKey;
      const el = document.getElementById(targetId);
      if (el) el.scrollIntoView({ behavior: 'smooth', block: 'center' });
      return;
    }
    setSubmitting(true);
    setPaymentResult(null);
    try {
      const res = await fetch('/api/checkout', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${user.id}`,
        },
        body: JSON.stringify({
          planSlug: selectedPlan.slug,
          billingInterval,
          paymentMethod: selectedPayment,
          customer: {
            cpf: formData.cpf,
            fullName: formData.fullName || user.name,
            email: formData.email || user.email,
            phone: formData.phone,
          },
          ...(selectedPayment === 'credit'
            ? {
                card: {
                  holderName: cardData.holderName,
                  number: cardData.number,
                  expiryMonth: cardData.expiry.split('/')[0] || '',
                  expiryYear: cardData.expiry.split('/')[1] || '',
                  ccv: cardData.cvv,
                },
                address: {
                  postalCode: formData.cep,
                  addressNumber: formData.number,
                  addressComplement: formData.complement,
                },
              }
            : {}),
        }),
      });
      const data = await res.json();
      if (!res.ok) {
        throw new Error(data?.error || 'Falha ao iniciar o pagamento');
      }
      if (data?.type === 'pix') {
        const url = `/checkout/success?type=pix&paymentId=${encodeURIComponent(data.paymentId)}`;
        router.push(url);
      } else if (data?.type === 'boleto') {
        const params = new URLSearchParams({
          type: 'boleto',
          paymentId: String(data.paymentId || ''),
        });
        if (data.invoiceUrl) params.set('invoiceUrl', data.invoiceUrl);
        router.push(`/checkout/success?${params.toString()}`);
      } else if (data?.type === 'credit') {
        if (data.status === 'CONFIRMED' || data.status === 'RECEIVED') {
          router.push('/checkout/success');
        } else {
          setPaymentResult({ type: 'credit', status: data.status, invoiceUrl: data.invoiceUrl });
        }
      } else {
        throw new Error('Resposta inesperada do checkout');
      }
    } catch (err) {
      console.error(err);
      alert('Não foi possível iniciar o checkout. Tente novamente.');
    } finally {
      setSubmitting(false);
    }
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
          <div className="mb-4">
            <Button
              type="button"
              onClick={() => router.push('/humanizar#planos')}
              className="inline-flex items-center gap-2 border border-gray-300 bg-white text-gray-700 hover:bg-gray-50"
            >
              <ArrowLeft className="w-4 h-4" />
              Voltar aos Planos
            </Button>
          </div>
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
                    <div className="flex items-center justify-between mt-1">
                      <div className="flex flex-col gap-1">
                        <p className="text-sm text-gray-600">
                          {(() => {
                            const monthly = (selectedPlan as any).price_monthly ?? selectedPlan.price;
                            const annual = (selectedPlan as any).price_annual ?? (monthly * 12);
                            const value = billingInterval === 'annual' ? annual : monthly;
                            const suffix = billingInterval === 'annual' ? '/ano' : '/mês';
                            return `${selectedPlan.name} - R$ ${Number(value).toFixed(2)}${suffix}`;
                          })()}
                        </p>
                        {(() => {
                          const monthly = (selectedPlan as any).price_monthly ?? selectedPlan.price;
                          const annual = (selectedPlan as any).price_annual ?? (monthly * 12);
                          const fullYear = Number(monthly) * 12;
                          const savings = Math.max(0, fullYear - Number(annual));
                          const pct = fullYear > 0 ? Math.round((savings / fullYear) * 100) : 0;
                          if (billingInterval === 'annual' && savings > 0) {
                            return (
                              <span className="text-xs text-green-700 bg-green-100 w-fit px-2 py-0.5 rounded-full">
                                Economia anual: R$ {savings.toFixed(2)} ({pct}%)
                              </span>
                            );
                          }
                          return null;
                        })()}
                      </div>
                      <div className="flex items-center gap-2">
                        <button
                          type="button"
                          onClick={() => setBillingInterval('monthly')}
                          className={`px-3 py-1 rounded-full border text-xs ${billingInterval === 'monthly' ? 'bg-blue-600 text-white border-blue-600' : 'bg-white text-gray-700 border-gray-300'}`}
                        >
                          Mensal
                        </button>
                        <button
                          type="button"
                          onClick={() => setBillingInterval('annual')}
                          className={`px-3 py-1 rounded-full border text-xs ${billingInterval === 'annual' ? 'bg-blue-600 text-white border-blue-600' : 'bg-white text-gray-700 border-gray-300'}`}
                        >
                          Anual
                        </button>
                      </div>
                    </div>
                    {selectedPlan.character_quota !== null && (
                      <p className="text-xs text-gray-500">
                        Até {selectedPlan.character_quota?.toLocaleString('pt-BR')} caracteres por mês
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
                        maxLength={14}
                        inputMode="numeric"
                      />
                      {errors.cpf && (
                        <p className="text-sm text-red-600 mt-1">{errors.cpf}</p>
                      )}
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
                      {errors.fullName && (
                        <p className="text-sm text-red-600 mt-1">{errors.fullName}</p>
                      )}
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
                      {errors.email && (
                        <p className="text-sm text-red-600 mt-1">{errors.email}</p>
                      )}
                    </div>
                    <div>
                      <Label htmlFor="phone">Número de Telefone</Label>
                      <Input
                        id="phone"
                        name="phone"
                        placeholder="(00) 00000-0000"
                        value={formData.phone}
                        onChange={handleChange}
                        maxLength={15}
                        inputMode="numeric"
                      />
                      {errors.phone && (
                        <p className="text-sm text-red-600 mt-1">{errors.phone}</p>
                      )}
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
                        maxLength={9}
                        inputMode="numeric"
                      />
                      {errors.cep && (
                        <p className="text-sm text-red-600 mt-1">{errors.cep}</p>
                      )}
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
                        inputMode="numeric"
                      />
                      {errors.number && (
                        <p className="text-sm text-red-600 mt-1">{errors.number}</p>
                      )}
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
                        maxLength={2}
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
                          value={cardData.number}
                          onChange={(e) => handleCardChange('number', e.target.value)}
                          maxLength={23}
                          inputMode="numeric"
                        />
                        {errors.numberCard && (
                          <p className="text-sm text-red-600 mt-1">{errors.numberCard}</p>
                        )}
                      </div>
                      <div>
                        <Label htmlFor="cardName">Nome no Cartão</Label>
                        <Input
                          id="cardName"
                          placeholder="Nome como no cartão"
                          value={cardData.holderName}
                          onChange={(e) => handleCardChange('holderName', e.target.value)}
                        />
                        {errors.holderName && (
                          <p className="text-sm text-red-600 mt-1">{errors.holderName}</p>
                        )}
                      </div>
                      <div className="grid grid-cols-2 gap-2">
                        <div>
                          <Label htmlFor="expiry">Validade</Label>
                          <Input
                            id="expiry"
                            placeholder="MM/AA"
                            value={cardData.expiry}
                            onChange={(e) => handleCardChange('expiry', e.target.value)}
                            maxLength={5}
                            inputMode="numeric"
                          />
                          {errors.expiry && (
                            <p className="text-sm text-red-600 mt-1">{errors.expiry}</p>
                          )}
                        </div>
                        <div>
                          <Label htmlFor="cvv">CVV</Label>
                          <Input
                            id="cvv"
                            placeholder="123"
                            type="password"
                            value={cardData.cvv}
                            onChange={(e) => handleCardChange('cvv', e.target.value)}
                            maxLength={4}
                            inputMode="numeric"
                          />
                          {errors.cvv && (
                            <p className="text-sm text-red-600 mt-1">{errors.cvv}</p>
                          )}
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
                    {(() => {
                      const monthly = (selectedPlan as any)?.price_monthly ?? selectedPlan?.price ?? 0;
                      const annual = (selectedPlan as any)?.price_annual ?? (monthly * 12);
                      const subtotal = billingInterval === 'annual' ? Number(annual) : Number(monthly);
                      const fullYear = Number(monthly) * 12;
                      const savings = Math.max(0, fullYear - Number(annual));
                      const pct = fullYear > 0 ? Math.round((savings / fullYear) * 100) : 0;
                      const discount = selectedPayment === 'pix' ? Number((subtotal * 0.05).toFixed(2)) : 0;
                      const total = selectedPayment === 'pix' ? Number((subtotal * 0.95).toFixed(2)) : subtotal;
                      return (
                        <>
                          {billingInterval === 'annual' && savings > 0 && (
                            <div className="flex justify-between items-center mb-2">
                              <span className="text-gray-600 line-through">12× mensal: R$ {fullYear.toFixed(2)}</span>
                              <span className="text-green-700 text-sm">Economia do anual: R$ {savings.toFixed(2)} ({pct}%)</span>
                            </div>
                          )}
                          <div className="flex justify-between items-center mb-2">
                            <span className="text-gray-600">Subtotal:</span>
                            <span className="font-semibold">R$ {subtotal.toFixed(2)}</span>
                          </div>
                          {selectedPayment === 'pix' && (
                            <div className="flex justify-between items-center mb-2">
                              <span className="text-green-600">Desconto PIX (5%):</span>
                              <span className="font-semibold text-green-600">-R$ {discount.toFixed(2)}</span>
                            </div>
                          )}
                          <Separator className="my-2" />
                          <div className="flex justify-between items-center">
                            <span className="text-lg font-bold">Total:</span>
                            <span className="text-lg font-bold text-blue-600">R$ {total.toFixed(2)}</span>
                          </div>
                        </>
                      );
                    })()}
                  </div>
                  
                <Button
                  type="submit"
                  disabled={submitting}
                  className="w-full bg-gradient-to-r from-blue-600 to-red-600 hover:from-blue-700 hover:to-red-700 text-white py-3 text-lg font-semibold disabled:opacity-70"
                >
                  {submitting
                    ? 'Processando...'
                    : selectedPayment === 'credit'
                      ? 'Finalizar Pagamento'
                      : selectedPayment === 'pix'
                        ? 'Gerar QR Code PIX'
                        : 'Gerar Boleto'}
                </Button>
                </div>
              </CardFooter>
            </form>
          </Card>

          {/* Result blocks for PIX and Boleto (stay on site) */}
          {paymentResult?.type === 'pix' && (
            <div className="mt-6 p-6 bg-white rounded-lg border">
              <h3 className="text-lg font-semibold mb-4">Pague com PIX</h3>
              {paymentResult.qrCodeImage ? (
                <img
                  src={`data:image/png;base64,${paymentResult.qrCodeImage}`}
                  alt="QR Code PIX"
                  className="mx-auto w-64 h-64 object-contain"
                />
              ) : null}
              {paymentResult.qrCodePayload && (
                <div className="mt-4">
                  <Label>Código copia e cola</Label>
                  <Input readOnly value={paymentResult.qrCodePayload} />
                </div>
              )}
              {paymentResult.expirationDate && (
                <p className="text-sm text-gray-600 mt-2">Válido até: {new Date(paymentResult.expirationDate).toLocaleString('pt-BR')}</p>
              )}
            </div>
          )}

          {paymentResult?.type === 'boleto' && (
            <div className="mt-6 p-6 bg-white rounded-lg border">
              <h3 className="text-lg font-semibold mb-4">Boleto gerado</h3>
              {paymentResult.bankSlipUrl || paymentResult.invoiceUrl ? (
                <a
                  href={paymentResult.bankSlipUrl || paymentResult.invoiceUrl}
                  target="_blank"
                  className="text-blue-600 underline"
                  rel="noreferrer"
                >
                  Visualizar/baixar boleto
                </a>
              ) : null}
              {paymentResult.identificationField && (
                <div className="mt-4">
                  <Label>Linha digitável</Label>
                  <Input readOnly value={paymentResult.identificationField} />
                </div>
              )}
              {paymentResult.dueDate && (
                <p className="text-sm text-gray-600 mt-2">Vencimento: {paymentResult.dueDate}</p>
              )}
            </div>
          )}

          {paymentResult?.type === 'credit' && paymentResult.status && (
            <div className="mt-6 p-6 bg-white rounded-lg border">
              <h3 className="text-lg font-semibold mb-2">Status do pagamento</h3>
              <p className="text-gray-700">{paymentResult.status}</p>
              {paymentResult.invoiceUrl && (
                <a href={paymentResult.invoiceUrl} target="_blank" rel="noreferrer" className="text-blue-600 underline mt-2 inline-block">
                  Ver comprovante
                </a>
              )}
            </div>
          )}

        </div>
      ) : null}
      <AuthModal isOpen={showAuthModal} onClose={() => setShowAuthModal(false)} />
    </div>
  );
}
