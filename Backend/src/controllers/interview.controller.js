const pdfParse = require("pdf-parse");
const {
  generateInterviewReport,
} = require("../services/ai.service");
const interviewReportModel = require("../models/interviewReport.model");

/**
 * POST /api/interview/
 * Generate a new interview report via Gemini AI.
 * Gracefully handles Gemini API failures.
 */
async function generateInterViewReportController(req, res) {
  try {
    if (!req.file) {
      return res.status(400).json({ message: "Resume PDF file is required." });
    }

    const resumeContent = await pdfParse(req.file.buffer);
    const { selfDescription, jobDescription } = req.body;

    if (!selfDescription || !jobDescription) {
      return res.status(400).json({
        message: "selfDescription and jobDescription are required.",
      });
    }

    let interviewByAi;
    try {
      interviewByAi = await generateInterviewReport({
        resume: resumeContent.text,
        selfDescription,
        jobDescription,
      });
    } catch (aiError) {
      console.error("Gemini API Error:", aiError.message || aiError);
      return res.status(503).json({
        message:
          "AI analysis is temporarily unavailable. The Gemini API could not be reached. Please try again later or contact the administrator.",
        error: "GEMINI_UNAVAILABLE",
      });
    }

    const interviewReport = await interviewReportModel.create({
      jobDescription,
      resumeText: resumeContent.text,
      selfDescription,
      user: req.user.id,
      ...interviewByAi,
    });

    res.status(201).json({
      message: "Interview report generated successfully",
      interviewReport,
    });
  } catch (error) {
    console.error("Interview report generation error:", error);
    res.status(500).json({
      message: "Failed to generate interview report. Please try again.",
    });
  }
}

/**
 * GET /api/interview/reports
 * List all interview reports for the logged-in user.
 */
async function getReportsController(req, res) {
  try {
    const reports = await interviewReportModel
      .find({ user: req.user.id })
      .select(
        "jobDescription overallScore createdAt selfDescription isDemo"
      )
      .sort({ createdAt: -1 });

    res.status(200).json({ reports });
  } catch (error) {
    console.error("Error fetching reports:", error);
    res.status(500).json({ message: "Failed to fetch reports." });
  }
}

/**
 * GET /api/interview/reports/:id
 * Get a single interview report by ID (only if owned by the user).
 */
async function getReportByIdController(req, res) {
  try {
    const report = await interviewReportModel.findOne({
      _id: req.params.id,
      user: req.user.id,
    });

    if (!report) {
      return res
        .status(404)
        .json({ message: "Report not found or access denied." });
    }

    res.status(200).json({ report });
  } catch (error) {
    console.error("Error fetching report:", error);
    res.status(500).json({ message: "Failed to fetch report." });
  }
}

/**
 * GET /api/interview/stats
 * Get dashboard statistics for the logged-in user.
 */
async function getStatsController(req, res) {
  try {
    const totalReports = await interviewReportModel.countDocuments({
      user: req.user.id,
    });

    const reports = await interviewReportModel
      .find({ user: req.user.id })
      .select("overallScore");

    const avgScore =
      totalReports > 0
        ? Math.round(
            reports.reduce((sum, r) => sum + (r.overallScore || 0), 0) /
              totalReports
          )
        : 0;

    const highestScore =
      totalReports > 0
        ? Math.max(...reports.map((r) => r.overallScore || 0))
        : 0;

    res.status(200).json({
      totalReports,
      avgScore,
      highestScore,
    });
  } catch (error) {
    console.error("Error fetching stats:", error);
    res.status(500).json({ message: "Failed to fetch statistics." });
  }
}

module.exports = {
  generateInterViewReportController,
  getReportsController,
  getReportByIdController,
  getStatsController,
};
