import { NextRequest, NextResponse } from 'next/server';
export const dynamic = 'force-dynamic';
export const revalidate = 0;
export const runtime = 'nodejs';
import { getSupabaseAdmin } from '@/lib/supabaseAdmin';

type AsaasWebhook = {
  event: string;
  payment?: any;
  data?: any;
};

export async function POST(request: NextRequest) {
  try {
    const payload = (await request.json()) as AsaasWebhook;
    const event = payload.event;
    const payment = payload.payment || payload.data || {};

    const ref: string | undefined = payment.externalReference || payment?.payment?.externalReference;
    if (!ref) {
      return NextResponse.json({ ok: true, skipped: 'no-external-reference' });
    }

    if(request.headers.get('asaas-access-token') !== process.env.ASAAS_WEBHOOK_TOKEN) {
      return NextResponse.json({ ok: true, skipped: 'invalid-webhook-token' });
    }

    const [userId, planSlug] = String(ref).split('|');
    if (!userId || !planSlug) {
      return NextResponse.json({ ok: true, skipped: 'invalid-external-reference' });
    }

    const successEvents = new Set([
      'PAYMENT_CONFIRMED',
      'PAYMENT_RECEIVED',
      'SUBSCRIPTION_CREATED',
    ]);

    if (successEvents.has(event)) {
      const supabaseAdmin = getSupabaseAdmin();
      const { error } = await supabaseAdmin
        .from('users')
        .update({ plan: planSlug })
        .eq('id', userId);
      if (error) {
        console.error('Erro ao atualizar plano do usuário:', error);
        return NextResponse.json({ error: 'db-error' }, { status: 500 });
      }
    }

    return NextResponse.json({ ok: true });
  } catch (err) {
    console.error('Webhook error:', err);
    return NextResponse.json({ error: 'invalid-payload' }, { status: 400 });
  }
}
