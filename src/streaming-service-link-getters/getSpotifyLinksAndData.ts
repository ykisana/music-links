import { StreamingRelease } from "../StreamingRelease";

export async function getSpotifyLinksAndData(spotifyArtistIds: string[]) {
  const accessToken = await getSpotifyAccesToken();
  const streamingReleases: StreamingRelease[] = [];
  spotifyArtistIds.forEach(async (artistId) => {
    const releases = await getReleasesForArtist(artistId, accessToken);
    releases.forEach((release: any) => {
      const streamingRelease: StreamingRelease = {};
      streamingRelease.spotifyId = release.id;
      streamingRelease.spotifyAlbumArtLink = release.images[0].url;
      streamingRelease.spotifyStreamingLink = release.external_urls.spotify;
      streamingReleases.push(release);
    });
  });

  return streamingReleases;
}

async function getReleasesForArtist(artistId: string, accessToken: string) {
  const url = `https://api.spotify.com/v1/artists/${artistId}/albums`;
  const headers = new Headers();
  headers.append("Authorization", "Bearer " + accessToken);

  try {
    const response = await fetch(url, { method: "GET", headers: headers });
    const data = await response.json();
    return data.items;
  } catch {
    console.log(`Failed to get releases for ${artistId}`);
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
