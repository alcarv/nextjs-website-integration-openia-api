import { NextRequest, NextResponse } from 'next/server';
export const dynamic = 'force-dynamic';
export const revalidate = 0;
export const runtime = 'nodejs';

import { getPixQrCode, getPayment } from '@/lib/asaas';

export async function GET(request: NextRequest, { params }: { params: { id: string } }) {
  try {
    const paymentId = params.id;
    const { searchParams } = new URL(request.url);
    const type = searchParams.get('type');

    if (!paymentId) {
      return NextResponse.json({ error: 'paymentId required' }, { status: 400 });
    }

    if (type === 'pix') {
      const qr = await getPixQrCode(paymentId);
      return NextResponse.json({
        ok: true,
        type: 'pix',
        qrCodeImage: qr.encodedImage,
        qrCodePayload: qr.payload,
        expirationDate: qr.expirationDate,
      });
    }

    // Default: return generic payment info (useful for boleto)
    const payment = await getPayment(paymentId);
    return NextResponse.json({
      ok: true,
      type: payment.billingType || 'UNDEFINED',
      invoiceUrl: payment.invoiceUrl,
      bankSlipUrl: (payment as any).bankSlipUrl,
      identificationField: (payment as any).identificationField,
      dueDate: payment.dueDate,
      status: payment.status,
    });
  } catch (err) {
    console.error('Get payment details error:', err);
    return NextResponse.json({ error: 'failed-to-fetch' }, { status: 500 });
  }
}

