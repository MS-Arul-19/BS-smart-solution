/** Settings key-value store. Public reads are whitelist-only. */
const prisma = require('../config/db');
const { PUBLIC_SETTING_KEYS } = require('../config/constants');

const toObject = (rows) => Object.fromEntries(rows.map((r) => [r.key, r.value]));

const getPublic = async () => {
  const rows = await prisma.settings.findMany({ where: { key: { in: PUBLIC_SETTING_KEYS } } });
  return toObject(rows);
};

const getAll = async () => {
  const rows = await prisma.settings.findMany({ orderBy: { key: 'asc' } });
  return toObject(rows);
};

/** Bulk upsert: [{key, value}] */
const upsertMany = async (entries) => {
  await prisma.$transaction(
    entries.map(({ key, value }) =>
      prisma.settings.upsert({ where: { key }, update: { value }, create: { key, value } })
    )
  );
  return getAll();
};

module.exports = { getPublic, getAll, upsertMany };
