import dotenv from "dotenv";
import { MongoClient } from "mongodb";
import { getSpotifyIds } from "./getSpotifyIDs";
import { getSpotifyLinksAndData } from "./streaming-service-link-getters/getSpotifyLinksAndData";
import { getAppleMusicLinks } from "./streaming-service-link-getters/getAppleMusicLinks";

dotenv.config();

async function run() {
  const mongoClient = new MongoClient(
    process.env.MONGO_CONNECTION_STRING as string
  );

  try {
    const spotifyArtistIds = await getSpotifyIds(mongoClient);
    var streamingReleases = await getSpotifyLinksAndData(spotifyArtistIds);
    await getAppleMusicLinks(streamingReleases);
  } finally {
    mongoClient.close();
  }
}

run().catch(console.dir);
