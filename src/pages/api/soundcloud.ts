import type { APIRoute } from "astro";

export const prerender = false;

// Simple in-memory cache for the token
let _accessToken: string | null = null;
let _tokenExpiresAt: number = 0;

/**
 * Get SoundCloud OAuth Access Token using Client Credentials Flow
 */
async function getAccessToken() {
  const SC_CLIENT_ID = import.meta.env.SC_CLIENT_ID;
  const SC_CLIENT_SECRET = import.meta.env.SC_CLIENT_SECRET;

  if (!SC_CLIENT_ID || !SC_CLIENT_SECRET) {
    throw new Error("Missing SoundCloud Credentials in .env");
  }

  if (_accessToken && Date.now() < _tokenExpiresAt) {
    return _accessToken;
  }

  const tokenUrl = "https://secure.soundcloud.com/oauth/token";
  const credentials = btoa(`${SC_CLIENT_ID}:${SC_CLIENT_SECRET}`);
  
  const params = new URLSearchParams();
  params.append("grant_type", "client_credentials");

  const response = await fetch(tokenUrl, {
    method: "POST",
    headers: {
      "Authorization": `Basic ${credentials}`,
      "Content-Type": "application/x-www-form-urlencoded",
      "Accept": "application/json; charset=utf-8"
    },
    body: params,
  });

  if (!response.ok) {
    const errorText = await response.text();
    console.error("SoundCloud Token Error:", errorText);
    throw new Error(`Failed to obtain access token: ${response.status} ${response.statusText}`);
  }

  const data = await response.json();
  _accessToken = data.access_token;
  _tokenExpiresAt = Date.now() + (data.expires_in * 1000) - 60000;
  return _accessToken;
}

export const GET: APIRoute = async ({ url }) => {
  const searchParams = url.searchParams;
  const username = searchParams.get("username");
  const sort = searchParams.get("sort"); // 'popular' | 'recent'

  if (!username) {
    return new Response(JSON.stringify({ error: "Username is required" }), {
      status: 400,
      headers: { "Content-Type": "application/json" },
    });
  }

  try {
    const accessToken = await getAccessToken();
    const authHeaders = {
      "Authorization": `OAuth ${accessToken}`,
      "Accept": "application/json; charset=utf-8"
    };

    // 1. Resolve User ID
    const resolveUrl = `https://api.soundcloud.com/resolve?url=https://soundcloud.com/${username}`;
    const resolveResponse = await fetch(resolveUrl, { headers: authHeaders });

    if (!resolveResponse.ok) {
      return new Response(
        JSON.stringify({ error: `Failed to resolve user: ${username}` }),
        { status: 404, headers: { "Content-Type": "application/json" } }
      );
    } 

    const userData = await resolveResponse.json();
    const userId = userData.id;

    // 2. Fetch Favorites using legacy V1 endpoint or V2 fallback
    // We fetch a larger limit if sorting by popular to get a good sample
    const limit = sort === "popular" ? 50 : 20;
    const favoritesUrl = `https://api.soundcloud.com/users/${userId}/favorites?limit=${limit}`;
    let likesResponse = await fetch(favoritesUrl, { headers: authHeaders });
    let likesData: any = null;

    if (!likesResponse.ok) {
        console.warn(`V1 Favorites failed, trying V2...`);
        const v2Url = `https://api-v2.soundcloud.com/users/${userId}/likes?limit=${limit}`;
        likesResponse = await fetch(v2Url, { headers: authHeaders });
        
        if (!likesResponse.ok) {
             return new Response(JSON.stringify({ error: "Failed to fetch likes" }), { status: likesResponse.status });
        }
        const v2Data = await likesResponse.json();
        // V2 Structure normalization
        likesData = v2Data.collection.map((item: any) => item.track || item);
    } else {
        likesData = await likesResponse.json();
    }

    // 3. Normalize to Activity format
    // Ensure we have an array of tracks/activities
    const rawTracks = Array.isArray(likesData) ? likesData : [];
    
    let activities = rawTracks.map((item: any) => ({
      type: "track-like",
      created_at: item.created_at || new Date().toISOString(),
      origin: item.kind === 'track' ? item : (item.track || item) 
    })).filter((act: any) => act.origin && act.origin.title);

    // 4. Handle Sorting
    if (sort === "popular") {
        activities.sort((a: any, b: any) => {
            const countA = a.origin.playback_count || 0;
            const countB = b.origin.playback_count || 0;
            return countB - countA;
        });
    }

    // Return top 20 after sorting
    const finalActivities = activities.slice(0, 20);

    return new Response(JSON.stringify(finalActivities), {
      status: 200,
      headers: {
        "Content-Type": "application/json",
        "Cache-Control": "public, max-age=3600",
      },
    });

  } catch (error: any) {
    console.error("Server Error in SoundCloud API:", error);
    return new Response(JSON.stringify({ error: error.message || "Internal Server Error" }), {
      status: 500,
      headers: { "Content-Type": "application/json" },
    });
  }
};
