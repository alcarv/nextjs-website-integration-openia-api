import { NextRequest, NextResponse } from 'next/server';
import { addDays, format } from 'date-fns';

// Force dynamic to allow reading headers/request URL in this route
export const dynamic = 'force-dynamic';
export const revalidate = 0;
export const runtime = 'nodejs';
import { supabase } from '@/lib/supabase';
import { createPayment, createCreditCardPayment, getOrCreateCustomer, getPixQrCode } from '@/lib/asaas';

export async function POST(request: NextRequest) {
  try {
    const userId = request.headers.get('Authorization')?.replace('Bearer ', '');
    if (!userId) {
      return NextResponse.json({ error: 'Usuário não autenticado' }, { status: 401 });
    }
    const body = await request.json();
    const {
      planSlug,
      paymentMethod,
      customer: customerPayload,
      card,
      address,
    }: {
      planSlug: string;
      paymentMethod: 'credit' | 'pix' | 'boleto';
      customer: {
        cpf?: string;
        fullName?: string;
        email?: string;
        phone?: string;
      };
      card?: {
        holderName: string;
        number: string;
        expiryMonth: string;
        expiryYear: string;
        ccv: string;
      };
      address?: {
        postalCode?: string;
        addressNumber?: string;
        addressComplement?: string;
      };
    } = body || {};

    if (!planSlug) {
      return NextResponse.json({ error: 'Plano não informado' }, { status: 400 });
    }

    // Load plan from DB
    const { data: plan, error: planError } = await supabase
      .from('plans')
      .select('*')
      .eq('slug', planSlug)
      .single();

    if (planError || !plan) {
      return NextResponse.json({ error: 'Plano inválido' }, { status: 400 });
    }

    // Fetch user to enrich customer data
    const { data: user, error: userError } = await supabase
      .from('users')
      .select('*')
      .eq('id', userId)
      .single();
    if (userError || !user) {
      return NextResponse.json({ error: 'Usuário não encontrado' }, { status: 404 });
    }

    const name = customerPayload?.fullName || user.name;
    const email = customerPayload?.email || user.email;
    const cpfCnpj = (customerPayload?.cpf || '').replace(/\D/g, '') || undefined;
    const mobilePhone = (customerPayload?.phone || '').replace(/\D/g, '') || undefined;

    // Ensure Asaas customer exists
    const customer = await getOrCreateCustomer({
      name,
      email,
      cpfCnpj,
      mobilePhone,
    });

    // Compute price, apply PIX discount if chosen on UI
    const baseValue = Number(plan.price || 0);
    const value = paymentMethod === 'pix' ? Number((baseValue * 0.95).toFixed(2)) : baseValue;

    // Direct integration (no redirect): create the appropriate payment and return data
    if (paymentMethod === 'pix') {
      const payment = await createPayment({
        customer: customer.id,
        billingType: 'PIX',
        value,
        description: `Assinatura do plano ${plan.name}`,
        externalReference: `${userId}|${planSlug}`,
        dueDate: format(new Date(), 'yyyy-MM-dd')
      });
      const qr = await getPixQrCode(payment.id);
      return NextResponse.json({
        ok: true,
        type: 'pix',
        paymentId: payment.id,
        qrCodeImage: qr.encodedImage,
        qrCodePayload: qr.payload,
        expirationDate: qr.expirationDate,
      });
    }

    if (paymentMethod === 'boleto') {
      // Default due date: +3 days
      const dueDate = new Date();
      dueDate.setDate(dueDate.getDate() + 3);
      const yyyy = dueDate.getFullYear();
      const mm = String(dueDate.getMonth() + 1).padStart(2, '0');
      const dd = String(dueDate.getDate()).padStart(2, '0');

      const payment = await createPayment({
        customer: customer.id,
        billingType: 'BOLETO',
        value,
        description: `Assinatura do plano ${plan.name}`,
        externalReference: `${userId}|${planSlug}`,
        dueDate: format(addDays(new Date(), 3), 'yyyy-MM-dd')
      });

      // Asaas usually returns boleto info in the payment payload; surface common fields
      return NextResponse.json({
        ok: true,
        type: 'boleto',
        paymentId: payment.id,
        // invoiceUrl helps users view/print boleto; keep it client-side
        invoiceUrl: (payment as any).invoiceUrl,
        bankSlipUrl: (payment as any).bankSlipUrl,
        identificationField: (payment as any).identificationField,
        dueDate: `${yyyy}-${mm}-${dd}`,
      });
    }

    if (paymentMethod === 'credit') {
      if (!card) {
        return NextResponse.json({ error: 'Dados do cartão são obrigatórios' }, { status: 400 });
      }
      const remoteIp =
        request.headers.get('x-forwarded-for')?.split(',')[0]?.trim() ||
        request.headers.get('x-real-ip') ||
        undefined;

      const payment = await createCreditCardPayment({
        customer: customer.id,
        value,
        description: `Assinatura do plano ${plan.name}`,
        externalReference: `${userId}|${planSlug}`,
        dueDate: format(new Date(), 'yyyy-MM-dd'),
        creditCard: {
          holderName: card.holderName,
          number: card.number.replace(/\s+/g, ''),
          expiryMonth: card.expiryMonth,
          expiryYear: card.expiryYear.length === 2 ? `20${card.expiryYear}` : card.expiryYear,
          ccv: card.ccv,
        },
        creditCardHolderInfo: {
          name,
          email,
          cpfCnpj,
          mobilePhone,
          postalCode: address?.postalCode,
          addressNumber: address?.addressNumber,
          addressComplement: address?.addressComplement,
        },
        remoteIp,
      });

      return NextResponse.json({
        ok: true,
        type: 'credit',
        paymentId: payment.id,
        status: (payment as any).status,
        invoiceUrl: (payment as any).invoiceUrl,
      });
    }

    return NextResponse.json({ error: 'Método de pagamento inválido' }, { status: 400 });
  } catch (err: any) {
    console.error('Checkout error:', err);
    return NextResponse.json({ error: 'Erro ao iniciar checkout' }, { status: 500 });
  }
}
