# 04 — Security Blueprint

Defense-in-depth checklist. Every item below is implemented in code, not optional.

## 1. Transport & Headers
- **Helmet** with defaults + `crossOriginResourcePolicy: "cross-origin"` (so `/uploads` images render on the frontend origin).
- **CORS whitelist** from `CORS_ORIGINS` env (comma-separated). No `*` in production. Credentials disabled (token in header, not cookie).
- `x-powered-by` disabled.

## 2. Authentication (JWT)
- **Access token**: short-lived (`15m`), signed with `JWT_ACCESS_SECRET`.
- **Refresh token**: long-lived (`7d`), signed with a **different** secret `JWT_REFRESH_SECRET`; refresh endpoint verifies type claim so an access token can never be replayed as a refresh token (and vice versa).
- Payload: `{ sub: adminId, role }` only — no email/PII in token.
- Passwords: **bcrypt cost 12**. Hash never leaves the service layer (`select` excludes it).
- Login on a disabled account (`isActive:false`) → 401 with the same generic message as wrong-password (no account enumeration).
- Generic error `"Invalid email or password"` for both wrong-email and wrong-password.

## 3. Authorization
- `auth` middleware → verifies token, loads minimal admin, attaches `req.admin`.
- `requireRole('SUPER_ADMIN')` guard for destructive ops (lead delete, admin management later).

## 4. Rate Limiting (express-rate-limit)
- General API: 300 req / 15 min / IP.
- **Login**: 10 attempts / 15 min / IP.
- **Lead submit**: 5 / 10 min / IP (anti-spam) + honeypot field `website` — if filled, silently accept but discard (bot trap).

## 5. Input Validation (Zod)
- Every route has a schema for `body` / `query` / `params`. Unknown keys **stripped**.
- IDs coerced to positive ints; slugs matched against `^[a-z0-9-]+$`.
- Phone: `^[6-9]\d{9}$` (Indian mobile) or E.164 fallback `^\+?[1-9]\d{7,14}$`.
- Prisma parameterizes all queries → SQL injection covered; Zod covers type/shape abuse.

## 6. File Upload (Multer) — Phase 8
- Allowed MIME: `image/jpeg`, `image/png`, `image/webp` — checked by MIME **and** extension.
- Max size 2 MB, max 5 files/request.
- Filenames regenerated: `<uuid>.<ext>` — user filename never touches disk (path traversal impossible).
- Stored outside webroot logic, served read-only via `express.static` with no directory listing.
- On record delete/update, orphaned file unlinked (best-effort, never throws).

## 7. Error Handling
- Central `errorHandler`: known `ApiError` → its status/message; Prisma known codes mapped (P2002→409, P2025→404, P2003→409); everything else → 500 `"Something went wrong"` in production (stack only in development logs).
- `asyncHandler` wraps every controller — no unhandled promise rejections.
- Process-level guards: `unhandledRejection`/`uncaughtException` logged, graceful shutdown (server close → prisma disconnect).

## 8. Payload & DoS
- `express.json({ limit: '100kb' })`, `urlencoded` same.
- Compression enabled (gzip) — safe here since auth uses headers, not cookies (no BREACH-relevant secret reflection).
- Pagination hard cap `limit ≤ 100`.

## 9. Secrets & Config
- All secrets via env; `config/env.js` validates with Zod at boot and **crashes fast** if missing.
- `.env` gitignored; `.env.example` documents every var with safe placeholders.
- JWT secrets required to be ≥ 32 chars.

## 10. Data Hygiene
- Admin responses never include `password`.
- Lead stores `ipAddress` for abuse tracing only.
- Public settings endpoint exposes a **whitelist** of keys — never the whole table.
