/**
 * Multer factory — image-only uploads with hard limits.
 * Filenames are regenerated as <uuid>.<ext>; the client's filename
 * never reaches the filesystem (path traversal impossible).
 */
const path = require('path');
const fs = require('fs');
const multer = require('multer');
const { v4: uuidv4 } = require('uuid');
const env = require('../config/env');
const ApiError = require('../utils/ApiError');
const { UPLOAD } = require('../config/constants');
const { UPLOADS_DIR } = require('../utils/fileCleanup');

// Ensure the uploads dir exists at boot.
fs.mkdirSync(UPLOADS_DIR, { recursive: true });

const storage = multer.diskStorage({
  destination: (req, file, cb) => cb(null, UPLOADS_DIR),
  filename: (req, file, cb) => {
    const ext = path.extname(file.originalname).toLowerCase();
    cb(null, `${uuidv4()}${ext}`);
  },
});

const fileFilter = (req, file, cb) => {
  const ext = path.extname(file.originalname).toLowerCase();
  // Both MIME and extension must be on the whitelist.
  if (UPLOAD.ALLOWED_MIME.includes(file.mimetype) && UPLOAD.ALLOWED_EXT.includes(ext)) {
    return cb(null, true);
  }
  cb(new ApiError(422, 'Only JPG, PNG and WEBP images are allowed'));
};

const upload = multer({
  storage,
  fileFilter,
  limits: {
    fileSize: env.MAX_FILE_SIZE_MB * 1024 * 1024,
    files: UPLOAD.MAX_FILES,
  },
});

module.exports = upload;
