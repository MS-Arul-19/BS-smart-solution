const { Router } = require('express');
const controller = require('../controllers/upload.controller');
const upload = require('../middleware/upload');

const router = Router();

// Endpoint supports single file upload under form fields 'image' or 'file'
router.post('/', upload.single('image'), controller.uploadSingle);
router.post('/file', upload.single('file'), controller.uploadSingle);

module.exports = router;
