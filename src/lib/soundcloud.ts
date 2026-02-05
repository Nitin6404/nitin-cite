// SoundCloud API integration

export interface SoundCloudTrack {
  id: number;
  title: string;
  permalink_url: string;
  artwork_url: string | null;
  user: {
    username: string;
    avatar_url: string;
  };
  playback_count?: number;
  favoritings_count?: number;
}

export interface SoundCloudActivity {
  type: "track-like" | "track-repost" | "track";
  created_at: string;
  origin: SoundCloudTrack;
}

/**
 * Fetch recent activity (likes, reposts) from a SoundCloud user.
 * This calls our own server-side API proxy to avoid CORS issues.
 */
export async function fetchSoundCloudActivity(
  username: string
): Promise<SoundCloudActivity[]> {
  try {
    // Call our internal API endpoint
    // We use a relative URL so it works in both dev and prod
    const response = await fetch(`/api/soundcloud?username=${username}`);

    if (!response.ok) {
      throw new Error(`API Error: ${response.statusText}`);
    }

    const data = await response.json();
    return data;
  } catch (error) {
    console.error("Error fetching SoundCloud activity:", error);
    return getMockData();
  }
}

function getMockData(): SoundCloudActivity[] {
  return [
    {
      type: "track-like",
      created_at: new Date().toISOString(),
      origin: {
        id: 1,
        title: "Mock Song 1 - Ambient Mix (API Fallback)",
        permalink_url: "https://soundcloud.com/",
        artwork_url: "https://picsum.photos/200",
        user: {
          username: "AmbientArtist",
          avatar_url: "https://picsum.photos/50",
        },
        playback_count: 12500,
        favoritings_count: 340,
      },
    },
    {
      type: "track-repost",
      created_at: new Date(Date.now() - 86400000).toISOString(),
      origin: {
        id: 2,
        title: "lofi hip hop beats to code/relax to (API Fallback)",
        permalink_url: "https://soundcloud.com/",
        artwork_url: "https://picsum.photos/201",
        user: {
          username: "LofiGirl",
          avatar_url: "https://picsum.photos/51",
        },
        playback_count: 500000,
        favoritings_count: 12000,
      },
    },
  ];
}
