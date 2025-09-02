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
    // Parse JSON robustly in case of unexpected content-type
    let payload: AsaasWebhook;
    try {
      payload = (await request.json()) as AsaasWebhook;
    } catch (_) {
      const text = await request.text();
      payload = JSON.parse(text) as AsaasWebhook;
    }
    const event = payload?.event;
    const payment = (payload?.payment || payload?.data || {}) as any;

    const ref: string | undefined = payment.externalReference || payment?.payment?.externalReference;
    if (!ref) {
      return NextResponse.json({ error: 'no-external-reference' }, { status: 400 });
    }

    const webhookHeader =
      request.headers.get('asaas-access-token') ||
      request.headers.get('Asaas-Access-Token');
    if (webhookHeader !== process.env.ASAAS_WEBHOOK_TOKEN) {
      return NextResponse.json({ error: 'invalid-webhook-token' }, { status: 400 });
    }

    const [userId, planSlug] = String(ref).split('|');
    if (!userId || !planSlug) {
      return NextResponse.json({ error: 'invalid-external-reference' }, { status: 400 });
    }

    const successEvents = new Set([
      'PAYMENT_CONFIRMED',
      'PAYMENT_RECEIVED',
      'SUBSCRIPTION_CREATED',
    ]);

    if (successEvents.has(event)) {
      try {
        const supabaseAdmin = getSupabaseAdmin();
        const { error } = await supabaseAdmin
          .from('users')
          .update({ plan: planSlug })
          .eq('id', userId);
        if (error) {
          console.error('Erro ao atualizar plano do usuário:', error);
          return NextResponse.json({ error: 'db-error' }, { status: 500 });
        }
      } catch (e) {
        console.error('Supabase admin not configured or failed:', e);
        return NextResponse.json({ error: 'supabase-not-configured' }, { status: 400 });
      }
    }

    return NextResponse.json({ ok: true });
  } catch (err) {
    console.error('Webhook error:', err);
    return NextResponse.json({ error: 'invalid-payload' }, { status: 400 });
  }
}
