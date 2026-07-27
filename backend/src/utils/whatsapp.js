/**
 * Builds the wa.me deep-link for a stored lead.
 * The message is composed server-side so its format stays consistent
 * regardless of frontend version.
 */

/**
 * @param {string} number - WhatsApp number with country code, digits only
 * @param {object} lead   - persisted lead row
 * @param {string|null} itemName - product/service name if applicable
 */
const buildWhatsappUrl = (number, lead, itemName = null) => {
  const lines = ['Hello BS Smart Solution 👋', ''];

  if (lead.enquiryType === 'PRODUCT') lines.push(`Product Enquiry: ${itemName ?? 'General product'}`);
  else if (lead.enquiryType === 'SERVICE') lines.push(`Service Enquiry: ${itemName ?? 'General service'}`);
  else lines.push('General Enquiry');

  lines.push(`Name: ${lead.name}`);
  lines.push(`Phone: ${lead.phone}`);
  if (lead.quantity) lines.push(`Quantity: ${lead.quantity}`);
  if (lead.message) lines.push(`Message: ${lead.message}`);
  lines.push('', `Ref: ENQ-${lead.id}`);

  return `https://wa.me/${number}?text=${encodeURIComponent(lines.join('\n'))}`;
};

module.exports = { buildWhatsappUrl };
