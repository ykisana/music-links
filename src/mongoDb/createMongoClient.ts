import { MongoClient } from "mongodb";

export function createMongoClient(): MongoClient {
  const mongoClient = new MongoClient(
    process.env.MONGO_CONNECTION_STRING as string
  );
  return mongoClient;
}
