const mongoose = require("mongoose");
const userModel = require("../models/user.model");
const interviewReportModel = require("../models/interviewReport.model");
const tokenBlacklistModel = require("../models/blacklist.model");
const { initDemoData, enableFallbackModels } = require("./inMemoryStore");

async function connectDB() {
  const mongoURI = process.env.MONGO_URI;

  if (mongoURI && mongoURI.startsWith("mongodb")) {
    try {
      console.log("Connecting to MongoDB...");
      await mongoose.connect(mongoURI, {
        serverSelectionTimeoutMS: 2500,
      });
      console.log("✅ Successfully connected to MongoDB database.");
      return;
    } catch (error) {
      console.warn("⚠️ MongoDB connection failed:", error.message);
    }
  }

  // Graceful fallback to zero-setup demo mode
  console.log("========================================================");
  console.log("ℹ️  MongoDB not detected / reachable.");
  console.log("🚀  Auto-activating Built-in Demo & In-Memory Storage Mode!");
  console.log("    (All features, demo accounts & reports work seamlessly)");
  console.log("========================================================");

  enableFallbackModels(userModel, interviewReportModel, tokenBlacklistModel);
  await initDemoData();
}

module.exports = connectDB;
