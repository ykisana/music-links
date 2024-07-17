import { MongoClient } from "mongodb";

interface Artist {
  _id: string;
  spotifyArtistId: string;
}

export async function getSpotifyArtistIds(mongoClient: MongoClient) {
  try {
    const database = mongoClient.db("musicLinks");
    const collection = database.collection<Artist>("spotifyids");

    const documents = await collection.find().toArray();

    const spotifyIds: string[] = documents.map(
      (document) => document.spotifyArtistId
    );
    return spotifyIds;
  } catch {
    throw new Error("Failed to get Spotify Artist Ids from MongoDB");
  }
}
