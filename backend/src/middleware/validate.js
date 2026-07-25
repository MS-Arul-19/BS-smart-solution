/**
 * Zod validation runner.
 * Usage: validate({ body: schema, query: schema, params: schema })
 * Replaces req[part] with the parsed (stripped/coerced) value so
 * downstream code only ever sees clean data.
 */
const ApiError = require('../utils/ApiError');

const validate = (schemas) => (req, res, next) => {
  for (const part of ['params', 'query', 'body']) {
    const schema = schemas[part];
    if (!schema) continue;

    const result = schema.safeParse(req[part]);
    if (!result.success) {
      const errors = result.error.issues.map((i) => ({
        field: i.path.join('.') || part,
        message: i.message,
      }));
      return next(ApiError.badRequest('Validation failed', errors));
    }
    // Express 5 exposes req.query as a getter; assign defensively.
    try {
      req[part] = result.data;
    } catch {
      Object.defineProperty(req, part, { value: result.data, writable: true });
    }
  }
  next();
};

module.exports = validate;
