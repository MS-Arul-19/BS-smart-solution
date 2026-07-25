/** Parses page/limit from validated query into Prisma skip/take. */
const { PAGINATION } = require('../config/constants');

const getPagination = (query = {}) => {
  const page = Math.max(1, Number(query.page) || PAGINATION.DEFAULT_PAGE);
  const limit = Math.min(PAGINATION.MAX_LIMIT, Math.max(1, Number(query.limit) || PAGINATION.DEFAULT_LIMIT));
  return { page, limit, skip: (page - 1) * limit, take: limit };
};

module.exports = { getPagination };
