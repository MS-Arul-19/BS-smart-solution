const { Router } = require('express');
const controller = require('../controllers/auth.controller');
const validate = require('../middleware/validate');
const { auth } = require('../middleware/auth');
const { loginLimiter } = require('../middleware/rateLimiter');
const schemas = require('../validations/auth.validation');

const router = Router();

router.post('/login', loginLimiter, validate(schemas.login), controller.login);
router.post('/refresh', validate(schemas.refresh), controller.refresh);
router.get('/me', auth, controller.me);
router.post('/change-password', auth, validate(schemas.changePassword), controller.changePassword);
router.post('/logout', auth, controller.logout);

module.exports = router;
