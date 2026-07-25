/** Reusable Zod fragments shared by all domain validations. */
const { z } = require('zod');
const { PAGINATION } = require('../config/constants');

const idParam = {
  params: z.object({ id: z.coerce.number().int().positive('Invalid id') }),
};

const slugParam = {
  params: z.object({
    slug: z.string().regex(/^[a-z0-9-]{1,120}$/, 'Invalid slug'),
  }),
};

/** Base list query: pagination + search + sort. Extend per domain. */
const listQuery = z
  .object({
    page: z.coerce.number().int().positive().default(PAGINATION.DEFAULT_PAGE),
    limit: z.coerce.number().int().positive().max(PAGINATION.MAX_LIMIT).default(PAGINATION.DEFAULT_LIMIT),
    search: z.string().trim().max(100).optional(),
    sortBy: z.enum(['createdAt', 'name', 'sortOrder']).default('sortOrder'),
    sortOrder: z.enum(['asc', 'desc']).default('asc'),
  })
  .strip();

const booleanish = z
  .union([z.boolean(), z.enum(['true', 'false'])])
  .transform((v) => v === true || v === 'true');

module.exports = { idParam, slugParam, listQuery, booleanish };
