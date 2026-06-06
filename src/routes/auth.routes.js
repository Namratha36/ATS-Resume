const {Router} = require('express');
const authController = require('../controllers/auth.controller');

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

authRoutes.post("/api/login",authController.loginUserController)

module.exports = authRoutes;