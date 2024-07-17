import uniqBy from "lodash/unionBy";
import {
  fetchArtistReleases,
  fetchReleaseUPC,
  fetchSpotifyAccessToken,
  SpotifyRelease,
} from "@api/spotifyApi";
import { createAuthHeader } from "@utils/createAuthHeader";
import { StreamingRelease } from "models/StreamingRelease";

export async function getStreamingReleasesFromSpotify(
  spotifyArtistIds: string[]
) {
  const accessToken = await fetchSpotifyAccessToken();
  const authHeader = createAuthHeader(accessToken);

  const streamingReleases = await fetchStreamingReleases(
    spotifyArtistIds,
    authHeader
  );

  return streamingReleases;
}

async function fetchStreamingReleases(
  spotifyArtistIds: string[],
  authHeader: any
): Promise<any[]> {
  const releasePromises = spotifyArtistIds.map((artistId) =>
    fetchArtistReleases(artistId, authHeader)
  );
  const allReleases = await Promise.all(releasePromises);
  const uniqueReleases = uniqBy(allReleases.flat(), "id");

  const streamingReleasePromises = uniqueReleases.map(async (release) =>
    createStreamingRelease(release, authHeader)
  );

  return Promise.all(streamingReleasePromises);
}

async function createStreamingRelease(
  release: SpotifyRelease,
  authHeader: Headers
) {
  const upcPromise = fetchReleaseUPC(release.id, authHeader);
  const upc = await upcPromise;
  const artists: string[] = release.artists.map((artist) => artist.name);
  return {
    upc,
    artists: artists,
    releaseDate: new Date(release.release_date),
    title: release.name,
    spotifyAlbumArtLink: release.images[0].url,
    spotifyStreamingLink: release.external_urls.spotify,
    uuid: release.id,
  } as StreamingRelease;
}
