/**
 * Lead (enquiry) business logic.
 * Public submit ALWAYS stores the lead before the WhatsApp URL is returned —
 * the database record is the source of truth, WhatsApp is only the handoff.
 */
const prisma = require('../config/db');
const ApiError = require('../utils/ApiError');
const { getPagination } = require('../utils/pagination');
const { buildWhatsappUrl } = require('../utils/whatsapp');

const RELATION_INCLUDE = {
  product: { select: { id: true, name: true, slug: true } },
  service: { select: { id: true, name: true, slug: true } },
};

/** Resolve the enquired item and enforce type/reference consistency. */
const resolveItem = async ({ enquiryType, productId, serviceId }) => {
  if (enquiryType === 'PRODUCT') {
    if (!productId) throw ApiError.badRequest('productId is required for a product enquiry');
    const product = await prisma.product.findFirst({
      where: { id: productId, isActive: true },
      select: { id: true, name: true },
    });
    if (!product) throw ApiError.badRequest('Selected product is not available');
    return { itemName: product.name, productId: product.id, serviceId: null };
  }
  if (enquiryType === 'SERVICE') {
    if (!serviceId) throw ApiError.badRequest('serviceId is required for a service enquiry');
    const service = await prisma.service.findFirst({
      where: { id: serviceId, isActive: true },
      select: { id: true, name: true },
    });
    if (!service) throw ApiError.badRequest('Selected service is not available');
    return { itemName: service.name, productId: null, serviceId: service.id };
  }
  return { itemName: null, productId: null, serviceId: null };
};

/**
 * @param {object} data - validated enquiry body (may contain honeypot `website`)
 * @param {string} ipAddress
 * @returns {{lead: object|null, whatsappUrl: string|null, bot: boolean}}
 */
const submit = async (data, ipAddress) => {
  // Honeypot filled → almost certainly a bot. Pretend success, store nothing.
  if (data.website) return { lead: null, whatsappUrl: null, bot: true };

  const { itemName, productId, serviceId } = await resolveItem(data);

  const lead = await prisma.lead.create({
    data: {
      name: data.name,
      phone: data.phone,
      email: data.email,
      message: data.message,
      enquiryType: data.enquiryType,
      productId,
      serviceId,
      quantity: data.quantity,
      ipAddress,
    },
  });

  const setting = await prisma.settings.findUnique({ where: { key: 'whatsapp_number' } });
  if (!setting) throw new Error('whatsapp_number setting is missing — run the seed');

  return { lead, whatsappUrl: buildWhatsappUrl(setting.value, lead, itemName), bot: false };
};

const list = async (query) => {
  const { page, limit, skip, take } = getPagination(query);
  const where = {};

  if (query.status) where.status = query.status;
  if (query.enquiryType) where.enquiryType = query.enquiryType;
  if (query.search) {
    where.OR = [
      { name: { contains: query.search, mode: 'insensitive' } },
      { phone: { contains: query.search } },
    ];
  }
  if (query.dateFrom || query.dateTo) {
    where.createdAt = {};
    if (query.dateFrom) where.createdAt.gte = query.dateFrom;
    if (query.dateTo) {
      // Include the whole end day.
      const end = new Date(query.dateTo);
      end.setHours(23, 59, 59, 999);
      where.createdAt.lte = end;
    }
  }

  const [items, total] = await prisma.$transaction([
    prisma.lead.findMany({
      where,
      orderBy: { createdAt: 'desc' },
      skip,
      take,
      include: RELATION_INCLUDE,
    }),
    prisma.lead.count({ where }),
  ]);
  return { items, page, limit, total };
};

const getById = async (id) => {
  const lead = await prisma.lead.findUnique({ where: { id }, include: RELATION_INCLUDE });
  if (!lead) throw ApiError.notFound('Lead not found');
  return lead;
};

const updateStatus = async (id, { status, adminNote }) => {
  await getById(id);
  return prisma.lead.update({
    where: { id },
    data: { status, ...(adminNote !== undefined && { adminNote }) },
    include: RELATION_INCLUDE,
  });
};

const remove = async (id) => {
  await getById(id);
  await prisma.lead.delete({ where: { id } });
};

module.exports = { submit, list, getById, updateStatus, remove };
