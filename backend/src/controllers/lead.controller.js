const asyncHandler = require('../utils/asyncHandler');
const { ok, created, paginated } = require('../utils/ApiResponse');
const leadService = require('../services/lead.service');

const submit = asyncHandler(async (req, res) => {
  const result = await leadService.submit(req.body, req.ip);
  // Bots get an identical-looking success so they can't detect the honeypot.
  if (result.bot) return created(res, { whatsappUrl: null }, 'Enquiry received');
  created(
    res,
    { lead: { id: result.lead.id, name: result.lead.name }, whatsappUrl: result.whatsappUrl },
    'Enquiry received'
  );
});

const list = asyncHandler(async (req, res) => {
  paginated(res, await leadService.list(req.query));
});

const getById = asyncHandler(async (req, res) => {
  ok(res, await leadService.getById(req.params.id));
});

const updateStatus = asyncHandler(async (req, res) => {
  ok(res, await leadService.updateStatus(req.params.id, req.body), 'Lead status updated');
});

const remove = asyncHandler(async (req, res) => {
  await leadService.remove(req.params.id);
  ok(res, null, 'Lead deleted');
});

module.exports = { submit, list, getById, updateStatus, remove };
