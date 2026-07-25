/**
 * Central error handler — the ONLY place errors become HTTP responses.
 * Maps known error families to proper status codes; hides internals in production.
 */
const env = require('../config/env');
const ApiError = require('../utils/ApiError');

// eslint-disable-next-line no-unused-vars
const errorHandler = (err, req, res, next) => {
  let statusCode = 500;
  let message = 'Something went wrong';
  let errors;

  if (err instanceof ApiError) {
    statusCode = err.statusCode;
    message = err.message;
    errors = err.errors;
  } else if (err.name === 'ZodError') {
    // Should normally be caught by validate middleware, kept as a safety net.
    statusCode = 400;
    message = 'Validation failed';
    errors = err.issues?.map((i) => ({ field: i.path.join('.'), message: i.message }));
  } else if (err.code === 'P2002') {
    // Prisma: unique constraint violation
    statusCode = 409;
    message = `Duplicate value for: ${err.meta?.target?.join(', ') || 'unique field'}`;
  } else if (err.code === 'P2025') {
    // Prisma: record not found on update/delete
    statusCode = 404;
    message = 'Resource not found';
  } else if (err.code === 'P2003') {
    // Prisma: foreign key constraint failed
    statusCode = 409;
    message = 'Operation blocked: record is referenced by other data';
  } else if (err.name === 'JsonWebTokenError' || err.name === 'TokenExpiredError') {
    statusCode = 401;
    message = 'Invalid or expired token';
  } else if (err.type === 'entity.too.large') {
    statusCode = 413;
    message = 'Request payload too large';
  } else if (err.type === 'entity.parse.failed') {
    statusCode = 400;
    message = 'Malformed JSON body';
  } else if (err.name === 'MulterError') {
    statusCode = err.code === 'LIMIT_FILE_SIZE' ? 413 : 400;
    message = err.code === 'LIMIT_FILE_SIZE' ? 'File too large' : `Upload error: ${err.message}`;
  } else if (!env.isProd) {
    // In development surface the real message to speed up debugging.
    message = err.message;
  }

  // Log unexpected errors with stack; operational errors get a single line.
  if (statusCode >= 500) {
    console.error('💥 Unexpected error:', err);
  } else if (!env.isProd) {
    console.warn(`⚠️  ${statusCode} ${message}`);
  }

  res.status(statusCode).json({ success: false, message, ...(errors && { errors }) });
};

module.exports = errorHandler;
