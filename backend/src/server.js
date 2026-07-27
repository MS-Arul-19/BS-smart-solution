/**
 * Boot entry point: starts HTTP server, wires graceful shutdown and
 * process-level crash guards. Keep this file free of app logic.
 */
const env = require('./config/env');
const app = require('./app');
const prisma = require('./config/db');

const server = app.listen(env.PORT, () => {
  console.log(`🚀 BS Smart Solution API [${env.NODE_ENV}] listening on http://localhost:${env.PORT}`);
});

/** Close HTTP server first so in-flight requests finish, then exit. */
const shutdown = (signal) => {
  console.log(`\n${signal} received — shutting down gracefully...`);
  server.close(async () => {
    await prisma.$disconnect().catch(() => {});
    console.log('✅ Server closed');
    process.exit(0);
  });
  // Force-exit if connections hang beyond 10s.
  setTimeout(() => process.exit(1), 10_000).unref();
};

process.on('SIGTERM', () => shutdown('SIGTERM'));
process.on('SIGINT', () => shutdown('SIGINT'));

process.on('unhandledRejection', (reason) => {
  console.error('💥 Unhandled rejection:', reason);
  shutdown('unhandledRejection');
});
process.on('uncaughtException', (err) => {
  console.error('💥 Uncaught exception:', err);
  process.exit(1);
});
