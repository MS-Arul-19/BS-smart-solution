const { Router } = require('express');
const controller = require('../controllers/category.controller');
const validate = require('../middleware/validate');
const { auth, optionalAuth } = require('../middleware/auth');
const upload = require('../middleware/upload');
const schemas = require('../validations/category.validation');
const { slugParam, idParam } = require('../validations/common');

const router = Router();

// Public (admins with a token additionally see inactive rows)
router.get('/', optionalAuth, validate(schemas.list), controller.list);
router.get('/:slug', validate(slugParam), controller.getBySlug);

// Admin
router.post('/', auth, upload.single('image'), validate(schemas.create), controller.create);
router.put('/:id', auth, upload.single('image'), validate({ ...idParam, ...schemas.update }), controller.update);
router.delete('/:id', auth, validate(idParam), controller.remove);

module.exports = router;
