const {Router} = require('express');
const authController = require('../controllers/auth.controller');
const authMiddleware = require('../middlewares/auth.middleware');

const authRoutes = Router();

/**
 * @route POST /api/auth/register
 * @desc Register a new user
 * @access Public
 */

authRoutes.post('/register', authController.registerUserController);

/**
 * @route POST /api/auth/login
 * @description login user with email and password
 * @access Public
 */

authRoutes.post("/login",authController.loginUserController);


/**
 * @route GET /api/auth/logout
 * @description clear the token from user cookie and add the token in blacklist
 * @access Public
 */

authRoutes.get("/logout", authController.logoutUserController);

/**
 * @route GET /api/auth/get-me
 * @description get the current logged-in user
 * @access Private
 */
authRoutes.get("/get-me", authMiddleware.authUser,authController.getMeController);



module.exports = authRoutes;