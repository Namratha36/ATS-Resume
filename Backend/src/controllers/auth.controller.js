const userModel = require('../models/user.model');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const tokenBlacklistModel = require('../models/blacklist.model');

/**
 * @name registerUserController
 * @desc Register a new user,expects username,email and password in the request body
 * @access Public
 */

async function registerUserController(req, res) {
    const { username, email, password } = req.body;

    if (!username || !email || !password) {
        return res.status(400).json({ message: 'Please provide username, email and password' });
    }

    const isUserAlreadyExist = await userModel.findOne({ $or: [{ username }, { email }] });

    if (isUserAlreadyExist) {

        return res.status(400).json({ message: 'Username or email already taken' });
    }

    // Hash the password before saving it to the database
    const hash = await bcrypt.hash(password, 10);

    // Create a new user instance
    const user = await userModel.create({
        username,
        email,
        password: hash
    });
    
    const token = jwt.sign({ id: user._id , username: user.username}, process.env.JWT_SECRET, { expiresIn: '1d' });
   
    res.cookie("token", token)

    res.status(201).json({ message: 'User registered successfully', 
        user:{
        id: user._id,
        username: user.username,
        email: user.email,
    }
     });
    
}


/**
 * @name loginUserController
 * @desc Login a user, expects email and password in the request body
 * @access Public
 */

    async function loginUserController(req, res) {
        const { email, password } = req.body;

        const user = await userModel.findOne({email});

        if(!user){
            return res.status(400).json({message:"Invalid email or password"});
        }

        const isPasswordValid = await bcrypt.compare(password, user.password);

        if(!isPasswordValid){
            return res.status(400).json({message:"Invalid email or password"});
        }

        const token = jwt.sign({ id: user._id , username: user.username}, process.env.JWT_SECRET, { expiresIn: '1d' });
        res.cookie("token", token);

        res.status(200).json({ message: 'Login successful', 
            user:{
                id:user._id,
                username:user.username,
                email:user.email
            }
         });
    }

/**
 * @name logoutUserController
 * @desc Logout a user, clear the token from user cookie and add the token in blacklist
 * @access Public
 */
async function logoutUserController(req, res) {
    const token = req.cookies.token;

    if (token) {
        // Add the token to the blacklist
        await tokenBlacklistModel.create({ token });

        // Clear the token from the user's cookie
        res.clearCookie("token");
    }

    res.status(200).json({ message: 'Logout successful' });
}

/**
 * @name getMeController
 * @desc Get the current logged-in user, expects token in the request cookie
 * @access Private
 */

async function getMeController(req, res) {
    const user = await userModel.findById(req.user.id);

    res.status(200).json({
        message: 'User fetched successfully',
        id: user._id,
        username: user.username,
        email: user.email
    });
}

module.exports = {
    registerUserController,
    loginUserController,
    getMeController,
    logoutUserController
}