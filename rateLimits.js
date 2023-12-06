const {rateLimit: rateLimits} = require('express-rate-limit');

const mainLimiter = rateLimits({
	windowMs: 1 * 60 * 1000, // 1 minutes
	limit: 30, // Limit each IP to 100 requests per `window` (here, per 15 minutes).
	standardHeaders: true, // draft-6: `RateLimit-*` headers; draft-7: combined `RateLimit` header
	legacyHeaders: false, // Disable the `X-RateLimit-*` headers.
	message: 'you are doing that too much, wait a minute and try again',
	skipFailedRequests: true
	// store: ... , // Use an external store for consistency across multiple server instances.
})

const testLimiter = rateLimits({
	windowMs: 1 * 60 * 1000, // 1 minutes
	limit: 100, // Limit each IP to 100 requests per `window` (here, per 15 minutes).
	standardHeaders: true, // draft-6: `RateLimit-*` headers; draft-7: combined `RateLimit` header
	legacyHeaders: false, // Disable the `X-RateLimit-*` headers.
	message: 'you are doing that too much, wait 5 minutes and try again',
	skipFailedRequests: true
	// store: ... , // Use an external store for consistency across multiple server instances.
})


module.exports = {mainLimiter, testLimiter}