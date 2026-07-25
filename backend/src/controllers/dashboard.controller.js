const asyncHandler = require('../utils/asyncHandler');
const { ok } = require('../utils/ApiResponse');
const dashboardService = require('../services/dashboard.service');

const stats = asyncHandler(async (req, res) => {
  ok(res, await dashboardService.getStats());
});

const recentLeads = asyncHandler(async (req, res) => {
  ok(res, await dashboardService.getRecentLeads());
});

const leadTrends = asyncHandler(async (req, res) => {
  ok(res, await dashboardService.getLeadTrends());
});

module.exports = { stats, recentLeads, leadTrends };
