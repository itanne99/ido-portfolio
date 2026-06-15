const rateLimitMap = new Map();

export default function rateLimit(options = {}) {
  const { limit = 10, windowMs = 60_000 } = options;

  return {
    check: (req, limitOverride = limit) => {
      const ip =
        req.headers["x-forwarded-for"] ||
        req.socket.remoteAddress ||
        "127.0.0.1";

      const now = Date.now();
      const userRate = rateLimitMap.get(ip) || [];

      // Clean up old timestamps outside the sliding window
      const cleanRate = userRate.filter((timestamp) => now - timestamp < windowMs);

      if (cleanRate.length >= limitOverride) {
        return false;
      }

      cleanRate.push(now);
      rateLimitMap.set(ip, cleanRate);
      return true;
    },
  };
}
