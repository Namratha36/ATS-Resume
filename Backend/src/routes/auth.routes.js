const { Router } = require("express");
const authController = require("../controllers/auth.controller");
const authMiddleware = require("../middlewares/auth.middleware");

const authRoutes = Router();

/**
 * @route POST /api/auth/register
 * @desc Register a new user
 * @access Public
 */
authRoutes.post("/register", authController.registerUserController);

/**
 * @route POST /api/auth/login
 * @desc Login user with email and password
 * @access Public
 */
authRoutes.post("/login", authController.loginUserController);

/**
 * @route POST /api/auth/guest
 * @desc Initialize an isolated guest user session
 * @access Public
 */
authRoutes.post("/guest", authController.guestLoginController);

/**
 * @route GET /api/auth/logout
 * @desc Logout user, clear token cookie and blacklist token
 * @access Public
 */
authRoutes.get("/logout", authController.logoutUserController);

/**
 * @route GET /api/auth/get-me
 * @desc Get current logged-in user profile
 * @access Private
 */
authRoutes.get("/get-me", authMiddleware.authUser, authController.getMeController);

module.exports = authRoutes;
