const { Router } = require('express');
const controller = require('../controllers/gallery.controller');
const validate = require('../middleware/validate');
const { auth } = require('../middleware/auth');
const upload = require('../middleware/upload');
const schemas = require('../validations/gallery.validation');
const { idParam } = require('../validations/common');

const router = Router();

router.post('/', auth, upload.single('image'), validate(schemas.create), controller.create);
router.delete('/:id', auth, validate(idParam), controller.remove);

module.exports = router;
