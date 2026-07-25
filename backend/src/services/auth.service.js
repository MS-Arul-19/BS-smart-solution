/** Authentication business logic — the only module that touches admin passwords. */
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const env = require('../config/env');
const prisma = require('../config/db');
const ApiError = require('../utils/ApiError');
const { BCRYPT_ROUNDS } = require('../config/constants');

const PUBLIC_ADMIN_SELECT = {
  id: true,
  name: true,
  email: true,
  role: true,
  isActive: true,
  lastLoginAt: true,
  createdAt: true,
};

/** Sign both tokens. `type` claim prevents cross-use of token kinds. */
const signTokens = (admin) => ({
  accessToken: jwt.sign({ sub: admin.id, role: admin.role, type: 'access' }, env.JWT_ACCESS_SECRET, {
    expiresIn: env.JWT_ACCESS_EXPIRES,
  }),
  refreshToken: jwt.sign({ sub: admin.id, type: 'refresh' }, env.JWT_REFRESH_SECRET, {
    expiresIn: env.JWT_REFRESH_EXPIRES,
  }),
});

/**
 * Login with a single generic error for every failure mode
 * (unknown email, wrong password, disabled account) — prevents enumeration.
 */
const login = async ({ email, password }) => {
  const invalid = ApiError.unauthorized('Invalid email or password');

  const admin = await prisma.admin.findUnique({ where: { email } });
  if (!admin) {
    // Burn comparable time so response timing doesn't reveal account existence.
    await bcrypt.compare(password, '$2a$12$invalidinvalidinvalidinvaliduBOG3uKMx2vaSyTgm0Cq2uG');
    throw invalid;
  }

  const match = await bcrypt.compare(password, admin.password);
  if (!match || !admin.isActive) throw invalid;

  const updated = await prisma.admin.update({
    where: { id: admin.id },
    data: { lastLoginAt: new Date() },
    select: PUBLIC_ADMIN_SELECT,
  });

  return { admin: updated, ...signTokens(admin) };
};

/** Exchange a valid refresh token for a fresh access token. */
const refresh = async (refreshToken) => {
  let payload;
  try {
    payload = jwt.verify(refreshToken, env.JWT_REFRESH_SECRET);
  } catch {
    throw ApiError.unauthorized('Invalid or expired refresh token');
  }
  if (payload.type !== 'refresh') throw ApiError.unauthorized('Invalid token type');

  const admin = await prisma.admin.findUnique({ where: { id: payload.sub } });
  if (!admin || !admin.isActive) throw ApiError.unauthorized('Account is disabled');

  return { accessToken: signTokens(admin).accessToken };
};

const getProfile = async (adminId) => {
  const admin = await prisma.admin.findUnique({
    where: { id: adminId },
    select: PUBLIC_ADMIN_SELECT,
  });
  if (!admin) throw ApiError.notFound('Admin not found');
  return admin;
};

const changePassword = async (adminId, { currentPassword, newPassword }) => {
  const admin = await prisma.admin.findUnique({ where: { id: adminId } });
  if (!admin) throw ApiError.notFound('Admin not found');

  const match = await bcrypt.compare(currentPassword, admin.password);
  if (!match) throw ApiError.unauthorized('Current password is incorrect');

  const password = await bcrypt.hash(newPassword, BCRYPT_ROUNDS);
  await prisma.admin.update({ where: { id: adminId }, data: { password } });
};

module.exports = { login, refresh, getProfile, changePassword, PUBLIC_ADMIN_SELECT };
