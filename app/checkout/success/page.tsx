'use client';

import Navigation from '@/components/Navigation';
import { useEffect, useMemo, useState } from 'react';
import { useSearchParams, useRouter } from 'next/navigation';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Label } from '@/components/ui/label';
import { Input } from '@/components/ui/input';

type PixData = {
  qrCodeImage?: string;
  qrCodePayload?: string;
  expirationDate?: string;
};

type BoletoData = {
  invoiceUrl?: string;
  bankSlipUrl?: string;
  identificationField?: string;
  dueDate?: string;
};

export default function CheckoutSuccessPage() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const type = (searchParams.get('type') || '').toLowerCase();
  const paymentId = searchParams.get('paymentId') || '';
  const presetInvoiceUrl = searchParams.get('invoiceUrl') || '';
  const [loading, setLoading] = useState(false);
  const [pix, setPix] = useState<PixData | null>(null);
  const [boleto, setBoleto] = useState<BoletoData | null>(null);
  const isPix = type === 'pix';
  const isBoleto = type === 'boleto';

  const pageTitle = useMemo(() => {
    if (isPix) return 'Pagamento via PIX';
    if (isBoleto) return 'Boleto gerado';
    return 'Pagamento iniciado';
  }, [isPix, isBoleto]);

  useEffect(() => {
    let cancelled = false;
    async function load() {
      if (!paymentId && !presetInvoiceUrl) return;
      setLoading(true);
      try {
        if (isPix && paymentId) {
          const res = await fetch(`/api/payments/${paymentId}?type=pix`, { cache: 'no-store' });
          const data = await res.json();
          if (!cancelled && res.ok) {
            setPix({
              qrCodeImage: data.qrCodeImage,
              qrCodePayload: data.qrCodePayload,
              expirationDate: data.expirationDate,
            });
          }
        } else if (isBoleto) {
          if (presetInvoiceUrl) {
            setBoleto({ invoiceUrl: presetInvoiceUrl });
          } else if (paymentId) {
            const res = await fetch(`/api/payments/${paymentId}`, { cache: 'no-store' });
            const data = await res.json();
            if (!cancelled && res.ok) {
              setBoleto({
                invoiceUrl: data.invoiceUrl,
                bankSlipUrl: data.bankSlipUrl,
                identificationField: data.identificationField,
                dueDate: data.dueDate,
              });
            }
          }
        }
      } catch (e) {
        console.error('Failed to load payment details', e);
      } finally {
        if (!cancelled) setLoading(false);
      }
    }
    load();
    return () => {
      cancelled = true;
    };
  }, [isPix, isBoleto, paymentId, presetInvoiceUrl]);

  return (
    <div className="min-h-screen gradient-bg">
      <Navigation />
      <div className="max-w-3xl mx-auto px-4 py-20">
        <Card className="shadow-lg">
          <CardHeader>
            <CardTitle>Parabéns! 🎉</CardTitle>
            <CardDescription>
              {pageTitle} — finalize conforme as instruções abaixo.
            </CardDescription>
          </CardHeader>
          <CardContent className="space-y-6">
            {isPix && (
              <div className="space-y-4">
                <p className="text-gray-700">
                  Escaneie o QR Code abaixo ou use o código copia e cola para concluir o pagamento.
                </p>
                {loading && <p>Carregando QR Code...</p>}
                {pix?.qrCodeImage && (
                  <img
                    src={`data:image/png;base64,${pix.qrCodeImage}`}
                    alt="QR Code PIX"
                    className="mx-auto w-64 h-64 object-contain"
                  />
                )}
                {pix?.qrCodePayload && (
                  <div>
                    <Label>Código copia e cola</Label>
                    <Input readOnly value={pix.qrCodePayload} />
                  </div>
                )}
                {pix?.expirationDate && (
                  <p className="text-sm text-gray-600">
                    Válido até: {new Date(pix.expirationDate).toLocaleString('pt-BR')}
                  </p>
                )}
              </div>
            )}

            {isBoleto && (
              <div className="space-y-4">
                <p className="text-gray-700">
                  Seu boleto foi gerado. Clique no link para visualizar ou imprimir.
                </p>
                {(boleto?.bankSlipUrl || boleto?.invoiceUrl) && (
                  <a
                    href={boleto.bankSlipUrl || boleto.invoiceUrl}
                    target="_blank"
                    className="text-blue-600 underline"
                    rel="noreferrer"
                  >
                    Abrir boleto
                  </a>
                )}
                {boleto?.identificationField && (
                  <div>
                    <Label>Linha digitável</Label>
                    <Input readOnly value={boleto.identificationField} />
                  </div>
                )}
                {boleto?.dueDate && (
                  <p className="text-sm text-gray-600">Vencimento: {boleto.dueDate}</p>
                )}
              </div>
            )}

            {!isPix && !isBoleto && (
              <p className="text-gray-700">Seu pagamento foi iniciado. Você receberá atualizações por e-mail.</p>
            )}

            <div className="pt-2">
              <Button
                className="bg-gradient-to-r from-blue-600 to-red-600 hover:from-blue-700 hover:to-red-700"
                onClick={() => router.push('/humanizar')}
              >
                Ir para o humanizador
              </Button>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}

