const asyncHandler = require('../utils/asyncHandler');
const { ok } = require('../utils/ApiResponse');
const authService = require('../services/auth.service');

const login = asyncHandler(async (req, res) => {
  const result = await authService.login(req.body);
  ok(res, result, 'Login successful');
});

const refresh = asyncHandler(async (req, res) => {
  const result = await authService.refresh(req.body.refreshToken);
  ok(res, result, 'Token refreshed');
});

const me = asyncHandler(async (req, res) => {
  const admin = await authService.getProfile(req.admin.id);
  ok(res, admin);
});

const changePassword = asyncHandler(async (req, res) => {
  await authService.changePassword(req.admin.id, req.body);
  ok(res, null, 'Password changed successfully');
});

// Stateless JWT — logout is a client-side token discard; endpoint exists
// so clients have a uniform call and future token-blacklisting has a home.
const logout = asyncHandler(async (req, res) => {
  ok(res, null, 'Logged out');
});

module.exports = { login, refresh, me, changePassword, logout };
