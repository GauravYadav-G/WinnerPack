import mongoose from "mongoose";

// Module-level singleton (no global.mongoose needed — Express does not hot-reload)
let conn: typeof mongoose | null = null;
let promise: Promise<typeof mongoose> | null = null;

export async function connectDB() {
  if (conn) {
    return conn;
  }

  if (!promise) {
    const mongodbUri = process.env.MONGODB_URI || "mongodb://localhost:27017/winnerpack";
    const opts = {
      bufferCommands: false,
      serverSelectionTimeoutMS: 3000, // Timeout after 3s if DB is unreachable
      connectTimeoutMS: 3000,         // Timeout after 3s during initial connection
    };
    promise = mongoose.connect(mongodbUri, opts).then((m) => m);
  }

  try {
    conn = await promise;
  } catch (e) {
    promise = null; // reset so next call retries
    throw e;
  }

  return conn;
}
