/**
 * Root router — every domain router is mounted here.
 * Domain routers are added phase by phase (auth, categories, products, ...).
 */
const { Router } = require('express');
const prisma = require('../config/db');
const asyncHandler = require('../utils/asyncHandler');

const authRoutes = require('./auth.routes');
const categoryRoutes = require('./category.routes');
const productRoutes = require('./product.routes');
const serviceRoutes = require('./service.routes');
const leadRoutes = require('./lead.routes');
const dashboardRoutes = require('./dashboard.routes');
const galleryRoutes = require('./gallery.routes');
const settingsRoutes = require('./settings.routes');

const router = Router();

router.use('/auth', authRoutes);
router.use('/categories', categoryRoutes);
router.use('/products', productRoutes);
router.use('/services', serviceRoutes);
router.use('/leads', leadRoutes);
router.use('/dashboard', dashboardRoutes);
router.use('/gallery', galleryRoutes);
router.use('/settings', settingsRoutes);

/** Liveness/readiness probe with a DB round-trip. */
router.get(
  '/health',
  asyncHandler(async (req, res) => {
    let db = 'up';
    try {
      await prisma.$queryRaw`SELECT 1`;
    } catch {
      db = 'down';
    }
    res.status(db === 'up' ? 200 : 503).json({
      success: db === 'up',
      message: 'BS Smart Solution API is running',
      data: {
        status: 'up',
        db,
        uptime: Math.floor(process.uptime()),
        timestamp: new Date().toISOString(),
      },
    });
  })
);

module.exports = router;
