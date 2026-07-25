/** Service (local services offering) business logic. */
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
  priceType: true,
  priceValue: true,
  coverageArea: true,
  image: true,
  isFeatured: true,
  category: { select: { id: true, name: true, slug: true, kind: true } },
};

const buildWhere = ({ search, featured, isActive, category, kind }, isAdmin = false) => {
  const where = {};
  if (!isAdmin) where.isActive = true;
  else if (isActive !== undefined) where.isActive = isActive;
  if (featured !== undefined) where.isFeatured = featured;

  // Category scoping: explicit slug wins; otherwise split by kind so business
  // services and social initiatives never mix on public pages.
  if (category) where.category = { slug: category };
  else if (kind === 'social') where.category = { kind: 'SOCIAL' };
  else if (!isAdmin) {
    where.AND = [{ OR: [{ categoryId: null }, { category: { kind: 'SERVICE' } }] }];
  }
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
    prisma.service.findMany({ where, orderBy, skip, take, select: CARD_SELECT }),
    prisma.service.count({ where }),
  ]);
  return { items, page, limit, total };
};

const listAdmin = async (query) => {
  const { page, limit, skip, take } = getPagination(query);
  const where = buildWhere(query, true);
  const orderBy = [{ [query.sortBy]: query.sortOrder }, { id: 'asc' }];

  const [items, total] = await prisma.$transaction([
    prisma.service.findMany({
      where,
      orderBy,
      skip,
      take,
      include: { category: { select: { id: true, name: true, slug: true } } },
    }),
    prisma.service.count({ where }),
  ]);
  return { items, page, limit, total };
};

/** Public list of service categories (by kind) with active-service counts. */
const listCategories = async (kind = 'SERVICE') => {
  const categories = await prisma.serviceCategory.findMany({
    where: { isActive: true, kind },
    orderBy: [{ sortOrder: 'asc' }, { name: 'asc' }],
    include: { _count: { select: { services: { where: { isActive: true } } } } },
  });
  return categories.map(({ _count, ...c }) => ({ ...c, serviceCount: _count.services }));
};

const getBySlug = async (slug) => {
  const service = await prisma.service.findFirst({
    where: { slug, isActive: true },
    include: {
      category: { select: { id: true, name: true, slug: true, kind: true } },
      gallery: { orderBy: { sortOrder: 'asc' }, select: { id: true, title: true, image: true } },
    },
  });
  if (!service) throw ApiError.notFound('Service not found');
  return service;
};

const getById = async (id) => {
  const service = await prisma.service.findUnique({
    where: { id },
    include: { gallery: { orderBy: { sortOrder: 'asc' } } },
  });
  if (!service) throw ApiError.notFound('Service not found');
  return service;
};

const assertCategoryExists = async (categoryId) => {
  const category = await prisma.serviceCategory.findUnique({ where: { id: categoryId } });
  if (!category) throw ApiError.badRequest('Service category does not exist');
};

const create = async (data, imagePath = null) => {
  if (data.categoryId) await assertCategoryExists(data.categoryId);
  const slug = await uniqueSlug(prisma.service, data.name);
  return prisma.service.create({ data: { ...data, slug, ...(imagePath && { image: imagePath }) } });
};

const update = async (id, data, imagePath = null) => {
  const existing = await prisma.service.findUnique({ where: { id } });
  if (!existing) throw ApiError.notFound('Service not found');
  if (data.categoryId) await assertCategoryExists(data.categoryId);

  const slug = data.name && data.name !== existing.name
    ? await uniqueSlug(prisma.service, data.name, id)
    : undefined;

  const updated = await prisma.service.update({
    where: { id },
    data: { ...data, ...(slug && { slug }), ...(imagePath && { image: imagePath }) },
  });
  if (imagePath && existing.image) deleteFile(existing.image);
  return updated;
};

const toggleStatus = async (id) => {
  const existing = await prisma.service.findUnique({ where: { id }, select: { isActive: true } });
  if (!existing) throw ApiError.notFound('Service not found');
  return prisma.service.update({
    where: { id },
    data: { isActive: !existing.isActive },
    select: { id: true, isActive: true },
  });
};

const remove = async (id) => {
  const existing = await prisma.service.findUnique({
    where: { id },
    include: { gallery: { select: { image: true } } },
  });
  if (!existing) throw ApiError.notFound('Service not found');
  await prisma.service.delete({ where: { id } });
  if (existing.image) deleteFile(existing.image);
  existing.gallery.forEach((g) => deleteFile(g.image));
};

module.exports = { listPublic, listAdmin, listCategories, getBySlug, getById, create, update, toggleStatus, remove };
