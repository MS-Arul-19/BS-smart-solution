/**
 * Central environment loader.
 * Validates every required variable at boot with Zod and crashes fast
 * with a readable message if anything is missing or malformed.
 * All other modules import `env` from here — never process.env directly.
 */
require('dotenv').config();
const { z } = require('zod');

const envSchema = z.object({
  NODE_ENV: z.enum(['development', 'production', 'test']).default('development'),
  PORT: z.coerce.number().int().positive().default(5000),

  DATABASE_URL: z.string().url({ message: 'DATABASE_URL must be a valid postgres URL' }),

  JWT_ACCESS_SECRET: z.string().min(32, 'JWT_ACCESS_SECRET must be at least 32 characters'),
  JWT_ACCESS_EXPIRES: z.string().default('15m'),
  JWT_REFRESH_SECRET: z.string().min(32, 'JWT_REFRESH_SECRET must be at least 32 characters'),
  JWT_REFRESH_EXPIRES: z.string().default('7d'),

  CORS_ORIGINS: z.string().default('http://localhost:5173'),

  WHATSAPP_NUMBER: z.string().regex(/^\d{10,15}$/, 'WHATSAPP_NUMBER must be digits incl. country code'),

  SEED_ADMIN_NAME: z.string().default('Super Admin'),
  SEED_ADMIN_EMAIL: z.string().email(),
  SEED_ADMIN_PASSWORD: z.string().min(8, 'SEED_ADMIN_PASSWORD must be at least 8 characters'),

  MAX_FILE_SIZE_MB: z.coerce.number().positive().default(2),
});

const parsed = envSchema.safeParse(process.env);

if (!parsed.success) {
  console.error('❌ Invalid environment configuration:');
  for (const issue of parsed.error.issues) {
    console.error(`   • ${issue.path.join('.')}: ${issue.message}`);
  }
  process.exit(1);
}

const env = {
  ...parsed.data,
  isProd: parsed.data.NODE_ENV === 'production',
  // Same secrets must never be reused across token types.
  corsOrigins: parsed.data.CORS_ORIGINS.split(',').map((o) => o.trim()).filter(Boolean),
};

if (env.JWT_ACCESS_SECRET === env.JWT_REFRESH_SECRET) {
  console.error('❌ JWT_ACCESS_SECRET and JWT_REFRESH_SECRET must be different');
  process.exit(1);
}

module.exports = env;
