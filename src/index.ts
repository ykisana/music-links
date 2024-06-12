import dotenv from "dotenv";
import { MongoClient } from "mongodb";
import { getSpotifyIds } from "./getSpotifyIDs";
import { getSpotifyLinksAndData } from "./streaming-service-link-getters/getSpotifyLinksAndData";

dotenv.config();

async function run() {
  const mongoClient = new MongoClient(
    process.env.MONGO_CONNECTION_STRING as string
  );

  try {
    const spotifyArtistIds = await getSpotifyIds(mongoClient);
    const spotifyData = getSpotifyLinksAndData(spotifyArtistIds);
  } finally {
    mongoClient.close();
  }
}

run().catch(console.dir);
