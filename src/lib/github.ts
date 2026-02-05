// GitHub README fetching utilities
export async function fetchGitHubReadme(
  owner: string,
  repo: string,
  filePath: string = ""
): Promise<string> {
  try {
    // For testing with local files, simulate GitHub API
    if (process.env.NODE_ENV === "development") {
      const fs = await import("fs/promises");
      const path = await import("path");

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
    const content = atob(data.content);
    return content;
  } catch (error) {
    console.error(
      `Error fetching GitHub README for ${owner}/${repo}/${filePath}:`,
      error
    );
    return "";
  }
}

export function parseMoviesFromReadme(
  readme: string
): Array<{ title: string; description?: string }> {
  const movies: Array<{ title: string; description?: string }> = [];

  // Look for markdown lists with movie titles
  const lines = readme.split("\n");

  for (const line of lines) {
    // Match list items (- *, 1., etc.)
    const listMatch = line.match(/^[\s]*[-*+]\s+(.+)$/);
    if (listMatch) {
      const content = listMatch[1].trim();

      // Skip if it looks like a header or section
      if (
        content.toLowerCase().includes("movies:") ||
        content.toLowerCase().includes("films:") ||
        content.toLowerCase().includes("##") ||
        content.toLowerCase().includes("###")
      ) {
        continue;
      }

      // Try to extract title and description
      const parts = content.split(/[-–—]/);
      if (parts.length >= 2) {
        movies.push({
          title: parts[0].trim(),
          description: parts.slice(1).join("-").trim(),
        });
      } else {
        movies.push({
          title: content,
          description: undefined,
        });
      }
    }
  }

  return movies;
}

export function parseMusicFromReadme(
  readme: string
): Array<{ title: string; link: string }> {
  const songs: Array<{ title: string; link: string }> = [];

  // Look for markdown links in readme
  const linkRegex = /\[([^\]]+)\]\(([^)]+)\)/g;
  let match;

  while ((match = linkRegex.exec(readme)) !== null) {
    const title = match[1].trim();
    const link = match[2].trim();

    // Only include if it looks like a music link (YouTube, SoundCloud, etc.)
    if (
      link.includes("youtube.com") ||
      link.includes("youtu.be") ||
      link.includes("soundcloud.com") ||
      link.includes("spotify.com")
    ) {
      songs.push({ title, link });
    }
  }

  return songs;
}

export function parseReadingFromReadme(readme: string): Array<{
  title: string;
  type: "book" | "manga" | "web-novel";
  description?: string;
  link?: string;
}> {
  const reading: Array<{
    title: string;
    type: "book" | "manga" | "web-novel";
    description?: string;
    link?: string;
  }> = [];

  // Look for sections with reading content
  const lines = readme.split("\n");
  let currentSection: "book" | "manga" | "web-novel" | null = null;

  for (const line of lines) {
    const lowerLine = line.toLowerCase();

    // Detect section headers
    if (lowerLine.includes("books:") || lowerLine.includes("## books")) {
      currentSection = "book";
      continue;
    } else if (lowerLine.includes("manga:") || lowerLine.includes("## manga")) {
      currentSection = "manga";
      continue;
    } else if (
      lowerLine.includes("web novels:") ||
      lowerLine.includes("## web novels") ||
      lowerLine.includes("webnovels:")
    ) {
      currentSection = "web-novel";
      continue;
    }

    // Parse list items if we're in a section
    if (currentSection) {
      const listMatch = line.match(/^[\s]*[-*+]\s+(.+)$/);
      if (listMatch) {
        const content = listMatch[1].trim();

        // Skip if it looks like a header
        if (
          content.toLowerCase().includes("##") ||
          content.toLowerCase().includes("###")
        ) {
          continue;
        }

        // Check if it's a markdown link
        const linkMatch = content.match(/\[([^\]]+)\]\(([^)]+)\)/);
        if (linkMatch) {
          reading.push({
            title: linkMatch[1].trim(),
            type: currentSection,
            link: linkMatch[2].trim(),
          });
        } else {
          // Try to extract title and description
          const parts = content.split(/[-–—]/);
          if (parts.length >= 2) {
            reading.push({
              title: parts[0].trim(),
              type: currentSection,
              description: parts.slice(1).join("-").trim(),
            });
          } else {
            reading.push({
              title: content,
              type: currentSection,
            });
          }
        }
      }
    }
  }

  return reading;
}
