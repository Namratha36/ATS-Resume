require('dotenv').config();
const connectDB = require('./src/config/database');
const app = require('./src/app');
const {invokeGeminiAi} = require('./src/services/ai.service');

invokeGeminiAi();

connectDB().then(() => {
  app.listen(3000, () => {
    console.log('Server is running on port 3000');
  });
}).catch(err => {
  console.error('Failed to start server due to DB connection error', err);
});