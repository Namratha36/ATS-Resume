const express = require('express');
const cookieParser = require('cookie-parser');
const cors = require('cors');

const app = express();

app.use(express.json());
app.use(cookieParser());
app.use(cors({
    origin: 'http://localhost:5173', // Update this to your frontend URL
    credentials: true, // Allow cookies to be sent with requests
}));


// require all the routes here
const authRouter = require('./routes/auth.routes');
const interviewRouter = require('./routes/interview.routes');


// using all the routes here
app.use('/api/auth', authRouter);
app.use('/api/interview', interviewRouter);


/**
 * @route POST /api/auth/register
 * @desc Register a new user
 * @access Public
 */

authRouter

module.exports = app;