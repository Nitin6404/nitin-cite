"use client";

import { useState, useEffect } from "react";
import {
  fetchGitHubReadme,
  parseMoviesFromReadme,
  parseMusicFromReadme,
} from "@/lib/github";

export default function CinemaPage() {
  const [activeTab, setActiveTab] = useState<"films" | "music">("films");
  const [movies, setMovies] = useState<
    Array<{ title: string; description?: string }>
  >([]);
  const [songs, setSongs] = useState<Array<{ title: string; link: string }>>(
    []
  );
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchData = async () => {
      try {
        setLoading(true);

        // Fetch movies from your movies README
        const moviesReadme = await fetchGitHubReadme(
          "nitin6404",
          "movies-list"
        );
        const parsedMovies = parseMoviesFromReadme(moviesReadme);
        setMovies(parsedMovies);

        // Fetch music from your music README or SoundCloud
        const musicReadme = await fetchGitHubReadme(
          "nitin6404",
          "music-playlist"
        );
        const parsedSongs = parseMusicFromReadme(musicReadme);
        setSongs(parsedSongs);
      } catch (error) {
        console.error("Error fetching data:", error);
        // Fallback to empty arrays if GitHub fetch fails
        setMovies([]);
        setSongs([]);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, []);

  return (
    <div className="w-full space-y-6">
      {/* Tabs */}
      <div className="flex gap-6 border-b border-muted-foreground/10 pb-2">
        <button
          onClick={() => setActiveTab("films")}
          className={` transition-colors ${
            activeTab === "films"
              ? "text-foreground"
              : "text-muted-foreground hover:text-foreground"
          }`}
          type="button"
        >
          films
        </button>
        <button
          onClick={() => setActiveTab("music")}
          className={` transition-colors ${
            activeTab === "music"
              ? "text-foreground"
              : "text-muted-foreground hover:text-foreground"
          }`}
          type="button"
        >
          music
        </button>
      </div>

      {/* Films */}
      {activeTab === "films" && (
        <>
          {loading ? (
            <div className="columns-1 sm:columns-2 gap-6 space-y-4">
              <p className="text-muted-foreground">
                Loading movies from GitHub...
              </p>
            </div>
          ) : movies.length === 0 ? (
            <div className="columns-1 sm:columns-2 gap-6 space-y-4">
              <p className="text-muted-foreground">
                No movies found. Create a <code>movies-list</code> repository
                with a README.md containing your movie list.
              </p>
            </div>
          ) : (
            <div className="columns-1 sm:columns-2 gap-6 space-y-4">
              {movies.map((movie, index) => (
                <div
                  key={movie.title}
                  className="break-inside-avoid mb-4 space-y-1"
                  style={{
                    animationDelay: `${index * 50}ms`,
                  }}
                >
                  <h3 className="text-foreground font-normal mb-1">
                    {movie.title}
                  </h3>
                  {movie.description && (
                    <p className="text-muted-foreground leading-relaxed">
                      {movie.description}
                    </p>
                  )}
                </div>
              ))}
            </div>
          )}
        </>
      )}

      {/* Music */}
      {activeTab === "music" && (
        <>
          {loading ? (
            <div className="columns-1 sm:columns-2 lg:columns-3 gap-6 space-y-4">
              <p className="text-muted-foreground">
                Loading music from GitHub...
              </p>
            </div>
          ) : songs.length === 0 ? (
            <div className="columns-1 sm:columns-2 lg:columns-3 gap-6 space-y-4">
              <p className="text-muted-foreground">
                No music found. Create a <code>music-playlist</code> repository
                with a README.md containing your music links.
              </p>
            </div>
          ) : (
            <div className="columns-1 sm:columns-2 lg:columns-3 gap-6 space-y-4">
              {songs.map((song, index) => (
                <a
                  key={song.title}
                  href={song.link}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="block break-inside-avoid mb-3 text-muted-foreground hover:text-foreground transition-colors"
                  style={{
                    animationDelay: `${index * 30}ms`,
                  }}
                >
                  {song.title}
                </a>
              ))}
            </div>
          )}
        </>
      )}
    </div>
  );
}
