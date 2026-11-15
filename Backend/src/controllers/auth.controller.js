const userModel = require("../models/user.model");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const tokenBlacklistModel = require("../models/blacklist.model");

const JWT_SECRET = process.env.JWT_SECRET || "resumeai_default_jwt_secret_key_2026";

/**
 * @name registerUserController
 * @desc Register a new user, expects username, email and password in request body
 * @access Public
 */
async function registerUserController(req, res) {
  try {
    const { username, email, password } = req.body;

    if (!username || !email || !password) {
      return res
        .status(400)
        .json({ message: "Please provide username, email and password" });
    }

    const trimmedUsername = username.trim();
    const trimmedEmail = email.trim().toLowerCase();

    if (password.length < 6) {
      return res
        .status(400)
        .json({ message: "Password must be at least 6 characters long" });
    }

    const isUserAlreadyExist = await userModel.findOne({
      $or: [{ username: trimmedUsername }, { email: trimmedEmail }],
    });

    if (isUserAlreadyExist) {
      return res
        .status(400)
        .json({ message: "Username or email is already taken" });
    }

    // Hash the password before saving
    const hash = await bcrypt.hash(password, 10);

    const user = await userModel.create({
      username: trimmedUsername,
      email: trimmedEmail,
      password: hash,
    });

    const token = jwt.sign(
      { id: user._id, username: user.username },
      JWT_SECRET,
      { expiresIn: "1d" }
    );

    res.cookie("token", token, {
      httpOnly: false,
      sameSite: "lax",
    });

    res.status(201).json({
      message: "User registered successfully",
      user: {
        id: user._id,
        username: user.username,
        email: user.email,
      },
    });
  } catch (error) {
    console.error("Register error:", error);
    res.status(500).json({ message: "Internal server error during registration" });
  }
}

/**
 * @name loginUserController
 * @desc Login a user, expects email and password in request body
 * @access Public
 */
async function loginUserController(req, res) {
  try {
    const { email, password } = req.body;

    if (!email || !password) {
      return res
        .status(400)
        .json({ message: "Please provide both email and password" });
    }

    const trimmedEmail = email.trim().toLowerCase();
    const user = await userModel.findOne({ email: trimmedEmail });

    if (!user) {
      return res.status(400).json({ message: "Invalid email or password" });
    }

    const isPasswordValid = await bcrypt.compare(password, user.password);

    if (!isPasswordValid) {
      return res.status(400).json({ message: "Invalid email or password" });
    }

    const token = jwt.sign(
      { id: user._id, username: user.username },
      JWT_SECRET,
      { expiresIn: "1d" }
    );
    res.cookie("token", token, {
      httpOnly: false,
      sameSite: "lax",
    });

    res.status(200).json({
      message: "Login successful",
      user: {
        id: user._id,
        username: user.username,
        email: user.email,
      },
    });
  } catch (error) {
    console.error("Login error:", error);
    res.status(500).json({ message: "Internal server error during login" });
  }
}

/**
 * @name guestLoginController
 * @desc Create a unique guest user session with full isolation
 * @access Public
 */
async function guestLoginController(req, res) {
  try {
    const uniqueSuffix = `${Date.now().toString(36)}_${Math.random().toString(36).substring(2, 7)}`;
    const guestUsername = `guest_${uniqueSuffix}`;
    const guestEmail = `${guestUsername}@guest.resumeai.internal`;
    const randomPassword = await bcrypt.hash(`Guest_${uniqueSuffix}!`, 10);

    const guestUser = await userModel.create({
      username: guestUsername,
      email: guestEmail,
      password: randomPassword,
    });

    const token = jwt.sign(
      { id: guestUser._id, username: guestUser.username, isGuest: true },
      JWT_SECRET,
      { expiresIn: "1d" }
    );

    res.cookie("token", token, {
      httpOnly: false,
      sameSite: "lax",
    });

    res.status(200).json({
      message: "Guest session initialized successfully",
      user: {
        id: guestUser._id,
        username: guestUser.username,
        email: guestUser.email,
        isGuest: true,
      },
    });
  } catch (error) {
    console.error("Guest login error:", error);
    res.status(500).json({ message: "Failed to create isolated guest session" });
  }
}

/**
 * @name logoutUserController
 * @desc Logout a user, clear token cookie and blacklist token
 * @access Public
 */
async function logoutUserController(req, res) {
  try {
    const token = req.cookies.token;

    if (token) {
      await tokenBlacklistModel.create({ token });
      res.clearCookie("token");
    }

    res.status(200).json({ message: "Logout successful" });
  } catch (error) {
    console.error("Logout error:", error);
    res.status(500).json({ message: "Failed to logout properly" });
  }
}

/**
 * @name getMeController
 * @desc Get current authenticated user
 * @access Private
 */
async function getMeController(req, res) {
  try {
    const user = await userModel.findById(req.user.id);

    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }

    res.status(200).json({
      message: "User fetched successfully",
      id: user._id,
      username: user.username,
      email: user.email,
    });
  } catch (error) {
    console.error("GetMe error:", error);
    res.status(500).json({ message: "Failed to fetch user session" });
  }
}

module.exports = {
  registerUserController,
  loginUserController,
  guestLoginController,
  getMeController,
  logoutUserController,
};
