// In-memory rate limiter
const rateLimiters = {}; // To store per-user rate limits

const rateLimiter = (userId, limit = 10, windowMs = 60000) => {
    const currentTime = Date.now();

    // Initialize user data if not exists
    if (!rateLimiters[userId]) {
        rateLimiters[userId] = { count: 0, startTime: currentTime };
    }

    const userLimiter = rateLimiters[userId];

    // Reset if window time has passed
    if (currentTime - userLimiter.startTime > windowMs) {
        userLimiter.count = 0;
        userLimiter.startTime = currentTime;
    }

    // Increment count and check limit
    userLimiter.count += 1;
    if (userLimiter.count > limit) {
        return false; // Rate limit exceeded
    }
    return true; // Allow event
};

export default rateLimiter;
