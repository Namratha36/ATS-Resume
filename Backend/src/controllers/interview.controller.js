const pdfParse = require('pdf-parse');
const generateInterviewReport = require('../services/ai.service').generateInterviewReport;
const interviewReportModel = require('../models/interviewReport.model');

async function generateInterViewReportController(req, res) {
    const resumeFile = req.file

    const resumeContent = await pdfParse(req.file.buffer);
    const {selfDescription, jobDescription} = req.body;

    const interviewByAi = await generateInterviewReport({
        resume: resumeContent.text,
        selfDescription,
        jobDescription
    });

    const interviewReport = await interviewReportModel.create({
        jobDescription,
        resumeText: resumeContent.text,
        selfDescription,
        user: req.user.id,
        ...interviewByAi
    });

    response.status(201).json({
        message: "Interview report generated successfully",
        interviewReport
    });
}


module.exports = {
    generateInterViewReportController
};
