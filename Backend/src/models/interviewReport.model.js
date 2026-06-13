const moonoose = require("mongoose");

/**
 * job description schema : string
 * resume text : string
 * self description : string
 * 
 * overall score : number
 * 
 * technical questions and answers : [{question: "", intention: "", answer: ""}]
 * BEHAVIORAL QUESTIONS AND ANSWERS : [{question: "", intention: "", answer: ""}]
 * skill gap : [skill :"",severity: "",type: string,enum :["low","medium","high"]]
 * perparation plan : [{
 * day: number,
 * focus: string,
 * tasks: [string]}]
 */

const technicalQnASchema = new moonoose.Schema({
    question: {type: String, required: [true, "Question is required"]},
    intention: {type: String, required: [true, "Intention is required"]},
    answer: {type: String, required: [true, "Answer is required"]},
}, {_id: false});

const behavioralQnASchema = new moonoose.Schema({
    question: {type: String, required: [true, "Question is required"]},
    intention: {type: String, required: [true, "Intention is required"]},
    answer: {type: String, required: [true, "Answer is required"]},
}, {_id: false});

const skillGapSchema = new moonoose.Schema({
    skill: {type: String, required: [true, "Skill is required"]},
    severity: {type: String, required: [true, "Severity is required"]},
    type: {type: String, enum: ["low", "medium", "high"], required: [true, "Type is required"]}
}, {_id: false});

const preparationPlanSchema = new moonoose.Schema({
    day: {type: Number, required: [true, "Day is required"]},
    focus: {type: String, required: [true, "Focus is required"]},
    tasks: [{type: String, required: [true, "At least one task is required"]}]
}, {_id: false});

const interviewReportSchema = new moonoose.Schema({
    jobDescription: {type: String, required: [true, "Job description is required"]},
    resumeText: {type: String, required: [true, "Resume text is required"]},
    selfDescription: {type: String, required: [true, "Self description is required"]},
    overallScore: {type: Number, min: 0, max: 100, required: [true, "Overall score is required"]},
    technicalQnA: [technicalQnASchema],
    behavioralQnA: [behavioralQnASchema],
    skillGaps: [skillGapSchema],
    preparationPlan: [preparationPlanSchema],
},{timestamps: true});

const interviewReportModel = moonoose.model("InterviewReport", interviewReportSchema);

module.exports = interviewReportModel;