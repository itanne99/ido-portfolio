import rateLimit from "@/utils/rate-limit";

const limiter = rateLimit({
  limit: 10,
  windowMs: 60_000,
});

export default function handler(req, res) {
  if (!limiter.check(req)) {
    return res.status(429).json({
      error: "Too many requests. Please try again later.",
    });
  }
  res.status(200).json({ name: "John Doe" });
}
