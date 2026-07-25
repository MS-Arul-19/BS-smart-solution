const { Router } = require('express');
const controller = require('../controllers/dashboard.controller');
const { auth } = require('../middleware/auth');

const router = Router();

router.use(auth); // everything on the dashboard is admin-only

router.get('/stats', controller.stats);
router.get('/recent-leads', controller.recentLeads);
router.get('/lead-trends', controller.leadTrends);

module.exports = router;
