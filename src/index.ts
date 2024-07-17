import dotenv from "dotenv";
import { addAppleMusicLinks } from "@services/addAppleMusicLinks";
import { getStreamingReleasesFromSpotify } from "@services/getStreamingReleasesFromSpotify";
import { getSpotifyArtistIds } from "@mongoDb/getSpotifyArtistIds";
import { createMongoClient } from "@mongoDb/createMongoClient";

dotenv.config();

async function run() {
  const mongoClient = createMongoClient();
  try {
    const spotifyArtistIds = await getSpotifyArtistIds(mongoClient);
    var streamingReleases = await getStreamingReleasesFromSpotify(
      spotifyArtistIds
    );
    await addAppleMusicLinks(streamingReleases);
    console.log(streamingReleases);
  } finally {
    mongoClient.close();
  }
}

run().catch(console.dir);
