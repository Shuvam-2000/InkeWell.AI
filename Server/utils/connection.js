import mongoose from "mongoose";

let isConnected = false; // Global flag to reuse connection

const connectDB = async () => {
  if (isConnected) {
    // Use existing connection
    return;
  }

  try {
    const mongo_url = process.env.MONGO_URL;

    if (!mongo_url) {
      throw new Error("❌ MONGO_URL environment variable not set");
    }

    const db = await mongoose.connect(mongo_url, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    });

    isConnected = db.connections[0].readyState === 1;
    console.log("✅ MongoDB Connected");
  } catch (err) {
    console.error("❌ MongoDB connection error:", err.message);
    throw err;
  }
};

// Immediately call connectDB
connectDB();

export default connectDB;
