/**
 * Rate limiters. General limiter applies to the whole API;
 * strict limiters are attached per-route (login, public enquiry).
 */
const rateLimit = require('express-rate-limit');
const { RATE_LIMIT } = require('../config/constants');

const buildLimiter = ({ windowMs, max }, message) =>
  rateLimit({
    windowMs,
    max,
    standardHeaders: true,
    legacyHeaders: false,
    message: { success: false, message },
  });

module.exports = {
  generalLimiter: buildLimiter(RATE_LIMIT.GENERAL, 'Too many requests, please try again later'),
  loginLimiter: buildLimiter(RATE_LIMIT.LOGIN, 'Too many login attempts, try again in 15 minutes'),
  enquiryLimiter: buildLimiter(RATE_LIMIT.ENQUIRY, 'Too many enquiries, please try again shortly'),
};
