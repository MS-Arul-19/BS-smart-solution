const asyncHandler = require('../utils/asyncHandler');
const { ok, created } = require('../utils/ApiResponse');
const galleryService = require('../services/gallery.service');

const create = asyncHandler(async (req, res) => {
  const imagePath = req.file ? `/uploads/${req.file.filename}` : null;
  created(res, await galleryService.create(req.body, imagePath), 'Image added to gallery');
});

const remove = asyncHandler(async (req, res) => {
  await galleryService.remove(req.params.id);
  ok(res, null, 'Gallery image deleted');
});

module.exports = { create, remove };
