import type { APIRoute } from "astro";

const SC_CLIENT_ID = "7yo1os6ejx56c3uIzoow4ptn0JIW7ASG";

export const GET: APIRoute = async ({ request }) => {
  const url = new URL(request.url);
  const username = url.searchParams.get("username");

  if (!username) {
    return new Response(JSON.stringify({ error: "Username is required" }), {
      status: 400,
      headers: { "Content-Type": "application/json" },
    });
  }

  try {
    // 1. Resolve User ID
    const resolveUrl = `https://api-v2.soundcloud.com/resolve?url=https://soundcloud.com/${username}&client_id=${SC_CLIENT_ID}`;
    const resolveResponse = await fetch(resolveUrl);

    if (!resolveResponse.ok) {
      return new Response(
        JSON.stringify({ error: `Failed to resolve user: ${username}` }),
        { status: 404, headers: { "Content-Type": "application/json" } }
      );
    }

    const userData = await resolveResponse.json();
    const userId = userData.id;

    // 2. Fetch Likes
    const likesUrl = `https://api-v2.soundcloud.com/users/${userId}/likes?client_id=${SC_CLIENT_ID}&limit=20`;
    const likesResponse = await fetch(likesUrl);

    if (!likesResponse.ok) {
      return new Response(
        JSON.stringify({
          error: `Failed to fetch likes: ${likesResponse.statusText}`,
        }),
        {
          status: likesResponse.status,
          headers: { "Content-Type": "application/json" },
        }
      );
    }

    const likesData = await likesResponse.json();

    // 3. Normalize Data
    const activities = likesData.collection.map((item: any) => ({
      type: "track-like",
      created_at: item.created_at || new Date().toISOString(),
      origin: item.track || item,
    }));

    const validActivities = activities.filter(
      (act: any) => act.origin && act.origin.title
    );

    return new Response(JSON.stringify(validActivities), {
      status: 200,
      headers: {
        "Content-Type": "application/json",
        // Cache for 1 hour to avoid hitting rate limits
        "Cache-Control": "public, max-age=3600",
      },
    });
  } catch (error) {
    console.error("Server Error in SoundCloud API:", error);
    return new Response(JSON.stringify({ error: "Internal Server Error" }), {
      status: 500,
      headers: { "Content-Type": "application/json" },
    });
  }
};
