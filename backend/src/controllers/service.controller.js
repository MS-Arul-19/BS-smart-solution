const asyncHandler = require('../utils/asyncHandler');
const { ok, created, paginated } = require('../utils/ApiResponse');
const serviceService = require('../services/service.service');

const listPublic = asyncHandler(async (req, res) => {
  paginated(res, await serviceService.listPublic(req.query));
});

const listCategories = asyncHandler(async (req, res) => {
  const kind = req.query.kind === 'social' ? 'SOCIAL' : 'SERVICE';
  ok(res, await serviceService.listCategories(kind));
});

const listAdmin = asyncHandler(async (req, res) => {
  paginated(res, await serviceService.listAdmin(req.query));
});

const getBySlug = asyncHandler(async (req, res) => {
  ok(res, await serviceService.getBySlug(req.params.slug));
});

const getById = asyncHandler(async (req, res) => {
  ok(res, await serviceService.getById(req.params.id));
});

const create = asyncHandler(async (req, res) => {
  const imagePath = req.file ? `/uploads/${req.file.filename}` : null;
  created(res, await serviceService.create(req.body, imagePath), 'Service created');
});

const update = asyncHandler(async (req, res) => {
  const imagePath = req.file ? `/uploads/${req.file.filename}` : null;
  ok(res, await serviceService.update(req.params.id, req.body, imagePath), 'Service updated');
});

const toggleStatus = asyncHandler(async (req, res) => {
  ok(res, await serviceService.toggleStatus(req.params.id), 'Status updated');
});

const remove = asyncHandler(async (req, res) => {
  await serviceService.remove(req.params.id);
  ok(res, null, 'Service deleted');
});

module.exports = { listPublic, listAdmin, listCategories, getBySlug, getById, create, update, toggleStatus, remove };
