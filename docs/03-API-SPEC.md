# 03 — API Specification

Base URL: `/api/v1` · All responses use the envelopes from [01-ARCHITECTURE.md](01-ARCHITECTURE.md).

**Legend:** 🔓 public · 🔐 admin JWT required (`Authorization: Bearer <accessToken>`)

## Auth
| Method | Path | Access | Notes |
|--------|------|--------|-------|
| POST | /auth/login | 🔓 (strict rate limit) | `{email, password}` → `{admin, accessToken, refreshToken}` |
| POST | /auth/refresh | 🔓 | `{refreshToken}` → new access token |
| GET  | /auth/me | 🔐 | current admin profile |
| POST | /auth/change-password | 🔐 | `{currentPassword, newPassword}` |
| POST | /auth/logout | 🔐 | client-side token discard acknowledgement |

## Categories
| Method | Path | Access |
|--------|------|--------|
| GET | /categories | 🔓 active only; `?includeInactive=true` 🔐 |
| GET | /categories/:slug | 🔓 |
| POST | /categories | 🔐 |
| PUT | /categories/:id | 🔐 |
| DELETE | /categories/:id | 🔐 (blocked if products exist → 409) |

## Products
| Method | Path | Access | Query params |
|--------|------|--------|--------------|
| GET | /products | 🔓 | `page, limit, search, category (slug), featured, sortBy(createdAt|name|sortOrder), sortOrder(asc|desc)` |
| GET | /products/:slug | 🔓 | includes category + gallery |
| GET | /products/admin/all | 🔐 | same params + `isActive` filter, addressed by id |
| POST | /products | 🔐 | multipart (image) or JSON |
| PUT | /products/:id | 🔐 | |
| PATCH | /products/:id/status | 🔐 | toggle `isActive` |
| DELETE | /products/:id | 🔐 | |

## Services
Same shape as Products (no category):
`GET /services` 🔓 · `GET /services/:slug` 🔓 · `GET /services/admin/all` 🔐 · `POST /services` 🔐 · `PUT /services/:id` 🔐 · `PATCH /services/:id/status` 🔐 · `DELETE /services/:id` 🔐

## Leads (Enquiries)
| Method | Path | Access | Notes |
|--------|------|--------|-------|
| POST | /leads | 🔓 (strict rate limit) | body: `{name, phone, email?, message?, enquiryType, productId?, serviceId?, quantity?}`. Stores lead → returns `{lead, whatsappUrl}` |
| GET | /leads | 🔐 | `page, limit, search(name/phone), status, enquiryType, dateFrom, dateTo` |
| GET | /leads/:id | 🔐 | with product/service relation |
| PATCH | /leads/:id/status | 🔐 | `{status, adminNote?}` |
| DELETE | /leads/:id | 🔐 SUPER_ADMIN only | |

### WhatsApp URL generation
Server builds the message from stored data + `whatsapp_number` setting:
```
Hello BS Smart Solution 👋
Enquiry: <Product/Service name>
Name: <name>
Phone: <phone>
Qty: <quantity?>
Message: <message?>
```
Returned as `https://wa.me/<number>?text=<urlencoded>` — frontend just redirects.

## Dashboard 🔐
| Method | Path | Returns |
|--------|------|---------|
| GET | /dashboard/stats | totals: products, services, leads, leads-by-status, leads today/this week/this month |
| GET | /dashboard/recent-leads | last 10 leads |
| GET | /dashboard/lead-trends | daily lead counts, last 30 days (for chart) |

## Gallery 🔐 (upload) / 🔓 (read via parent)
| Method | Path | Access |
|--------|------|--------|
| POST | /gallery | 🔐 multipart, `{productId | serviceId}` |
| DELETE | /gallery/:id | 🔐 (also deletes file from disk) |

## Settings
| Method | Path | Access |
|--------|------|--------|
| GET | /settings/public | 🔓 whitelisted keys only (business name, whatsapp number…) |
| GET | /settings | 🔐 all |
| PUT | /settings | 🔐 bulk upsert `[{key, value}]` |

## Misc
| Method | Path | Access |
|--------|------|--------|
| GET | /health | 🔓 `{status, uptime, db}` |

## Status Codes
`200` OK · `201` created · `400` validation error · `401` missing/invalid token · `403` forbidden (role) · `404` not found · `409` conflict (duplicate slug/email, category-in-use) · `413` file too large · `422` unsupported file type · `429` rate limited · `500` unexpected (message hidden in production)
