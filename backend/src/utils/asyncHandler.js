/**
 * Wraps an async controller so any rejection reaches the central errorHandler.
 * Eliminates repetitive try/catch in every controller.
 */
const asyncHandler = (fn) => (req, res, next) => {
  Promise.resolve(fn(req, res, next)).catch(next);
};

module.exports = asyncHandler;
