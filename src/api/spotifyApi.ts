export async function fetchSpotifyAccessToken() {
  const url = "https://accounts.spotify.com/api/token";
  const params = new URLSearchParams();

  params.append("grant_type", "client_credentials");

  const headers = new Headers();
  headers.append(
    "Authorization",
    "Basic " +
      btoa(
        `${process.env.SPOTIFY_CLIENT_ID}:${process.env.SPOTIFY_CLIENT_SECRET}`
      )
  );
  headers.append("Content-Type", "application/x-www-form-urlencoded");

  const response = await fetch(url, {
    method: "POST",
    headers: headers,
    body: params.toString(),
  });

  if (!response.ok) {
    throw new Error("Failed to get Spotify Access Token");
  }

  const data = await response.json();
  return data.access_token;
}

export async function fetchReleaseUPC(releaseId: string, authHeader: Headers) {
  const url = `https://api.spotify.com/v1/albums/${releaseId}`;

  try {
    const response = await fetch(url, { method: "GET", headers: authHeader });
    const data = await response.json();
    return data.external_ids.upc;
  } catch {
    console.log(`Failed to get upc for ${releaseId}`);
  }
}

export async function fetchArtistReleases(
  artistId: string,
  authHeader: Headers
) {
  const url = `https://api.spotify.com/v1/artists/${artistId}/albums`;

  try {
    const response = await fetch(url, { method: "GET", headers: authHeader });
    const data = await response.json();
    return data.items;
  } catch {
    console.log(`Failed to get releases for ${artistId}`);
  }
}
