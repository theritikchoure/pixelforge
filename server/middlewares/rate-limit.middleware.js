const rateLimit = require("express-rate-limit");

// Rate limiters
const dailyLimitUnauthenticated = rateLimit({
  windowMs: 24 * 60 * 60 * 1000, // 24 hours
  max: 5, // Limit to 5 requests per day for unauthenticated users
  message:
    "Daily limit exceeded for unauthenticated users. You can only process 5 images per day.",
});

const dailyLimitAuthenticated = rateLimit({
  windowMs: 24 * 60 * 60 * 1000, // 24 hours
  max: 500, // Limit to 500 requests per day for authenticated users
  message:
    "Daily limit exceeded for authenticated users. You can process up to 500 images per day.",
});

const applyRateLimit = (req, res, next) => {
  if (req.user) {
    // Authenticated users (with token) have a higher rate limit
    dailyLimitAuthenticated(req, res, next);
  } else {
    // Unauthenticated users have a lower rate limit
    dailyLimitUnauthenticated(req, res, next);
  }
};


module.exports = applyRateLimit;