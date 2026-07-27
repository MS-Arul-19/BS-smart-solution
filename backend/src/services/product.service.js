/** Product business logic: public catalogue + admin CRUD. */
const prisma = require('../config/db');
const ApiError = require('../utils/ApiError');
const { uniqueSlug } = require('../utils/slugify');
const { getPagination } = require('../utils/pagination');
const { deleteFile } = require('../utils/fileCleanup');

const CARD_SELECT = {
  id: true,
  name: true,
  slug: true,
  shortDescription: true,
  minOrderQty: true,
  priceRange: true,
  unit: true,
  image: true,
  isFeatured: true,
  category: { select: { id: true, name: true, slug: true } },
};

/** Shared query builder for both public and admin lists. */
const buildWhere = ({ search, category, featured, isActive }, isAdmin = false) => {
  const where = {};
  if (!isAdmin) where.isActive = true;
  else if (isActive !== undefined) where.isActive = isActive;

  if (featured !== undefined) where.isFeatured = featured;
  if (category) where.category = { slug: category };
  if (search) {
    where.OR = [
      { name: { contains: search, mode: 'insensitive' } },
      { description: { contains: search, mode: 'insensitive' } },
      { shortDescription: { contains: search, mode: 'insensitive' } },
    ];
  }
  return where;
};

const listPublic = async (query) => {
  const { page, limit, skip, take } = getPagination(query);
  const where = buildWhere(query);
  const orderBy = [{ [query.sortBy]: query.sortOrder }, { id: 'asc' }];

  const [items, total] = await prisma.$transaction([
    prisma.product.findMany({ where, orderBy, skip, take, select: CARD_SELECT }),
    prisma.product.count({ where }),
  ]);
  return { items, page, limit, total };
};

const listAdmin = async (query) => {
  const { page, limit, skip, take } = getPagination(query);
  const where = buildWhere(query, true);
  const orderBy = [{ [query.sortBy]: query.sortOrder }, { id: 'asc' }];

  const [items, total] = await prisma.$transaction([
    prisma.product.findMany({
      where,
      orderBy,
      skip,
      take,
      include: { category: { select: { id: true, name: true, slug: true } } },
    }),
    prisma.product.count({ where }),
  ]);
  return { items, page, limit, total };
};

const getBySlug = async (slug) => {
  const product = await prisma.product.findFirst({
    where: { slug, isActive: true },
    include: {
      category: { select: { id: true, name: true, slug: true } },
      gallery: { orderBy: { sortOrder: 'asc' }, select: { id: true, title: true, image: true } },
    },
  });
  if (!product) throw ApiError.notFound('Product not found');
  return product;
};

const getById = async (id) => {
  const product = await prisma.product.findUnique({
    where: { id },
    include: { category: true, gallery: { orderBy: { sortOrder: 'asc' } } },
  });
  if (!product) throw ApiError.notFound('Product not found');
  return product;
};

const assertCategoryExists = async (categoryId) => {
  const category = await prisma.category.findUnique({ where: { id: categoryId } });
  if (!category) throw ApiError.badRequest('Category does not exist');
};

const create = async (data, imagePath = null) => {
  await assertCategoryExists(data.categoryId);
  const slug = await uniqueSlug(prisma.product, data.name);
  return prisma.product.create({
    data: { ...data, slug, ...(imagePath && { image: imagePath }) },
    include: { category: { select: { id: true, name: true, slug: true } } },
  });
};

const update = async (id, data, imagePath = null) => {
  const existing = await prisma.product.findUnique({ where: { id } });
  if (!existing) throw ApiError.notFound('Product not found');
  if (data.categoryId) await assertCategoryExists(data.categoryId);

  const slug = data.name && data.name !== existing.name
    ? await uniqueSlug(prisma.product, data.name, id)
    : undefined;

  const updated = await prisma.product.update({
    where: { id },
    data: { ...data, ...(slug && { slug }), ...(imagePath && { image: imagePath }) },
    include: { category: { select: { id: true, name: true, slug: true } } },
  });
  if (imagePath && existing.image) deleteFile(existing.image);
  return updated;
};

const toggleStatus = async (id) => {
  const existing = await prisma.product.findUnique({ where: { id }, select: { isActive: true } });
  if (!existing) throw ApiError.notFound('Product not found');
  return prisma.product.update({
    where: { id },
    data: { isActive: !existing.isActive },
    select: { id: true, isActive: true },
  });
};

const remove = async (id) => {
  const existing = await prisma.product.findUnique({
    where: { id },
    include: { gallery: { select: { image: true } } },
  });
  if (!existing) throw ApiError.notFound('Product not found');
  await prisma.product.delete({ where: { id } });
  // Gallery rows cascade in DB; clean their files from disk too.
  if (existing.image) deleteFile(existing.image);
  existing.gallery.forEach((g) => deleteFile(g.image));
};

module.exports = { listPublic, listAdmin, getBySlug, getById, create, update, toggleStatus, remove };
