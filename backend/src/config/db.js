/**
 * Singleton PrismaClient. Import this everywhere — never instantiate
 * PrismaClient elsewhere (prevents connection-pool exhaustion under
 * nodemon hot-reload).
 */
const { PrismaClient } = require('@prisma/client');
const env = require('./env');

const prisma =
  globalThis.__prisma ||
  new PrismaClient({
    log: env.isProd ? ['error'] : ['warn', 'error'],
  });

if (!env.isProd) globalThis.__prisma = prisma;

module.exports = prisma;
