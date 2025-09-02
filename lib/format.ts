export function onlyDigits(value: string): string {
  return (value || '').replace(/\D+/g, '');
}

export function formatCPF(value: string): string {
  const digits = onlyDigits(value).slice(0, 11);
  const part1 = digits.slice(0, 3);
  const part2 = digits.slice(3, 6);
  const part3 = digits.slice(6, 9);
  const part4 = digits.slice(9, 11);
  let out = part1;
  if (part2) out += `.${part2}`;
  if (part3) out += `.${part3}`;
  if (part4) out += `-${part4}`;
  return out;
}

export function validateCPF(raw: string): boolean {
  const cpf = onlyDigits(raw);
  if (cpf.length !== 11) return false;
  if (/^(\d)\1{10}$/.test(cpf)) return false; // all same digits

  const calcCheck = (base: string, factorStart: number) => {
    let sum = 0;
    for (let i = 0; i < base.length; i++) {
      sum += parseInt(base[i], 10) * (factorStart - i);
    }
    const result = (sum * 10) % 11;
    return result === 10 ? 0 : result;
  };

  const d1 = calcCheck(cpf.slice(0, 9), 10);
  const d2 = calcCheck(cpf.slice(0, 10), 11);
  return d1 === parseInt(cpf[9], 10) && d2 === parseInt(cpf[10], 10);
}

export function formatPhoneBR(value: string): string {
  const digits = onlyDigits(value).slice(0, 11);
  const ddd = digits.slice(0, 2);
  const rest = digits.slice(2);
  if (!ddd) return '';
  if (rest.length <= 4) return `(${ddd}) ${rest}`.trim();
  if (rest.length <= 8) return `(${ddd}) ${rest.slice(0, 4)}-${rest.slice(4)}`;
  return `(${ddd}) ${rest.slice(0, 5)}-${rest.slice(5, 9)}`;
}

export function formatCEP(value: string): string {
  const digits = onlyDigits(value).slice(0, 8);
  if (digits.length <= 5) return digits;
  return `${digits.slice(0, 5)}-${digits.slice(5)}`;
}

export function formatCardNumber(value: string): string {
  const digits = onlyDigits(value).slice(0, 19); // allow up to 19 digits
  return digits.replace(/(.{4})/g, '$1 ').trim();
}

export function luhnCheck(value: string): boolean {
  const digits = onlyDigits(value);
  if (digits.length < 13) return false;
  let sum = 0;
  let shouldDouble = false;
  for (let i = digits.length - 1; i >= 0; i--) {
    let d = parseInt(digits[i], 10);
    if (shouldDouble) {
      d *= 2;
      if (d > 9) d -= 9;
    }
    sum += d;
    shouldDouble = !shouldDouble;
  }
  return sum % 10 === 0;
}

export function formatExpiry(value: string): string {
  const digits = onlyDigits(value).slice(0, 4); // MMYY
  const mm = digits.slice(0, 2);
  const yy = digits.slice(2, 4);
  let out = mm;
  if (yy) out += `/${yy}`;
  return out;
}

export function validateExpiry(value: string): boolean {
  const [mmStr, yyStr] = value.split('/');
  if (!mmStr || !yyStr || mmStr.length !== 2 || yyStr.length !== 2) return false;
  const mm = parseInt(mmStr, 10);
  if (mm < 1 || mm > 12) return false;
  const yy = parseInt(yyStr, 10);
  const now = new Date();
  const currentYear = now.getFullYear() % 100; // two digits
  const currentMonth = now.getMonth() + 1;
  if (yy < currentYear) return false;
  if (yy === currentYear && mm < currentMonth) return false;
  return true;
}

export function formatCVV(value: string): string {
  return onlyDigits(value).slice(0, 4);
}

export function formatUF(value: string): string {
  return (value || '').replace(/[^A-Za-z]/g, '').toUpperCase().slice(0, 2);
}

export function validateEmail(value: string): boolean {
  if (!value) return false;
  // simple email regex; rely mostly on input type
  return /.+@.+\..+/.test(value);
}

