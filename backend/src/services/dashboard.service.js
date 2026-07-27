/** Aggregated stats for the admin dashboard. */
const prisma = require('../config/db');

const startOfDay = (d = new Date()) => new Date(d.getFullYear(), d.getMonth(), d.getDate());

const getStats = async () => {
  const today = startOfDay();
  const weekAgo = new Date(today.getTime() - 6 * 24 * 60 * 60 * 1000);
  const monthStart = new Date(today.getFullYear(), today.getMonth(), 1);

  const [
    totalProducts,
    activeProducts,
    totalServices,
    activeServices,
    totalCategories,
    totalLeads,
    leadsByStatusRaw,
    leadsToday,
    leadsThisWeek,
    leadsThisMonth,
  ] = await prisma.$transaction([
    prisma.product.count(),
    prisma.product.count({ where: { isActive: true } }),
    prisma.service.count(),
    prisma.service.count({ where: { isActive: true } }),
    prisma.category.count(),
    prisma.lead.count(),
    prisma.lead.groupBy({ by: ['status'], _count: { _all: true } }),
    prisma.lead.count({ where: { createdAt: { gte: today } } }),
    prisma.lead.count({ where: { createdAt: { gte: weekAgo } } }),
    prisma.lead.count({ where: { createdAt: { gte: monthStart } } }),
  ]);

  // Always return every status key, even at zero, so the UI never guesses.
  const leadsByStatus = { NEW: 0, CONTACTED: 0, IN_PROGRESS: 0, CONVERTED: 0, CLOSED: 0 };
  leadsByStatusRaw.forEach((r) => {
    leadsByStatus[r.status] = r._count._all;
  });

  return {
    products: { total: totalProducts, active: activeProducts },
    services: { total: totalServices, active: activeServices },
    categories: { total: totalCategories },
    leads: {
      total: totalLeads,
      byStatus: leadsByStatus,
      today: leadsToday,
      thisWeek: leadsThisWeek,
      thisMonth: leadsThisMonth,
    },
  };
};

const getRecentLeads = async (take = 10) =>
  prisma.lead.findMany({
    orderBy: { createdAt: 'desc' },
    take,
    include: {
      product: { select: { id: true, name: true } },
      service: { select: { id: true, name: true } },
    },
  });

/** Daily lead counts for the last `days` days — zero-filled for charting. */
const getLeadTrends = async (days = 30) => {
  const from = startOfDay(new Date(Date.now() - (days - 1) * 24 * 60 * 60 * 1000));
  const leads = await prisma.lead.findMany({
    where: { createdAt: { gte: from } },
    select: { createdAt: true },
  });

  const counts = new Map();
  for (let i = 0; i < days; i += 1) {
    const d = new Date(from.getTime() + i * 24 * 60 * 60 * 1000);
    counts.set(d.toISOString().slice(0, 10), 0);
  }
  leads.forEach((l) => {
    const key = l.createdAt.toISOString().slice(0, 10);
    if (counts.has(key)) counts.set(key, counts.get(key) + 1);
  });

  return Array.from(counts.entries()).map(([date, count]) => ({ date, count }));
};

module.exports = { getStats, getRecentLeads, getLeadTrends };
