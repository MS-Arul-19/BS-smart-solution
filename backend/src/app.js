/**
 * Express app assembly. Middleware ORDER is deliberate — see docs/01-ARCHITECTURE.md.
 * No business logic lives here.
 */
const path = require('path');
const express = require('express');
const helmet = require('helmet');
const cors = require('cors');
const compression = require('compression');
const morgan = require('morgan');

const env = require('./config/env');
const { API_PREFIX } = require('./config/constants');
const { generalLimiter } = require('./middleware/rateLimiter');
const routes = require('./routes');
const notFound = require('./middleware/notFound');
const errorHandler = require('./middleware/errorHandler');

const app = express();

// Behind nginx/Caddy in production — trust the first proxy hop so
// rate limiting and req.ip use the real client address.
app.set('trust proxy', 1);
app.disable('x-powered-by');

// 1. Security headers. CORP relaxed so uploaded images render cross-origin.
app.use(helmet({ crossOriginResourcePolicy: { policy: 'cross-origin' } }));

// 2. CORS — explicit whitelist from env, no wildcard in production.
app.use(
  cors({
    origin: (origin, cb) => {
      // Allow non-browser tools (curl/Postman) which send no Origin header.
      if (!origin || env.corsOrigins.includes(origin)) return cb(null, true);
      return cb(new Error('Not allowed by CORS'));
    },
    methods: ['GET', 'POST', 'PUT', 'PATCH', 'DELETE'],
  })
);

// 3–4. Compression + request logging (verbose in dev, standard in prod).
app.use(compression());
app.use(morgan(env.isProd ? 'combined' : 'dev'));

// 5. Body parsing with a hard size cap (uploads use multipart, not JSON).
app.use(express.json({ limit: '100kb' }));
app.use(express.urlencoded({ extended: true, limit: '100kb' }));

// 6. Baseline rate limit for the whole API.
app.use(API_PREFIX, generalLimiter);

// 7. Static file serving for uploaded images (read-only).
app.use('/uploads', express.static(path.join(__dirname, '..', 'uploads'), { index: false }));

// 8. API routes.
app.use(API_PREFIX, routes);

// 9–10. 404 catcher, then the single central error handler.
app.use(notFound);
app.use(errorHandler);

module.exports = app;
