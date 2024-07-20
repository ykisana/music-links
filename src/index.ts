import dotenv from "dotenv";
import { addAppleMusicLinks } from "@services/addAppleMusicLinks";
import { getStreamingReleasesFromSpotify } from "@services/getStreamingReleasesFromSpotify";
import { createMongoClient } from "@mongoDb/createMongoClient";
import { getSpotifyArtistIds } from "@mongoDb/getSpotifyArtistIds";
import { uploadStreamingReleases } from "@mongoDb/uploadStreamingReleases";

dotenv.config();

async function run() {
  const mongoClient = createMongoClient();
  const database = mongoClient.db(process.env.MONGO_DATABASE_NAME);
  try {
    const spotifyArtistIds = await getSpotifyArtistIds(database);
    var streamingReleases = await getStreamingReleasesFromSpotify(
      spotifyArtistIds
    );
    await addAppleMusicLinks(streamingReleases);
    await uploadStreamingReleases(database, streamingReleases);
  } finally {
    mongoClient.close();
  }
}

run().catch(console.dir);
