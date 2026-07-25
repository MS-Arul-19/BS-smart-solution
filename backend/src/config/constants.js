/** App-wide constants — single source of truth for magic values. */
module.exports = {
  API_PREFIX: '/api/v1',

  PAGINATION: {
    DEFAULT_PAGE: 1,
    DEFAULT_LIMIT: 10,
    MAX_LIMIT: 100,
  },

  RATE_LIMIT: {
    GENERAL: { windowMs: 15 * 60 * 1000, max: 300 },
    LOGIN: { windowMs: 15 * 60 * 1000, max: 10 },
    ENQUIRY: { windowMs: 10 * 60 * 1000, max: 5 },
  },

  UPLOAD: {
    ALLOWED_MIME: ['image/jpeg', 'image/png', 'image/webp'],
    ALLOWED_EXT: ['.jpg', '.jpeg', '.png', '.webp'],
    MAX_FILES: 5,
  },

  BCRYPT_ROUNDS: 12,

  // Settings keys safe to expose on the public settings endpoint
  PUBLIC_SETTING_KEYS: ['business_name', 'business_email', 'business_address', 'whatsapp_number'],
};
