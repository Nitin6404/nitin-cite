export const TMDB_API_BASE = "https://api.themoviedb.org/3";
export const TMDB_IMAGE_BASE = "https://image.tmdb.org/t/p/w500";

const TMDB_API_KEY = import.meta.env.TMDB_API_KEY;

type MediaType = "movie" | "tv";

interface TMDBResult {
  id: number;
  poster_path: string | null;
  backdrop_path: string | null;
  title?: string;
  name?: string;
  release_date?: string;
  first_air_date?: string;
}

interface TMDBResponse {
  results: TMDBResult[];
}

/**
 * Searches for a movie or TV show on TMDB and returns the poster URL.
 * @param title The title to search for.
 * @param type The type of media to search for ('movie' or 'tv').
 * @returns The full URL of the poster image, or null if not found/error.
 */
export async function getMovieImage(
  title: string,
  type: MediaType = "movie"
): Promise<string | null> {
  if (!TMDB_API_KEY) {
    console.warn("TMDB_API_KEY is not set in environment variables.");
    return null;
  }

  try {
    const url = `${TMDB_API_BASE}/search/${type}?api_key=${TMDB_API_KEY}&query=${encodeURIComponent(
      title
    )}&include_adult=false&language=en-US&page=1`;

    const controller = new AbortController();
    const timeoutId = setTimeout(() => controller.abort(), 3000); // 3-second timeout

    const response = await fetch(url, { signal: controller.signal });
    clearTimeout(timeoutId);

    if (!response.ok) {
      console.error(
        `TMDB API Error: ${response.status} ${response.statusText} for title "${title}"`
      );
      return null;
    }

    const data: TMDBResponse = await response.json();

    if (data.results && data.results.length > 0) {
      // Prefer the first result
      const bestMatch = data.results[0];
      if (bestMatch.poster_path) {
        return `${TMDB_IMAGE_BASE}${bestMatch.poster_path}`;
      }
    }

    // console.log(`No results found on TMDB for: ${title} (${type})`);
    return null;
  } catch (error) {
    console.error(`Error fetching from TMDB for title "${title}":`, error);
    return null;
  }
}
