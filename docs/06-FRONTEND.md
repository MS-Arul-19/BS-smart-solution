# 06 — Minimal Frontend Spec (React + Vite)

Purpose: **test the APIs**. No animations, no design system, no component library. Plain React + fetch + a small CSS file with a **minimal colour theme**.

## Minimal Colour Theme

Defined once as CSS variables in `src/index.css`:

```css
:root {
  --bg:        #f7f8fa;   /* page background */
  --surface:   #ffffff;   /* cards, tables, forms */
  --border:    #e3e6ea;
  --text:      #1c2430;   /* primary text */
  --text-dim:  #5b6572;   /* secondary text */
  --primary:   #0f6fde;   /* buttons, links, active states */
  --primary-d: #0b57ad;   /* hover */
  --success:   #1e8e5a;   /* WhatsApp / converted */
  --danger:    #c93b3b;   /* delete, errors */
  --radius:    6px;
}
```

Flat colours only. System font stack. No shadows beyond a 1px border, no transitions.

## Pages

### Public
| Route | Purpose |
|-------|---------|
| `/` | links to lists + featured items |
| `/products` | grid + search box + category filter + pagination |
| `/products/:slug` | detail + "Enquire on WhatsApp" button |
| `/services` | grid list |
| `/services/:slug` | detail + enquiry button |
| `/enquiry` | enquiry form (prefilled product/service via query param) → POST `/leads` → `window.location.href = whatsappUrl` |

### Admin (JWT in localStorage, axios/fetch interceptor adds header)
| Route | Purpose |
|-------|---------|
| `/admin/login` | login form |
| `/admin` | dashboard stat cards + recent leads |
| `/admin/leads` | table with status filter + status dropdown per row |
| `/admin/products` | table + create/edit form (with image upload) |
| `/admin/services` | same |
| `/admin/categories` | simple list + form |
| `/admin/settings` | key/value editor (whatsapp number etc.) |

## Structure

```
frontend/
├── index.html
├── vite.config.js        # proxy /api + /uploads → http://localhost:5000
└── src/
    ├── main.jsx
    ├── App.jsx           # react-router routes
    ├── index.css         # theme above, ~150 lines total
    ├── api/client.js     # fetch wrapper: base url, token header, 401 → login redirect
    ├── pages/            # one file per page listed above
    └── components/       # Pagination, StatusBadge, ProtectedRoute — that's it
```

## Rules
- `fetch` wrapper only — no axios needed, no state library (React state + URL params).
- Forms are controlled components with plain `<input>`/`<select>`.
- Errors shown as a red text line; success as green. Nothing more.
