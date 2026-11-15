const jwt = require("jsonwebtoken");
const tokenBlacklistModel = require("../models/blacklist.model");

const JWT_SECRET = process.env.JWT_SECRET || "resumeai_default_jwt_secret_key_2026";

async function authUser(req, res, next) {
  const token = req.cookies.token;

  if (!token) {
    return res
      .status(401)
      .json({ message: "Access denied. No token provided." });
  }

  const isTokenBlacklisted = await tokenBlacklistModel.findOne({ token });

  if (isTokenBlacklisted) {
    return res
      .status(401)
      .json({ message: "Access denied. Token is blacklisted." });
  }

  try {
    const decoded = jwt.verify(token, JWT_SECRET);
    req.user = decoded;
    next();
  } catch (error) {
    res.status(400).json({ message: "Invalid or expired token." });
  }
}

module.exports = { authUser };
