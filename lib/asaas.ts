export const runtime = 'nodejs';
type AsaasEnv = 'sandbox' | 'production';

export type AsaasCustomer = {
  id: string;
  name: string;
  email?: string;
  cpfCnpj?: string;
  mobilePhone?: string;
};

export type CreatePaymentLinkParams = {
  name: string;
  description?: string;
  value: number;
  externalReference?: string;
  chargeType?: 'DETACHED' | 'RECURRENT';
  billingType?: 'BOLETO' | 'CREDIT_CARD' | 'PIX' | 'UNDEFINED';
  dueDateLimitDays?: number;
  redirectUrl?: string;
};

export type CreatePaymentParams = {
  customer: string;
  billingType: 'BOLETO' | 'CREDIT_CARD' | 'PIX';
  value: number;
  dueDate?: string; // YYYY-MM-DD for boleto
  description?: string;
  externalReference?: string;
};

const ASAAS_ENV: AsaasEnv = (process.env.ASAAS_ENV as AsaasEnv) || 'sandbox';

function getApiKey(): string {
  return (
    process.env.ASAAS_API_KEY ||
    process.env.ASAAS_ACCESS_TOKEN ||
    ''
  );
}

function baseUrl() {
  return ASAAS_ENV === 'production'
    ? 'https://www.asaas.com/api/v3'
    : 'https://sandbox.asaas.com/api/v3';
}

function asaasHeaders() {
  const key = getApiKey();
  if (!key) {
    throw new Error('Asaas API key not configured. Set ASAAS_API_KEY or ASAAS_ACCESS_TOKEN');
  }
  return {
    'Content-Type': 'application/json',
    // Asaas v3 commonly uses access_token header
    'access_token': `$${key}`,
  } as Record<string, string>;
}

async function asaasFetch<T>(path: string, init?: RequestInit): Promise<T> {
  const res = await fetch(`${baseUrl()}${path}`, {
    ...init,
    headers: {
      ...asaasHeaders(),
      ...(init?.headers || {}),
    },
    // Ensure we don't cache sensitive calls
    cache: 'no-store',
  });
  if (!res.ok) {
    const text = await res.text().catch(() => '');
    throw new Error(`Asaas API error ${res.status}: ${text}`);
  }
  return res.json() as Promise<T>;
}

export async function findCustomerByEmail(email: string): Promise<AsaasCustomer | null> {
  const data = await asaasFetch<{ data: AsaasCustomer[] }>(`/customers?email=${encodeURIComponent(email)}`);
  return data.data?.[0] || null;
}

export async function createCustomer(payload: Partial<AsaasCustomer>): Promise<AsaasCustomer> {
  return asaasFetch<AsaasCustomer>(`/customers`, {
    method: 'POST',
    body: JSON.stringify(payload),
  });
}

export async function getOrCreateCustomer(payload: Partial<AsaasCustomer>): Promise<AsaasCustomer> {
  if (payload.email) {
    const existing = await findCustomerByEmail(payload.email);
    if (existing) return existing;
  }
  return createCustomer(payload);
}

export async function createPaymentLink(params: CreatePaymentLinkParams): Promise<{ id: string; url: string }>
{
  const body = {
    name: params.name,
    description: params.description,
    value: params.value,
    // If billingType is omitted, Asaas account settings decide allowed methods
    ...(params.billingType ? { billingType: params.billingType } : {}),
    chargeType: params.chargeType || 'RECURRENT',
    dueDateLimitDays: params.dueDateLimitDays ?? 3,
    externalReference: params.externalReference,
    redirectURL: params.redirectUrl,
  };

  return asaasFetch(`/paymentLinks`, {
    method: 'POST',
    body: JSON.stringify(body),
  });
}

export async function createPayment(params: CreatePaymentParams): Promise<{ id: string; invoiceUrl?: string }>
{
  const body = {
    customer: params.customer,
    billingType: params.billingType,
    value: params.value,
    dueDate: params.dueDate,
    description: params.description,
    externalReference: params.externalReference,
  };
  return asaasFetch(`/payments`, {
    method: 'POST',
    body: JSON.stringify(body),
  });
}

// Generate and fetch PIX QR code for a payment
export async function getPixQrCode(paymentId: string): Promise<{
  encodedImage?: string; // base64 PNG
  payload?: string; // copy and paste code
  expirationDate?: string;
}> {
  return asaasFetch(`/payments/${paymentId}/pixQrCode`, {
    method: 'POST',
  });
}

// Fetch payment details (useful for boleto or generic status)
export async function getPayment(paymentId: string): Promise<{
  id: string;
  status?: string;
  invoiceUrl?: string;
  bankSlipUrl?: string;
  identificationField?: string;
  billingType?: string;
  dueDate?: string;
}>
{
  return asaasFetch(`/payments/${paymentId}`, {
    method: 'GET',
  });
}

export async function createCreditCardPayment(params: {
  customer: string;
  value: number;
  description?: string;
  externalReference?: string;
  dueDate: string;
  creditCard: {
    holderName: string;
    number: string;
    expiryMonth: string;
    expiryYear: string;
    ccv: string;
  };
  creditCardHolderInfo: {
    name: string;
    email?: string;
    cpfCnpj?: string;
    mobilePhone?: string;
    postalCode?: string;
    addressNumber?: string;
    addressComplement?: string;
  };
  remoteIp?: string;
}): Promise<{ id: string; status?: string; invoiceUrl?: string }>
{
  const body = {
    customer: params.customer,
    billingType: 'CREDIT_CARD' as const,
    value: params.value,
    description: params.description,
    externalReference: params.externalReference,
    creditCard: params.creditCard,
    creditCardHolderInfo: params.creditCardHolderInfo,
    remoteIp: params.remoteIp,
    dueDate: params.dueDate
  };
  return asaasFetch(`/payments`, {
    method: 'POST',
    body: JSON.stringify(body),
  });
}
