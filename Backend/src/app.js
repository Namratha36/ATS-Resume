const express = require('express');
const cookieParser = require('cookie-parser');


const app = express();

app.use(express.json());
app.use(cookieParser());


// require all the routes here
const authRouter = require('./routes/auth.routes');


// using all the routes here
app.use('/api/auth', authRouter);


/**
 * @route POST /api/auth/register
 * @desc Register a new user
 * @access Public
 */

authRouter

module.exports = app;