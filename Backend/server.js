require("dotenv").config();
const connectDB = require("./src/config/database");
const app = require("./src/app");

const PORT = process.env.PORT || 3000;

connectDB()
  .then(() => {
    app.listen(PORT, () => {
      console.log(`Server is running on port ${PORT}`);
    });
  })
  .catch((err) => {
    console.error("Failed to start server due to DB connection error", err);
  });

module.exports = app;
