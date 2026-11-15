const express = require("express");
const interviewController = require("../controllers/interview.controller");
const upload = require("../middlewares/file.middleware").upload;
const authMiddleware = require("../middlewares/auth.middleware");

const interviewRouter = express.Router();

/**
 * @route POST /api/interview/
 * @desc Generate new interview report (requires resume PDF, jobDescription, selfDescription)
 * @access Private
 */
interviewRouter.post(
  "/",
  authMiddleware.authUser,
  upload.single("resume"),
  interviewController.generateInterViewReportController
);

/**
 * @route GET /api/interview/reports
 * @desc Get all interview reports for the logged-in user
 * @access Private
 */
interviewRouter.get(
  "/reports",
  authMiddleware.authUser,
  interviewController.getReportsController
);

/**
 * @route GET /api/interview/reports/:id
 * @desc Get a single interview report by ID
 * @access Private
 */
interviewRouter.get(
  "/reports/:id",
  authMiddleware.authUser,
  interviewController.getReportByIdController
);

/**
 * @route GET /api/interview/stats
 * @desc Get dashboard statistics for the logged-in user
 * @access Private
 */
interviewRouter.get(
  "/stats",
  authMiddleware.authUser,
  interviewController.getStatsController
);

module.exports = interviewRouter;
