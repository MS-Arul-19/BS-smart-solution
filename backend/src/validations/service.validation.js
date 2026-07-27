const { z } = require('zod');
const { listQuery, booleanish } = require('./common');

const body = z
  .object({
    name: z.string().trim().min(2).max(150),
    description: z.string().trim().min(10).max(10000),
    shortDescription: z.string().trim().max(300).optional().nullable(),
    priceType: z.enum(['FIXED', 'STARTING_FROM', 'ON_INSPECTION']).default('ON_INSPECTION'),
    priceValue: z.string().trim().max(50).optional().nullable(),
    coverageArea: z.string().trim().max(200).optional().nullable(),
    categoryId: z.coerce.number().int().positive().optional().nullable(),
    isActive: booleanish.optional(),
    isFeatured: booleanish.optional(),
    sortOrder: z.coerce.number().int().min(0).optional(),
  })
  .strip();

module.exports = {
  create: { body },
  update: { body: body.partial() },
  publicList: {
    query: listQuery.extend({
      featured: booleanish.optional(),
      category: z.string().regex(/^[a-z0-9-]+$/).optional(),
      kind: z.enum(['service', 'social']).optional(),
    }),
  },
  adminList: {
    query: listQuery.extend({
      featured: booleanish.optional(),
      isActive: booleanish.optional(),
      category: z.string().regex(/^[a-z0-9-]+$/).optional(),
    }),
  },
};
