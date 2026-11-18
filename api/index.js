const app = require("../Backend/src/app");
const connectDB = require("../Backend/src/config/database");

let isConnected = false;

module.exports = async (req, res) => {
  if (!isConnected) {
    try {
      await connectDB();
      isConnected = true;
    } catch (err) {
      console.error("Database initialization error:", err);
    }
  }
  return app(req, res);
};
