/**
 * DayaCuts WhatsApp & Contact Configuration
 */

// Default WhatsApp Number (with country code, digits only)
// You can update this number or customize it as needed
export const WHATSAPP_CONTACT_NUMBER = '923134499704';
export const WHATSAPP_DISPLAY_NUMBER = '+92 313 4499704';

/**
 * Returns the direct WhatsApp link to chat
 * @param message Optional pre-filled text message
 */
export function getWhatsAppUrl(message?: string): string {
  const defaultText = 'Hi DayaCuts team! I want to inquire about DayaCuts AI Video Studio.';
  const text = encodeURIComponent(message || defaultText);
  const cleanNumber = WHATSAPP_CONTACT_NUMBER.replace(/[^0-9]/g, '');

  if (!cleanNumber) {
    return `https://wa.me/?text=${text}`;
  }
  return `https://wa.me/${cleanNumber}?text=${text}`;
}

/**
 * Directly redirects user to WhatsApp in a new tab/window
 */
export function redirectToWhatsApp(message?: string): void {
  const url = getWhatsAppUrl(message);
  window.open(url, '_blank', 'noopener,noreferrer');
}
