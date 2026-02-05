import fs from "fs/promises";
import path from "path";

/**
 * Fetch README content from a GitHub repository.
 * In development, this tries to read from local files first.
 *
 * NOTE: This function uses Node.js 'fs' and 'path' modules.
 * It must ONLY be used in server-side code (Astro frontmatter, API routes).
 * DO NOT import this in client-side components (.tsx, .jsx).
 */
export async function fetchGitHubReadme(
  owner: string,
  repo: string,
  filePath: string = ""
): Promise<string> {
  try {
    // For testing with local files, simulate GitHub API
    if (process.env.NODE_ENV === "development") {
      let fileName = "";
      if (repo === "movies-list") fileName = "movies-readme.md";
      else if (repo === "music-playlist") fileName = "music-readme.md";
      else if (repo === "reading-list") fileName = "reading-readme.md";

      if (fileName) {
        const resolvedPath = path.resolve(
          process.cwd(),
          "sample-repos",
          fileName
        );
        try {
          const content = await fs.readFile(resolvedPath, "utf-8");
          return content;
        } catch (fileError) {
          console.log(
            `Sample file not found: ${resolvedPath}, falling back to GitHub`
          );
        }
      }
    }

    // Production GitHub API call
    const url = filePath
      ? `https://api.github.com/repos/${owner}/${repo}/contents/${filePath}`
      : `https://api.github.com/repos/${owner}/${repo}/readme`;

    const response = await fetch(url);
    if (!response.ok) {
      throw new Error(`Failed to fetch README: ${response.statusText}`);
    }

    const data = await response.json();
    // Handle base64 encoding from GitHub API
    // Use Buffer for Node.js environment compatibility
    const content = Buffer.from(data.content, "base64").toString("utf-8");
    return content;
  } catch (error) {
    console.error(
      `Error fetching GitHub README for ${owner}/${repo}/${filePath}:`,
      error
    );
    return "";
  }
}
