const { z } = require('zod');

const update = {
  body: z
    .object({
      settings: z
        .array(
          z.object({
            key: z.string().trim().regex(/^[a-z0-9_]{2,64}$/, 'Invalid setting key'),
            value: z.string().max(2000),
          })
        )
        .min(1, 'At least one setting required')
        .max(50),
    })
    .strip(),
};

module.exports = { update };
