const { z } = require('zod');

const login = {
  body: z
    .object({
      email: z.string().trim().toLowerCase().email('Valid email required'),
      password: z.string().min(1, 'Password required').max(128),
    })
    .strip(),
};

const refresh = {
  body: z.object({ refreshToken: z.string().min(20, 'Refresh token required') }).strip(),
};

const changePassword = {
  body: z
    .object({
      currentPassword: z.string().min(1, 'Current password required'),
      newPassword: z
        .string()
        .min(8, 'New password must be at least 8 characters')
        .max(128)
        .regex(/[a-zA-Z]/, 'Must contain a letter')
        .regex(/\d/, 'Must contain a number'),
    })
    .strip(),
};

module.exports = { login, refresh, changePassword };
