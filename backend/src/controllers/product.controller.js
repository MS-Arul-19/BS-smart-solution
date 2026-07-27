const asyncHandler = require('../utils/asyncHandler');
const { ok, created, paginated } = require('../utils/ApiResponse');
const productService = require('../services/product.service');

const listPublic = asyncHandler(async (req, res) => {
  paginated(res, await productService.listPublic(req.query));
});

const listAdmin = asyncHandler(async (req, res) => {
  paginated(res, await productService.listAdmin(req.query));
});

const getBySlug = asyncHandler(async (req, res) => {
  ok(res, await productService.getBySlug(req.params.slug));
});

const getById = asyncHandler(async (req, res) => {
  ok(res, await productService.getById(req.params.id));
});

const create = asyncHandler(async (req, res) => {
  const imagePath = req.file ? `/uploads/${req.file.filename}` : null;
  created(res, await productService.create(req.body, imagePath), 'Product created');
});

const update = asyncHandler(async (req, res) => {
  const imagePath = req.file ? `/uploads/${req.file.filename}` : null;
  ok(res, await productService.update(req.params.id, req.body, imagePath), 'Product updated');
});

const toggleStatus = asyncHandler(async (req, res) => {
  ok(res, await productService.toggleStatus(req.params.id), 'Status updated');
});

const remove = asyncHandler(async (req, res) => {
  await productService.remove(req.params.id);
  ok(res, null, 'Product deleted');
});

module.exports = { listPublic, listAdmin, getBySlug, getById, create, update, toggleStatus, remove };
