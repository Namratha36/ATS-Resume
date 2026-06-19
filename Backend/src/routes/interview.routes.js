const { Router } = require('express');
const interviewController = require('../controllers/interview.controller');
const upload = require('../middlewares/file.middleware').upload;
const express = require('express');
const interviewRouter = express.Router();
const authMiddleware = require('../middlewares/auth.middleware');

/**
 * @route POST /api/interview/
 * @desc generate new interview report on the basis of user self description, resume pdf, and job description
 * @access Private
 */

interviewRouter.post('/', authMiddleware.authUser,upload.single('resume'),interviewController.generateInterViewReportController);


module.exports = interviewRouter;
