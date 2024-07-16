import dotenv from "dotenv";
import { MongoClient } from "mongodb";
import { addAppleMusicLinks } from "@services/addAppleMusicLinks";
import { getStreamingReleasesFromSpotify } from "@services/getStreamingReleasesFromSpotify";
import { getSpotifyArtistIds } from "@database/getSpotifyArtistIds";

dotenv.config();

async function run() {
  const mongoClient = new MongoClient(
    process.env.MONGO_CONNECTION_STRING as string
  );

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
