/** URL-safe slug generation with uniqueness helper. */

const slugify = (text) =>
  text
    .toString()
    .toLowerCase()
    .trim()
    .replace(/[^a-z0-9\s-]/g, '')
    .replace(/[\s_]+/g, '-')
    .replace(/-+/g, '-')
    .replace(/^-|-$/g, '');

/**
 * Returns a slug guaranteed unique for the given Prisma model delegate.
 * Appends -2, -3, ... on collision. `excludeId` skips the row being updated.
 */
const uniqueSlug = async (model, text, excludeId = null) => {
  const base = slugify(text) || 'item';
  let slug = base;
  let n = 1;
  // Loop terminates: each iteration tests a new suffix.
  // eslint-disable-next-line no-constant-condition
  while (true) {
    const existing = await model.findUnique({ where: { slug }, select: { id: true } });
    if (!existing || existing.id === excludeId) return slug;
    n += 1;
    slug = `${base}-${n}`;
  }
};

module.exports = { slugify, uniqueSlug };
