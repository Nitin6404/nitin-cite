// Client-side GitHub utilities
// This file is safe to import in client components

/**
 * Fetch README content via our own API proxy.
 * This avoids using 'fs'/'path' in the browser.
 */
export async function fetchGitHubReadme(
  owner: string,
  repo: string,
  filePath: string = ""
): Promise<string> {
  try {
    const params = new URLSearchParams({ owner, repo });
    if (filePath) params.append("filePath", filePath);

    const response = await fetch(`/api/github?${params.toString()}`);
    if (!response.ok) {
      throw new Error(`Failed to fetch README: ${response.statusText}`);
    }

    const data = await response.json();
    return data.content || "";
  } catch (error) {
    console.error("Error fetching GitHub README (client):", error);
    return "";
  }
}

// --- Parsers (Safe for both client and server) ---

export interface CinemaItem {
  title: string;
  description?: string;
}

export interface CinemaData {
  movies: CinemaItem[];
  webShows: CinemaItem[];
  animes: CinemaItem[];
  gallery: string[]; // List of image URLs
}

export function parseMoviesFromReadme(readme: string): CinemaData {
  const data: CinemaData = {
    movies: [],
    webShows: [],
    animes: [],
    gallery: [],
  };

  const lines = readme.split("\n");
  let currentSection: "movies" | "webShows" | "animes" | "gallery" | null =
    "movies"; // Default to movies if no header found initially

  for (const line of lines) {
    const lowerLine = line.toLowerCase();

    // Detect section headers
    if (
      lowerLine.includes("## movies") ||
      lowerLine.includes("## films") ||
      lowerLine === "movies:"
    ) {
      currentSection = "movies";
      continue;
    } else if (
      lowerLine.includes("## web shows") ||
      lowerLine.includes("## shows") ||
      lowerLine.includes("## tv") ||
      lowerLine === "web shows:"
    ) {
      currentSection = "webShows";
      continue;
    } else if (
      lowerLine.includes("## anime") ||
      lowerLine.includes("## animes") ||
      lowerLine === "anime:"
    ) {
      currentSection = "animes";
      continue;
    } else if (
      lowerLine.includes("## gallery") ||
      lowerLine.includes("## images") ||
      lowerLine === "gallery:"
    ) {
      currentSection = "gallery";
      continue;
    }

    // Handle Gallery Images (look for ![])
    if (currentSection === "gallery") {
      const imageMatch = line.match(/!\[.*?\]\((.*?)\)/);
      if (imageMatch) {
        data.gallery.push(imageMatch[1].trim());
      }
      continue;
    }

    // Handle List Items
    const listMatch = line.match(/^[\s]*[-*+]\s+(.+)$/);
    if (listMatch) {
      const content = listMatch[1].trim();

      // Skip if it looks like a header (##)
      if (content.startsWith("#")) {
        continue;
      }

      const item: CinemaItem = { title: content };

      // Try to extract title and description
      const parts = content.split(/[-–—]/);
      if (parts.length >= 2) {
        item.title = parts[0].trim();
        item.description = parts.slice(1).join("-").trim();
      }

      if (currentSection === "movies") {
        data.movies.push(item);
      } else if (currentSection === "webShows") {
        data.webShows.push(item);
      } else if (currentSection === "animes") {
        data.animes.push(item);
      }
    }
  }

  return data;
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
