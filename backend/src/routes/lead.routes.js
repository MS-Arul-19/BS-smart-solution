const { Router } = require('express');
const controller = require('../controllers/lead.controller');
const validate = require('../middleware/validate');
const { auth, requireRole } = require('../middleware/auth');
const { enquiryLimiter } = require('../middleware/rateLimiter');
const schemas = require('../validations/lead.validation');
const { idParam } = require('../validations/common');

const router = Router();

// Public enquiry submission (rate-limited + honeypot in schema)
router.post('/', enquiryLimiter, validate(schemas.submit), controller.submit);

// Admin
router.get('/', auth, validate(schemas.adminList), controller.list);
router.get('/:id', auth, validate(idParam), controller.getById);
router.patch('/:id/status', auth, validate({ ...idParam, ...schemas.updateStatus }), controller.updateStatus);
router.delete('/:id', auth, requireRole('SUPER_ADMIN'), validate(idParam), controller.remove);

module.exports = router;
