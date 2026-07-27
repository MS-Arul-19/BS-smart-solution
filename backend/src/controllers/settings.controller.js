const asyncHandler = require('../utils/asyncHandler');
const { ok } = require('../utils/ApiResponse');
const settingsService = require('../services/settings.service');

const getPublic = asyncHandler(async (req, res) => {
  ok(res, await settingsService.getPublic());
});

const getAll = asyncHandler(async (req, res) => {
  ok(res, await settingsService.getAll());
});

const update = asyncHandler(async (req, res) => {
  ok(res, await settingsService.upsertMany(req.body.settings), 'Settings saved');
});

module.exports = { getPublic, getAll, update };
