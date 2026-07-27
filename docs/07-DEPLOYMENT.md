# 07 — Deployment Preparation

## Environments
| Var | Dev | Prod |
|-----|-----|------|
| NODE_ENV | development | production |
| Morgan | `dev` | `combined` |
| Error responses | message + stack in logs | generic 500 message |
| CORS | localhost:5173 | real domain(s) only |

## Environment Variables (complete list — see `.env.example`)
```
NODE_ENV, PORT
DATABASE_URL                      # postgresql://user:pass@host:5432/bs_smart_solution
JWT_ACCESS_SECRET (≥32 chars)     JWT_ACCESS_EXPIRES=15m
JWT_REFRESH_SECRET (≥32 chars)    JWT_REFRESH_EXPIRES=7d
CORS_ORIGINS                      # comma separated
WHATSAPP_NUMBER                   # digits with country code, e.g. 919876543210
SEED_ADMIN_EMAIL, SEED_ADMIN_PASSWORD, SEED_ADMIN_NAME
MAX_FILE_SIZE_MB=2
```

## Production Checklist
1. `npm ci --omit=dev` in `backend/`
2. `npx prisma migrate deploy` (never `migrate dev` in prod)
3. `npm run seed` once (idempotent — upserts)
4. Run under a process manager: `pm2 start src/server.js --name bs-api` (or systemd / Docker)
5. Reverse proxy (nginx/Caddy): TLS termination, proxy `/api` + `/uploads` to Node, serve frontend `dist/` statically
6. Postgres: dedicated DB user with least privilege; daily `pg_dump` backup
7. `uploads/` on persistent volume; excluded from image rebuilds
8. Frontend: `npm run build` → deploy `dist/` to same proxy or any static host, `VITE_API_URL` pointing to API domain
9. Rotate JWT secrets = force re-login (acceptable for admin-only auth)
10. Health monitoring: poll `GET /api/v1/health` (checks DB round-trip)

## Optional Docker
`docker-compose.yml` with services: `db` (postgres:16-alpine, volume), `api` (node:20-alpine, depends_on db), reverse proxy left to host. Provided in Phase 10.

## Graceful Shutdown (already in server.js)
SIGTERM/SIGINT → stop accepting connections → `server.close()` → `prisma.$disconnect()` → exit 0. Prevents dropped requests during deploys.
