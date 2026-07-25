const { Router } = require('express');
const controller = require('../controllers/service.controller');
const validate = require('../middleware/validate');
const { auth } = require('../middleware/auth');
const upload = require('../middleware/upload');
const schemas = require('../validations/service.validation');
const { slugParam, idParam } = require('../validations/common');

const router = Router();

// Specific paths before the :slug wildcard
router.get('/categories/all', controller.listCategories);
router.get('/admin/all', auth, validate(schemas.adminList), controller.listAdmin);
router.get('/admin/:id', auth, validate(idParam), controller.getById);
router.post('/', auth, upload.single('image'), validate(schemas.create), controller.create);
router.put('/:id', auth, upload.single('image'), validate({ ...idParam, ...schemas.update }), controller.update);
router.patch('/:id/status', auth, validate(idParam), controller.toggleStatus);
router.delete('/:id', auth, validate(idParam), controller.remove);

// Public
router.get('/', validate(schemas.publicList), controller.listPublic);
router.get('/:slug', validate(slugParam), controller.getBySlug);

module.exports = router;
