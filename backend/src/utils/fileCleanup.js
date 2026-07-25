/**
 * Best-effort deletion of an uploaded file when its DB record is
 * replaced or removed. Never throws — a missing file must not fail
 * the API call that triggered the cleanup.
 */
const fs = require('fs');
const path = require('path');

const UPLOADS_DIR = path.join(__dirname, '..', '..', 'uploads');

/** @param {string} publicPath - stored path like "/uploads/<uuid>.jpg" */
const deleteFile = (publicPath) => {
  if (!publicPath) return;
  // Resolve strictly inside uploads/ — refuse anything that escapes it.
  const filename = path.basename(publicPath);
  const abs = path.join(UPLOADS_DIR, filename);
  fs.promises.unlink(abs).catch(() => {});
};

module.exports = { deleteFile, UPLOADS_DIR };
