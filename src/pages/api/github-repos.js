import rateLimit from "@/utils/rate-limit";

const limiter = rateLimit({
  limit: 5,
  windowMs: 60_000,
});

export default async function handler(req, res) {
  if (!limiter.check(req)) {
    return res.status(429).json({
      error: "Too many requests. Please try again later.",
    });
  }

  const username = "itanne99";

  try {
    const gitHubResponse = await fetch(
      `https://api.github.com/users/${username}/repos?sort=updated&per_page=20`,
      {
        headers: {
          "Accept": "application/vnd.github.v3+json",
          "User-Agent": "ido-portfolio",
        },
      }
    );

    if (!gitHubResponse.ok) {
      return res.status(gitHubResponse.status).json({
        error: `GitHub API responded with status ${gitHubResponse.status}`,
      });
    }

    const data = await gitHubResponse.json();
    if (!Array.isArray(data)) {
      return res.status(500).json({ error: "Invalid response structure from GitHub" });
    }

    const repos = data
      .filter((repo) => !repo.fork)
      .toSorted(
        (a, b) =>
          (b.stargazers_count || 0) - (a.stargazers_count || 0) ||
          new Date(b.updated_at) - new Date(a.updated_at)
      )
      .slice(0, 6);

    return res.status(200).json(repos);
  } catch (error) {
    console.error("Error in API handler /api/github-repos:", error);
    return res.status(500).json({ error: "Failed to fetch repositories from GitHub" });
  }
}
