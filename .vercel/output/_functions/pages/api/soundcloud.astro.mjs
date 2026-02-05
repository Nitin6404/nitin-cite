export { renderers } from '../../renderers.mjs';

const prerender = false;
let _accessToken = null;
let _tokenExpiresAt = 0;
async function getAccessToken() {
  const SC_CLIENT_ID = "7yo1os6ejx56c3uIzoow4ptn0JIW7ASG";
  const SC_CLIENT_SECRET = "gJ8P7Bl7o5BBMGWRDNZv6i9z3JyAr4YH";
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
    body: params
  });
  if (!response.ok) {
    const errorText = await response.text();
    console.error("SoundCloud Token Error:", errorText);
    throw new Error(`Failed to obtain access token: ${response.status} ${response.statusText}`);
  }
  const data = await response.json();
  _accessToken = data.access_token;
  _tokenExpiresAt = Date.now() + data.expires_in * 1e3 - 6e4;
  return _accessToken;
}
const GET = async ({ url }) => {
  const searchParams = url.searchParams;
  const username = searchParams.get("username");
  const sort = searchParams.get("sort");
  if (!username) {
    return new Response(JSON.stringify({ error: "Username is required" }), {
      status: 400,
      headers: { "Content-Type": "application/json" }
    });
  }
  try {
    const accessToken = await getAccessToken();
    const authHeaders = {
      "Authorization": `OAuth ${accessToken}`,
      "Accept": "application/json; charset=utf-8"
    };
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
    const limit = sort === "popular" ? 50 : 20;
    const favoritesUrl = `https://api.soundcloud.com/users/${userId}/favorites?limit=${limit}`;
    let likesResponse = await fetch(favoritesUrl, { headers: authHeaders });
    let likesData = null;
    if (!likesResponse.ok) {
      console.warn(`V1 Favorites failed, trying V2...`);
      const v2Url = `https://api-v2.soundcloud.com/users/${userId}/likes?limit=${limit}`;
      likesResponse = await fetch(v2Url, { headers: authHeaders });
      if (!likesResponse.ok) {
        return new Response(JSON.stringify({ error: "Failed to fetch likes" }), { status: likesResponse.status });
      }
      const v2Data = await likesResponse.json();
      likesData = v2Data.collection.map((item) => item.track || item);
    } else {
      likesData = await likesResponse.json();
    }
    const rawTracks = Array.isArray(likesData) ? likesData : [];
    let activities = rawTracks.map((item) => ({
      type: "track-like",
      created_at: item.created_at || (/* @__PURE__ */ new Date()).toISOString(),
      origin: item.kind === "track" ? item : item.track || item
    })).filter((act) => act.origin && act.origin.title);
    if (sort === "popular") {
      activities.sort((a, b) => {
        const countA = a.origin.playback_count || 0;
        const countB = b.origin.playback_count || 0;
        return countB - countA;
      });
    }
    const finalActivities = activities.slice(0, 20);
    return new Response(JSON.stringify(finalActivities), {
      status: 200,
      headers: {
        "Content-Type": "application/json",
        "Cache-Control": "public, max-age=3600"
      }
    });
  } catch (error) {
    console.error("Server Error in SoundCloud API:", error);
    return new Response(JSON.stringify({ error: error.message || "Internal Server Error" }), {
      status: 500,
      headers: { "Content-Type": "application/json" }
    });
  }
};

const _page = /*#__PURE__*/Object.freeze(/*#__PURE__*/Object.defineProperty({
  __proto__: null,
  GET,
  prerender
}, Symbol.toStringTag, { value: 'Module' }));

const page = () => _page;

export { page };
