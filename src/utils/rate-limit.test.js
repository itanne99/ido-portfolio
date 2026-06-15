import rateLimit from "./rate-limit";

describe("rateLimit sliding-window utility", () => {
  let originalDateNow;

  beforeAll(() => {
    originalDateNow = Date.now;
  });

  afterAll(() => {
    Date.now = originalDateNow;
  });

  beforeEach(() => {
    jest.restoreAllMocks();
  });

  test("allows requests under the rate limit", () => {
    const limiter = rateLimit({ limit: 3, windowMs: 1000 });
    const req = { headers: {}, socket: { remoteAddress: "192.168.1.1" } };

    expect(limiter.check(req)).toBe(true);
    expect(limiter.check(req)).toBe(true);
    expect(limiter.check(req)).toBe(true);
  });

  test("blocks requests that exceed the rate limit", () => {
    const limiter = rateLimit({ limit: 2, windowMs: 1000 });
    const req = { headers: {}, socket: { remoteAddress: "192.168.1.2" } };

    expect(limiter.check(req)).toBe(true);
    expect(limiter.check(req)).toBe(true);
    expect(limiter.check(req)).toBe(false);
  });

  test("sliding window cleans up expired requests", () => {
    const limiter = rateLimit({ limit: 2, windowMs: 100 });
    const req = { headers: {}, socket: { remoteAddress: "192.168.1.3" } };

    let currentTime = 1000;
    jest.spyOn(Date, "now").mockImplementation(() => currentTime);

    expect(limiter.check(req)).toBe(true);
    expect(limiter.check(req)).toBe(true);
    expect(limiter.check(req)).toBe(false);

    // Advance time beyond windowMs (100ms)
    currentTime = 1150;

    expect(limiter.check(req)).toBe(true);
  });

  test("handles limit override parameter", () => {
    const limiter = rateLimit({ limit: 2, windowMs: 1000 });
    const req = { headers: {}, socket: { remoteAddress: "192.168.1.4" } };

    expect(limiter.check(req)).toBe(true);
    expect(limiter.check(req)).toBe(true);
    expect(limiter.check(req, 3)).toBe(true);
    expect(limiter.check(req, 3)).toBe(false);
  });

  test("handles x-forwarded-for header and fallbacks", () => {
    const limiter = rateLimit({ limit: 1, windowMs: 1000 });
    const reqHeader = { headers: { "x-forwarded-for": "10.0.0.1" }, socket: {} };
    const reqSocket = { headers: {}, socket: { remoteAddress: "10.0.0.2" } };

    expect(limiter.check(reqHeader)).toBe(true);
    expect(limiter.check(reqHeader)).toBe(false);

    expect(limiter.check(reqSocket)).toBe(true);
  });
});
