# 02 — Database Design (PostgreSQL + Prisma)

## Entity Relationship Overview

```
Category 1───* Product
Product  1───* Lead (optional)
Service  1───* Lead (optional)
Product  1───* Gallery (polymorphic-lite via nullable FKs)
Service  1───* Gallery
Admin    (standalone)
Settings (key-value singleton rows)
```

A **Lead** references *either* a Product *or* a Service (or neither, for general enquiries). Enforced in the service layer.

## Tables

### Admin
| Field        | Type          | Notes                          |
|--------------|---------------|--------------------------------|
| id           | Int PK        | autoincrement                  |
| name         | String        |                                |
| email        | String @unique| login identifier               |
| password     | String        | bcrypt hash, never returned    |
| role         | Enum AdminRole| SUPER_ADMIN / ADMIN            |
| isActive     | Boolean @default(true) | disabled admins can't log in |
| lastLoginAt  | DateTime?     |                                |
| createdAt / updatedAt | DateTime | @default(now) / @updatedAt |

### Category
| Field | Type | Notes |
|-------|------|-------|
| id | Int PK | |
| name | String @unique | |
| slug | String @unique | generated server-side |
| description | String? | |
| image | String? | path under /uploads |
| isActive | Boolean @default(true) | |
| sortOrder | Int @default(0) | |
| createdAt / updatedAt | DateTime | |

### Product
| Field | Type | Notes |
|-------|------|-------|
| id | Int PK | |
| name | String | |
| slug | String @unique | |
| description | String | long text |
| shortDescription | String? | card text |
| specifications | Json? | flexible key/value specs |
| minOrderQty | String? | e.g. "50 units" — bulk B2B hint |
| priceRange | String? | e.g. "₹500–₹800 / unit" (display only, no checkout) |
| unit | String? | e.g. "piece", "kg", "box" |
| image | String? | primary image path |
| categoryId | Int FK → Category | onDelete: Restrict |
| isActive | Boolean @default(true) | |
| isFeatured | Boolean @default(false) | homepage highlight |
| sortOrder | Int @default(0) | |
| createdAt / updatedAt | DateTime | |

Indexes: `@@index([categoryId])`, `@@index([isActive, isFeatured])`

### Service
| Field | Type | Notes |
|-------|------|-------|
| id | Int PK | |
| name | String | e.g. "CCTV Installation" |
| slug | String @unique | |
| description | String | |
| shortDescription | String? | |
| priceType | Enum PriceType | FIXED / STARTING_FROM / ON_INSPECTION |
| priceValue | String? | display string, e.g. "₹499" |
| coverageArea | String? | e.g. "Chennai & suburbs" |
| image | String? | |
| isActive | Boolean @default(true) | |
| isFeatured | Boolean @default(false) | |
| sortOrder | Int @default(0) | |
| createdAt / updatedAt | DateTime | |

Index: `@@index([isActive, isFeatured])`

### Lead
| Field | Type | Notes |
|-------|------|-------|
| id | Int PK | |
| name | String | customer name |
| phone | String | required — WhatsApp number |
| email | String? | |
| message | String? | customer's note |
| enquiryType | Enum EnquiryType | PRODUCT / SERVICE / GENERAL |
| productId | Int? FK → Product | onDelete: SetNull |
| serviceId | Int? FK → Service | onDelete: SetNull |
| quantity | String? | for product enquiries |
| status | Enum LeadStatus | NEW / CONTACTED / IN_PROGRESS / CONVERTED / CLOSED |
| adminNote | String? | internal note by admin |
| source | String @default("website") | future: campaign tracking |
| ipAddress | String? | abuse tracing |
| createdAt / updatedAt | DateTime | |

Indexes: `@@index([status])`, `@@index([enquiryType])`, `@@index([createdAt])`

### Gallery
| Field | Type | Notes |
|-------|------|-------|
| id | Int PK | |
| title | String? | |
| image | String | path |
| productId | Int? FK → Product | onDelete: Cascade |
| serviceId | Int? FK → Service | onDelete: Cascade |
| sortOrder | Int @default(0) | |
| createdAt | DateTime | |

### Settings (key-value)
| Field | Type | Notes |
|-------|------|-------|
| id | Int PK | |
| key | String @unique | e.g. `whatsapp_number`, `business_name`, `business_address`, `business_email` |
| value | String | |
| updatedAt | DateTime | |

Key-value chosen over a fixed-column singleton so new settings never need a migration.

## Enums

```prisma
enum AdminRole  { SUPER_ADMIN ADMIN }
enum PriceType  { FIXED STARTING_FROM ON_INSPECTION }
enum EnquiryType{ PRODUCT SERVICE GENERAL }
enum LeadStatus { NEW CONTACTED IN_PROGRESS CONVERTED CLOSED }
```

## Seed Data (`prisma/seed.js`)

- 1 SUPER_ADMIN (email/password from env `SEED_ADMIN_EMAIL` / `SEED_ADMIN_PASSWORD`)
- Settings row: `whatsapp_number` from env `WHATSAPP_NUMBER`
- 2 sample categories, 2 sample products, 6 services (Electrician, Plumbing, CCTV Installation, AC Service, Home Maintenance, Interior Works)
