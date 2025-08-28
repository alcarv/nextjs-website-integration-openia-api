export const WHATSAPP_NUMBER = '556496762041';
export const DEFAULT_WHATSAPP_MESSAGE = 'Olá! Gostaria de saber mais sobre os serviços da Dra. Ruth';

export function getWhatsAppUrl(message: string = DEFAULT_WHATSAPP_MESSAGE): string {
  const text = encodeURIComponent(message);
  return `https://wa.me/${WHATSAPP_NUMBER}?text=${text}`;
}
