import mongoose from "mongoose";

const MONGODB_URI = process.env.MONGODB_URI || "mongodb://localhost:27017/winnerpack";

interface MongooseCache {
  conn: typeof mongoose | null;
  promise: Promise<typeof mongoose> | null;
}

declare global {
  var mongoose: MongooseCache | undefined;
}

let cached = global.mongoose;

if (!cached) {
  cached = global.mongoose = { conn: null, promise: null };
}

export async function connectDB() {
  console.log("connectDB() called, URI =", MONGODB_URI);
  if (cached!.conn) {
    console.log("connectDB() returning cached connection");
    return cached!.conn;
  }

  if (!cached!.promise) {
    console.log("connectDB() initiating new connection promise");
    const opts = {
      bufferCommands: false,
      serverSelectionTimeoutMS: 3000, // Timeout after 3s if DB is unreachable
      connectTimeoutMS: 3000,         // Timeout after 3s during initial connection
    };

    cached!.promise = mongoose.connect(MONGODB_URI, opts).then((mongooseInstance) => {
      return mongooseInstance;
    });
  }

  try {
    cached!.conn = await cached!.promise;
  } catch (e) {
    cached!.promise = null;
    throw e;
  }

  return cached!.conn;
}
