// lib/mongodb.ts
import { MongoClient } from 'mongodb';

const uri = process.env.MONGODB_URI as string;
const dbName = process.env.MONGODB_DB as string;

let client: MongoClient;
let clientPromise: Promise<MongoClient>;

function getMongoEnv() {
  const mongodbUri = process.env.MONGODB_URI;
  if (!mongodbUri) {
    throw new Error('Please add your Mongo URI to .env.local');
  }
  const mongodbDb = process.env.MONGODB_DB;
  if (!mongodbDb) {
    throw new Error('Please add your Mongo DB Name to .env.local');
  }
  return {mongodbDb, mongodbUri};
}

const { mongodbDb, mongodbUri } = getMongoEnv();

const nodeEnv = (() => {
  return process.env.NODE_ENV || 'development';
})();

declare global {
  // Prevent multiple instances of MongoClient during hot reloading in dev
  var _mongoClientPromise: Promise<MongoClient> | undefined;
}

if (nodeEnv === 'development') {
  if (!global._mongoClientPromise) {
    client = new MongoClient(uri);
    global._mongoClientPromise = client.connect();
  }
  clientPromise = global._mongoClientPromise;
} else {
  client = new MongoClient(uri);
  clientPromise = client.connect();
}

export async function getMongoClient() {
  const client = await clientPromise;
  return client.db(dbName);
}
