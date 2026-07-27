const { z } = require('zod');

const create = {
  body: z
    .object({
      title: z.string().trim().max(150).optional().nullable(),
      productId: z.coerce.number().int().positive().optional(),
      serviceId: z.coerce.number().int().positive().optional(),
      sortOrder: z.coerce.number().int().min(0).optional(),
    })
    .strip(),
};

module.exports = { create };
