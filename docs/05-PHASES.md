# 05 — Build Phases & Checklist

Strict order. One phase at a time. Each phase ends with a working, testable state and waits for approval.

## Phase 1 — Project Setup ⬅ current
- [ ] `backend/` npm project, all dependencies installed
- [ ] Folder skeleton (controllers/routes/services/middleware/validations/config/utils/prisma/uploads)
- [ ] `config/env.js` (Zod-validated, fail-fast) + `.env` / `.env.example`
- [ ] `app.js` with full middleware stack (helmet, cors, compression, morgan, json limit, rate limiter)
- [ ] `utils`: ApiError, ApiResponse, asyncHandler
- [ ] `errorHandler` + `notFound` middleware
- [ ] `GET /api/v1/health` returns 200
- [ ] Server boots with graceful shutdown

## Phase 2 — Database Design
- [ ] `schema.prisma` — all 7 tables + enums per [02-DATABASE.md](02-DATABASE.md)
- [ ] `config/db.js` Prisma singleton
- [ ] Initial migration applied
- [ ] `seed.js` — admin, settings, sample categories/products/services
- [ ] Health endpoint reports DB connectivity

## Phase 3 — Authentication
- [ ] auth.service (login, refresh, me, change-password) — bcrypt 12, dual-secret JWT
- [ ] auth middleware + role guard
- [ ] Strict login rate limiter
- [ ] Zod schemas for all auth bodies

## Phase 4 — Product Module
- [ ] Category CRUD (delete blocked when in use)
- [ ] Product CRUD + public list (pagination/search/filter/sort) + detail by slug
- [ ] Slug auto-generation with uniqueness
- [ ] Admin list with inactive rows

## Phase 5 — Service Module
- [ ] Service CRUD, public list + detail, same query features
- [ ] priceType handling (FIXED / STARTING_FROM / ON_INSPECTION)

## Phase 6 — Lead Module
- [ ] Public enquiry submit (validated, rate-limited, honeypot)
- [ ] WhatsApp URL builder from settings + lead data
- [ ] Admin: list with filters (status, type, date range, search), detail, status update, delete (SUPER_ADMIN)

## Phase 7 — Dashboard APIs
- [ ] `/dashboard/stats`, `/dashboard/recent-leads`, `/dashboard/lead-trends`
- [ ] Settings module (public whitelist + admin bulk upsert)

## Phase 8 — File Upload
- [ ] Multer factory (image-only, 2 MB, uuid filenames)
- [ ] Wire into product/service/category create/update
- [ ] Gallery endpoints; orphan file cleanup

## Phase 9 — Testing
- [ ] Minimal React + Vite frontend (minimal colour theme, per [06-FRONTEND.md](06-FRONTEND.md))
- [ ] Public pages: products, services, detail, enquiry form → WhatsApp redirect
- [ ] Admin pages: login, dashboard, leads table, product/service managers
- [ ] End-to-end smoke run of every API

## Phase 10 — Deployment Preparation
- [ ] Production scripts, `NODE_ENV` handling, morgan format switch
- [ ] `docker-compose` for Postgres (optional), deployment guide per [07-DEPLOYMENT.md](07-DEPLOYMENT.md)
- [ ] Final security pass against [04-SECURITY.md](04-SECURITY.md)
