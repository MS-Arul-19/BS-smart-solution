# BS Smart Solution

Production-ready **B2B Lead Generation Platform**.

> This is **NOT** an e-commerce site. Customers cannot buy online — they browse **Products** (bulk) and **Services** (local: electrician, plumbing, CCTV, AC service, home maintenance, interior works), submit an **enquiry**, and are redirected to **WhatsApp**. Every enquiry is stored in the database as a **Lead** before redirect.

---

## Modules

| Module   | Purpose                                                        |
|----------|----------------------------------------------------------------|
| Products | Showcase bulk products with categories, images, specs          |
| Services | Showcase local services with pricing type & coverage area      |
| Leads    | Store every enquiry + generate WhatsApp deep-link              |
| Admin    | JWT-protected panel: manage products/services, view/update leads, dashboard stats |

## Tech Stack

- **Backend:** Node.js, Express, PostgreSQL, Prisma ORM
- **Auth:** JWT (access + refresh), bcrypt
- **Validation:** Zod
- **Uploads:** Multer (local `uploads/`, served statically)
- **Security:** Helmet, CORS whitelist, rate limiting, HPP-safe query parsing
- **Ops:** Morgan (logging), Compression, dotenv
- **Frontend:** React + Vite — minimal API-testing UI with a minimal colour theme (no animations)

## Repository Layout

```
smart-solution/
├── README.md
├── docs/                  # Full build blueprint (read in order)
│   ├── 01-ARCHITECTURE.md
│   ├── 02-DATABASE.md
│   ├── 03-API-SPEC.md
│   ├── 04-SECURITY.md
│   ├── 05-PHASES.md
│   ├── 06-FRONTEND.md
│   └── 07-DEPLOYMENT.md
├── backend/               # Express + Prisma API
└── frontend/              # React + Vite minimal test UI
```

## Quick Start (local development)

A **portable PostgreSQL 16** lives in `.pg/` (no installation needed). Everything is already migrated and seeded.

```powershell
# 1. Start the database
powershell -File scripts\db-start.ps1

# 2. Start the API  (http://localhost:5000)
cd backend
npm run dev

# 3. Start the frontend  (http://localhost:5173, proxies /api to :5000)
cd ..\frontend
npm run dev
```

**Default admin login:** `admin@bssmartsolution.com` / `ChangeMe@123` (change it after first login — the values come from `backend/.env`).

Health check: `GET http://localhost:5000/api/v1/health`
Stop the DB when done: `powershell -File scripts\db-stop.ps1`

## Testing

`GET /api/v1/health` plus a 46-assertion end-to-end smoke suite was run against every endpoint (auth, CRUD, leads, WhatsApp URL, uploads, guards). The minimal React frontend at `frontend/` exercises all APIs manually.

## Production

Use `docker-compose.yml` (Postgres + API) or follow [docs/07-DEPLOYMENT.md](docs/07-DEPLOYMENT.md) for PM2/nginx. Build the frontend with `npm run build` and serve `frontend/dist` statically.

## Build Order

The project was built in **10 strict phases** — see [docs/05-PHASES.md](docs/05-PHASES.md).
