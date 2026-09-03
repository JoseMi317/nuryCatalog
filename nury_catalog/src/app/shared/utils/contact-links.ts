export const CONTACT_WHATSAPP_NUMBER = '50242317648';

export type ContactProperty = {
  title: string;
  location?: string;
};

export function buildWhatsappUrl(message: string): string {
  return `https://wa.me/${CONTACT_WHATSAPP_NUMBER}?text=${encodeURIComponent(message)}`;
}

export function buildGeneralContactMessage(): string {
  return 'Hola estoy interesado en las propiedades disponibles.';
}

export function buildPropertyContactMessage(property: ContactProperty): string {
  const location = property.location ? ` (${property.location})` : '';

  return `Hola estoy interesado en ${property.title}${location}. ¿Me puedes compartir más información?`;
}
