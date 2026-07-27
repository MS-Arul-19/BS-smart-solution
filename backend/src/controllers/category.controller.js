const asyncHandler = require('../utils/asyncHandler');
const { ok, created } = require('../utils/ApiResponse');
const categoryService = require('../services/category.service');

const list = asyncHandler(async (req, res) => {
  // includeInactive is honoured only for authenticated admins.
  const includeInactive = Boolean(req.admin && req.query.includeInactive);
  const categories = await categoryService.list({ includeInactive });
  ok(res, categories);
});

const getBySlug = asyncHandler(async (req, res) => {
  ok(res, await categoryService.getBySlug(req.params.slug));
});

const create = asyncHandler(async (req, res) => {
  const imagePath = req.file ? `/uploads/${req.file.filename}` : null;
  created(res, await categoryService.create(req.body, imagePath), 'Category created');
});

const update = asyncHandler(async (req, res) => {
  const imagePath = req.file ? `/uploads/${req.file.filename}` : null;
  ok(res, await categoryService.update(req.params.id, req.body, imagePath), 'Category updated');
});

const remove = asyncHandler(async (req, res) => {
  await categoryService.remove(req.params.id);
  ok(res, null, 'Category deleted');
});

module.exports = { list, getBySlug, create, update, remove };
