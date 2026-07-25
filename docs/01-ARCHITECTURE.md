# 01 — Architecture

## Style: Clean / Layered Architecture

Every request flows through exactly one path. **No layer skips another.**

```
Request
  → routes/        (URL → controller mapping, attaches middleware)
  → middleware/    (auth, validation, rate limit, upload)
  → controllers/   (HTTP layer only: read req, call service, send response)
  → services/      (ALL business logic, the only layer touching Prisma)
  → prisma/        (data access — PostgreSQL)
Response
  ← utils/ApiResponse (uniform success envelope)
  ← middleware/errorHandler (uniform error envelope)
```

### Layer Rules

| Layer         | May import              | Must NOT do                                  |
|---------------|-------------------------|----------------------------------------------|
| routes        | controllers, middleware | contain logic                                |
| controllers   | services, utils         | touch Prisma, contain business rules         |
| services      | prisma client, utils    | touch `req`/`res`                            |
| validations   | zod only                | anything else                                |
| middleware    | utils, config           | business logic                               |
| utils         | nothing app-specific    | hold state                                   |

## Backend Folder Structure

```
backend/
├── prisma/
│   ├── schema.prisma
│   └── seed.js
├── src/
│   ├── config/
│   │   ├── env.js            # loads + validates all env vars (Zod), fail-fast
│   │   ├── db.js             # singleton PrismaClient
│   │   └── constants.js      # enums, pagination defaults, upload limits
│   ├── controllers/
│   │   ├── auth.controller.js
│   │   ├── product.controller.js
│   │   ├── category.controller.js
│   │   ├── service.controller.js
│   │   ├── lead.controller.js
│   │   ├── dashboard.controller.js
│   │   ├── gallery.controller.js
│   │   └── settings.controller.js
│   ├── services/             # business logic (one per domain)
│   ├── routes/
│   │   ├── index.js          # mounts all routers under /api/v1
│   │   └── *.routes.js
│   ├── middleware/
│   │   ├── auth.js           # JWT verify → req.admin
│   │   ├── validate.js       # Zod runner (body/query/params)
│   │   ├── errorHandler.js   # central error → JSON
│   │   ├── notFound.js
│   │   ├── rateLimiter.js    # general + strict (login/enquiry)
│   │   └── upload.js         # Multer factory (Phase 8)
│   ├── validations/          # Zod schemas, one file per domain
│   ├── utils/
│   │   ├── ApiError.js       # operational error class
│   │   ├── ApiResponse.js    # success envelope + paginate helper
│   │   ├── asyncHandler.js   # try/catch wrapper for controllers
│   │   ├── pagination.js     # page/limit/skip parsing
│   │   ├── slugify.js
│   │   └── whatsapp.js       # builds wa.me deep-link message
│   ├── app.js                # express app assembly (middleware order matters)
│   └── server.js             # boot, graceful shutdown
├── uploads/                  # local file storage (gitignored contents)
├── .env / .env.example
└── package.json
```

## Response Envelopes (uniform everywhere)

**Success**
```json
{ "success": true, "message": "OK", "data": { }, "meta": { "page": 1, "limit": 10, "total": 42, "totalPages": 5 } }
```
`meta` present only on paginated lists.

**Error**
```json
{ "success": false, "message": "Product not found", "errors": [ { "field": "name", "message": "Required" } ] }
```
`errors` present only for validation failures.

## Middleware Order in `app.js` (critical)

1. `helmet` → 2. `cors` (whitelist) → 3. `compression` → 4. `morgan` → 5. `express.json` (size-limited) → 6. general rate limiter → 7. static `/uploads` → 8. `/api/v1` routes → 9. `notFound` → 10. `errorHandler`

## Key Decisions

- **API versioning:** everything under `/api/v1` so v2 can ship without breaking clients.
- **Soft visibility, hard delete for leads only by admin:** products/services use `isActive` flag; public endpoints only return active rows — admin sees all.
- **Slugs:** products/services/categories addressed publicly by `slug` (SEO-friendly, no ID leakage); admin uses numeric `id`.
- **WhatsApp flow:** `POST /leads` stores the lead **first**, then returns `whatsappUrl` (`https://wa.me/<number>?text=<encoded>`); frontend redirects. DB write is never skipped.
- **Prisma singleton:** one client instance exported from `config/db.js` to avoid connection-pool exhaustion in dev hot-reload.
- **Fail-fast env:** server refuses to boot if any required env var is missing/invalid.
