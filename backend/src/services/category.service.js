/** Category business logic. */
const prisma = require('../config/db');
const ApiError = require('../utils/ApiError');
const { uniqueSlug } = require('../utils/slugify');
const { deleteFile } = require('../utils/fileCleanup');

const list = async ({ includeInactive = false } = {}) =>
  prisma.category.findMany({
    where: includeInactive ? {} : { isActive: true },
    orderBy: [{ sortOrder: 'asc' }, { name: 'asc' }],
    include: { _count: { select: { products: true } } },
  });

const getBySlug = async (slug) => {
  const category = await prisma.category.findFirst({ where: { slug, isActive: true } });
  if (!category) throw ApiError.notFound('Category not found');
  return category;
};

const create = async (data, imagePath = null) => {
  const slug = await uniqueSlug(prisma.category, data.name);
  return prisma.category.create({ data: { ...data, slug, ...(imagePath && { image: imagePath }) } });
};

const update = async (id, data, imagePath = null) => {
  const existing = await prisma.category.findUnique({ where: { id } });
  if (!existing) throw ApiError.notFound('Category not found');

  // Re-slug only when the name changes.
  const slug = data.name && data.name !== existing.name
    ? await uniqueSlug(prisma.category, data.name, id)
    : undefined;

  const updated = await prisma.category.update({
    where: { id },
    data: { ...data, ...(slug && { slug }), ...(imagePath && { image: imagePath }) },
  });
  if (imagePath && existing.image) deleteFile(existing.image);
  return updated;
};

const remove = async (id) => {
  const existing = await prisma.category.findUnique({
    where: { id },
    include: { _count: { select: { products: true } } },
  });
  if (!existing) throw ApiError.notFound('Category not found');
  if (existing._count.products > 0) {
    throw ApiError.conflict(
      `Cannot delete: ${existing._count.products} product(s) belong to this category`
    );
  }
  await prisma.category.delete({ where: { id } });
  if (existing.image) deleteFile(existing.image);
};

module.exports = { list, getBySlug, create, update, remove };
