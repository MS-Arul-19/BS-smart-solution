/** Uniform success envelope helpers — every controller responds through these. */

const ok = (res, data = null, message = 'OK', statusCode = 200) =>
  res.status(statusCode).json({ success: true, message, data });

const created = (res, data = null, message = 'Created') => ok(res, data, message, 201);

/**
 * Paginated list envelope.
 * @param {object} p - { items, page, limit, total }
 */
const paginated = (res, { items, page, limit, total }, message = 'OK') =>
  res.status(200).json({
    success: true,
    message,
    data: items,
    meta: {
      page,
      limit,
      total,
      totalPages: Math.max(1, Math.ceil(total / limit)),
    },
  });

module.exports = { ok, created, paginated };
