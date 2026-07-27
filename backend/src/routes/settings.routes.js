const { Router } = require('express');
const controller = require('../controllers/settings.controller');
const validate = require('../middleware/validate');
const { auth } = require('../middleware/auth');
const schemas = require('../validations/settings.validation');

const router = Router();

router.get('/public', controller.getPublic);
router.get('/', auth, controller.getAll);
router.put('/', auth, validate(schemas.update), controller.update);

module.exports = router;
