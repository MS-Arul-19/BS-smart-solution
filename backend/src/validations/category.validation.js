const { z } = require('zod');
const { booleanish } = require('./common');

const body = z
  .object({
    name: z.string().trim().min(2).max(100),
    description: z.string().trim().max(2000).optional().nullable(),
    isActive: booleanish.optional(),
    sortOrder: z.coerce.number().int().min(0).optional(),
  })
  .strip();

module.exports = {
  create: { body },
  update: { body: body.partial() },
  list: {
    query: z.object({ includeInactive: booleanish.optional() }).strip(),
  },
};
