const { z } = require('zod');
const { listQuery } = require('./common');

// Indian mobile (10 digits starting 6-9) or international E.164.
const phoneSchema = z
  .string()
  .trim()
  .regex(/^(?:[6-9]\d{9}|\+?[1-9]\d{7,14})$/, 'Enter a valid phone number');

const submit = {
  body: z
    .object({
      name: z.string().trim().min(2, 'Name too short').max(100),
      phone: phoneSchema,
      email: z.string().trim().toLowerCase().email().optional().or(z.literal('')).transform((v) => v || null),
      message: z.string().trim().max(2000).optional().nullable(),
      enquiryType: z.enum(['PRODUCT', 'SERVICE', 'GENERAL']),
      productId: z.coerce.number().int().positive().optional().nullable(),
      serviceId: z.coerce.number().int().positive().optional().nullable(),
      quantity: z.string().trim().max(100).optional().nullable(),
      // Honeypot — real users never see or fill this field.
      website: z.string().max(200).optional(),
    })
    .strip(),
};

const adminList = {
  query: listQuery
    .omit({ sortBy: true, sortOrder: true })
    .extend({
      status: z.enum(['NEW', 'CONTACTED', 'IN_PROGRESS', 'CONVERTED', 'CLOSED']).optional(),
      enquiryType: z.enum(['PRODUCT', 'SERVICE', 'GENERAL']).optional(),
      dateFrom: z.coerce.date().optional(),
      dateTo: z.coerce.date().optional(),
    }),
};

const updateStatus = {
  body: z
    .object({
      status: z.enum(['NEW', 'CONTACTED', 'IN_PROGRESS', 'CONVERTED', 'CLOSED']),
      adminNote: z.string().trim().max(2000).optional().nullable(),
    })
    .strip(),
};

module.exports = { submit, adminList, updateStatus };
