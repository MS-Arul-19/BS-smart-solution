import { LeadPayload, PublicSettings } from '../types';

export function generateWhatsAppMessage(payload: LeadPayload, itemTitle?: string): string {
  const greeting = `Hello BS 1 Solutions team,`;
  let details = `\nI would like to make an enquiry:`;
  
  if (payload.enquiryType === 'PRODUCT') {
    details += `\n• Type: Product Enquiry`;
    if (itemTitle) details += `\n• Product: ${itemTitle}`;
    if (payload.quantity) details += `\n• Required Quantity: ${payload.quantity}`;
  } else if (payload.enquiryType === 'SERVICE') {
    details += `\n• Type: Service / Initiative Enquiry`;
    if (itemTitle) details += `\n• Service: ${itemTitle}`;
  } else {
    details += `\n• Type: General Business Enquiry`;
  }

  details += `\n\nContact Details:`;
  details += `\n• Name: ${payload.name}`;
  details += `\n• Phone: ${payload.phone}`;
  if (payload.email) details += `\n• Email: ${payload.email}`;
  if (payload.message) details += `\n• Message: ${payload.message}`;

  return encodeURIComponent(`${greeting}${details}\n\nSent from website enquiry form.`);
}

export function buildWhatsAppRedirectUrl(phone: string, text: string): string {
  const cleanPhone = phone.replace(/[^0-9]/g, '');
  return `https://wa.me/${cleanPhone}?text=${text}`;
}
