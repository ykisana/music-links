import { StreamingRelease } from "../StreamingRelease";

export async function getSpotifyLinksAndData(spotifyArtistIds: string[]) {
  const accessToken = await getSpotifyAccesToken();
  const authHeader = getAuthHeader(accessToken);
  const streamingReleases: StreamingRelease[] = [];

  for (const artistId of spotifyArtistIds) {
    const releases = await getReleasesForArtist(artistId, authHeader);
    for (const release of releases) {
      const upc = await getUPCForRelease(release.id, authHeader);

      const streamingRelease: StreamingRelease = { upc: upc };
      streamingRelease.spotifyAlbumArtLink = release.images[0].url;
      streamingRelease.spotifyStreamingLink = release.external_urls.spotify;

      streamingReleases.push(streamingRelease);
    }
  }

  return streamingReleases;
}

async function getReleasesForArtist(artistId: string, authHeader: Headers) {
  const url = `https://api.spotify.com/v1/artists/${artistId}/albums`;

  try {
    const response = await fetch(url, { method: "GET", headers: authHeader });
    const data = await response.json();
    return data.items;
  } catch {
    console.log(`Failed to get releases for ${artistId}`);
  }
}

async function getUPCForRelease(releaseId: string, authHeader: Headers) {
  const url = `https://api.spotify.com/v1/albums/${releaseId}`;

  try {
    const response = await fetch(url, { method: "GET", headers: authHeader });
    const data = await response.json();
    return data.external_ids.upc;
  } catch {
    console.log(`Failed to get upc for ${releaseId}`);
  }
}

async function getSpotifyAccesToken() {
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

function getAuthHeader(accessToken: string) {
  const headers = new Headers();
  headers.append("Authorization", "Bearer " + accessToken);
  return headers;
}
