import dotenv from "dotenv";
import { MongoClient } from "mongodb";
import { getSpotifyIds } from "./getSpotifyIDs";
dotenv.config();

async function run() {
  const mongoClient = new MongoClient(
    process.env.MONGO_CONNECTION_STRING as string
  );

  try {
    getSpotifyIds(mongoClient);
  } finally {
    mongoClient.close();
  }
}

run().catch(console.dir);
