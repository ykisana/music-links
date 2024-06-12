import { MongoClient } from "mongodb";

export async function getSpotifyIds(mongoClient: MongoClient) {
  try {
    const database = mongoClient.db("musicLinks");
    const collection = database.collection("spotifyids");

    const document = await collection.findOne({});

    const spotifyIds: string[] = document?.spotifyIds;
    return spotifyIds;
  } catch {
    throw new Error("Failed to get Spotify Artist Ids from MongoDB");
  }
}
