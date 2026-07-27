/** Gallery images attached to a product OR a service (exactly one parent). */
const prisma = require('../config/db');
const ApiError = require('../utils/ApiError');
const { deleteFile } = require('../utils/fileCleanup');

const create = async ({ title, productId, serviceId, sortOrder }, imagePath) => {
  if (!imagePath) throw ApiError.badRequest('Image file is required');
  if (Boolean(productId) === Boolean(serviceId)) {
    throw ApiError.badRequest('Provide exactly one of productId or serviceId');
  }

  if (productId) {
    const product = await prisma.product.findUnique({ where: { id: productId }, select: { id: true } });
    if (!product) throw ApiError.badRequest('Product does not exist');
  } else {
    const service = await prisma.service.findUnique({ where: { id: serviceId }, select: { id: true } });
    if (!service) throw ApiError.badRequest('Service does not exist');
  }

  return prisma.gallery.create({
    data: {
      title: title || null,
      image: imagePath,
      productId: productId || null,
      serviceId: serviceId || null,
      sortOrder: sortOrder || 0,
    },
  });
};

const remove = async (id) => {
  const existing = await prisma.gallery.findUnique({ where: { id } });
  if (!existing) throw ApiError.notFound('Gallery image not found');
  await prisma.gallery.delete({ where: { id } });
  deleteFile(existing.image);
};

module.exports = { create, remove };
