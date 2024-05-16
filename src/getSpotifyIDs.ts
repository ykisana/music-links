import { MongoClient } from "mongodb";
import { isModuleNamespaceObject } from "util/types";

export async function getSpotifyIds(mongoClient: MongoClient) {
  try {
    const database = mongoClient.db("musicLinks");
    const collection = database.collection("spotifyids");
    const document = await collection.findOne({});

    if (document) {
      const spotifyIds: string[] = document.spotifyIds;
      return spotifyIds;
    } else {
      console.log("No document found");
      return [];
    }
  } catch {
    return [];
  }
}
