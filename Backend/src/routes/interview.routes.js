const { Router } = require('express');
const interviewController = require('../controllers/interview.controller');

const interviewRoutes = Router();

/**
 * @route POST /api/interview/analyze
 * @desc Get AI analysis for interview questions
 * @access Public
 */
interviewRoutes.post('/analyze', interviewController.getInterviewAnalysis);

module.exports = interviewRoutes;
