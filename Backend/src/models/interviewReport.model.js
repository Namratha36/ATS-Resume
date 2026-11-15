const mongoose = require("mongoose");

const technicalQnASchema = new mongoose.Schema(
  {
    question: { type: String, required: [true, "Question is required"] },
    intention: { type: String, required: [true, "Intention is required"] },
    answer: { type: String, required: [true, "Answer is required"] },
  },
  { _id: false }
);

const behavioralQnASchema = new mongoose.Schema(
  {
    question: { type: String, required: [true, "Question is required"] },
    intention: { type: String, required: [true, "Intention is required"] },
    answer: { type: String, required: [true, "Answer is required"] },
  },
  { _id: false }
);

const skillGapSchema = new mongoose.Schema(
  {
    skill: { type: String, required: [true, "Skill is required"] },
    severity: {
      type: String,
      enum: ["low", "medium", "high"],
      required: [true, "Severity is required"],
    },
  },
  { _id: false }
);

const preparationPlanSchema = new mongoose.Schema(
  {
    day: { type: Number, required: [true, "Day is required"] },
    focus: { type: String, required: [true, "Focus is required"] },
    tasks: [{ type: String, required: [true, "At least one task is required"] }],
  },
  { _id: false }
);

const interviewReportSchema = new mongoose.Schema(
  {
    jobDescription: {
      type: String,
      required: [true, "Job description is required"],
    },
    resumeText: {
      type: String,
      required: [true, "Resume text is required"],
    },
    selfDescription: {
      type: String,
      required: [true, "Self description is required"],
    },
    overallScore: {
      type: Number,
      min: 0,
      max: 100,
      required: [true, "Overall score is required"],
    },
    technicalQnA: [technicalQnASchema],
    behavioralQnA: [behavioralQnASchema],
    skillGaps: [skillGapSchema],
    preparationPlan: [preparationPlanSchema],
    isDemo: {
      type: Boolean,
      default: false,
    },
    user: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Users",
      required: [true, "User is required"],
    },
  },
  { timestamps: true }
);

const interviewReportModel = mongoose.model(
  "InterviewReport",
  interviewReportSchema
);

module.exports = interviewReportModel;
