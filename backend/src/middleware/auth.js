/**
 * JWT authentication + role authorization guards.
 * `auth` verifies the access token and attaches a minimal admin to req.admin.
 * `requireRole(...)` restricts a route to specific roles.
 */
const jwt = require('jsonwebtoken');
const env = require('../config/env');
const prisma = require('../config/db');
const ApiError = require('../utils/ApiError');
const asyncHandler = require('../utils/asyncHandler');

const auth = asyncHandler(async (req, res, next) => {
  const header = req.headers.authorization || '';
  if (!header.startsWith('Bearer ')) {
    throw ApiError.unauthorized('Authentication required');
  }

  const token = header.slice(7);
  let payload;
  try {
    payload = jwt.verify(token, env.JWT_ACCESS_SECRET);
  } catch {
    throw ApiError.unauthorized('Invalid or expired token');
  }
  // Refuse refresh tokens presented as access tokens.
  if (payload.type !== 'access') throw ApiError.unauthorized('Invalid token type');

  // Re-check the account on every request so a disabled admin is cut off immediately.
  const admin = await prisma.admin.findUnique({
    where: { id: payload.sub },
    select: { id: true, name: true, email: true, role: true, isActive: true },
  });
  if (!admin || !admin.isActive) throw ApiError.unauthorized('Account is disabled');

  req.admin = admin;
  next();
});

/**
 * Like `auth` but never rejects: attaches req.admin when a valid token is
 * present, otherwise continues anonymously. Used by public endpoints that
 * reveal extra data to admins (e.g. inactive categories).
 */
const optionalAuth = asyncHandler(async (req, res, next) => {
  const header = req.headers.authorization || '';
  if (header.startsWith('Bearer ')) {
    try {
      const payload = jwt.verify(header.slice(7), env.JWT_ACCESS_SECRET);
      if (payload.type === 'access') {
        const admin = await prisma.admin.findUnique({
          where: { id: payload.sub },
          select: { id: true, name: true, email: true, role: true, isActive: true },
        });
        if (admin && admin.isActive) req.admin = admin;
      }
    } catch {
      // Invalid token on a public route → treat as anonymous.
    }
  }
  next();
});

const requireRole = (...roles) => (req, res, next) => {
  if (!req.admin || !roles.includes(req.admin.role)) {
    return next(ApiError.forbidden('You do not have permission for this action'));
  }
  next();
};

module.exports = { auth, optionalAuth, requireRole };
