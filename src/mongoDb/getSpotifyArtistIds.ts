import { MongoClient } from "mongodb";

interface Artist {
  _id: string;
  spotifyArtistId: string;
}

export async function getSpotifyArtistIds(mongoClient: MongoClient) {
  try {
    const database = mongoClient.db(process.env.MONGO_DATABASE_NAME);
    const collection = database.collection<Artist>(
      process.env.MONGO_ARTIST_ID_COLLECTION_NAME!
    );

    const documents = await collection.find().toArray();

    const spotifyIds: string[] = documents.map(
      (document) => document.spotifyArtistId
    );
    return spotifyIds;
  } catch {
    throw new Error("Failed to get Spotify Artist Ids from MongoDB");
  }
}
