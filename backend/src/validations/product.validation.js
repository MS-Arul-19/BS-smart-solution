const { z } = require('zod');
const { listQuery, booleanish } = require('./common');

const body = z
  .object({
    name: z.string().trim().min(2).max(150),
    description: z.string().trim().min(10).max(10000),
    shortDescription: z.string().trim().max(300).optional().nullable(),
    // Accepts an object directly (JSON body) or a JSON string (multipart form).
    specifications: z
      .union([z.record(z.any()), z.string().transform((s, ctx) => {
        try {
          return JSON.parse(s);
        } catch {
          ctx.addIssue({ code: z.ZodIssueCode.custom, message: 'specifications must be valid JSON' });
          return z.NEVER;
        }
      })])
      .optional()
      .nullable(),
    minOrderQty: z.string().trim().max(100).optional().nullable(),
    priceRange: z.string().trim().max(100).optional().nullable(),
    unit: z.string().trim().max(50).optional().nullable(),
    categoryId: z.coerce.number().int().positive(),
    isActive: booleanish.optional(),
    isFeatured: booleanish.optional(),
    sortOrder: z.coerce.number().int().min(0).optional(),
  })
  .strip();

const publicList = {
  query: listQuery.extend({
    category: z.string().regex(/^[a-z0-9-]+$/).optional(),
    featured: booleanish.optional(),
  }),
};

const adminList = {
  query: publicList.query.extend({
    isActive: booleanish.optional(),
  }),
};

module.exports = {
  create: { body },
  update: { body: body.partial() },
  publicList,
  adminList,
};
