import type { APIRoute } from "astro";
import { fetchGitHubReadme } from "@/lib/server-github";

export const GET: APIRoute = async ({ request }) => {
  const url = new URL(request.url);
  const owner = url.searchParams.get("owner");
  const repo = url.searchParams.get("repo");
  const filePath = url.searchParams.get("filePath") || "";

  if (!owner || !repo) {
    return new Response(
      JSON.stringify({ error: "Owner and Repo are required" }),
      {
        status: 400,
        headers: { "Content-Type": "application/json" },
      }
    );
  }

  try {
    const content = await fetchGitHubReadme(owner, repo, filePath);
    return new Response(JSON.stringify({ content }), {
      status: 200,
      headers: {
        "Content-Type": "application/json",
        // Cache for 5 minutes
        "Cache-Control": "public, max-age=300",
      },
    });
  } catch (error) {
    console.error("API Error fetching GitHub README:", error);
    return new Response(JSON.stringify({ error: "Failed to fetch README" }), {
      status: 500,
      headers: { "Content-Type": "application/json" },
    });
  }
};
