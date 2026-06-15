const { GoogleGenAI } = require("@google/genai");
const {z} = require("zod");
const {zodToJsonSchema} = require("zod-to-json-schema");
const { describe } = require("zod/v4/core");

const ai = new GoogleGenAI({
    apiKey: process.env.GOOGLE_GENAI_API_KEY
});



async function invokeGeminiAi() {
    try {
        const response = await ai.models.generateContent({
            model: "gemini-2.5-flash",
            contents: "Hello Gemini! Explain what is interview?"
        });

        const text = response.text;

        console.log("Gemini Response:");
        console.log(text);

        return text;

    } catch (error) {
        console.error("Gemini Error:", error);
    }
}

const interviewReportSchema = z.object({
    overallScore: z.number().describe("A score out of 100 representing the candidate's overall performance in the interview."),
    technicalQuestions: z.array(z.object({
        question: z.string().describe("The technical question asked in the interview"),
        intention: z.string().describe("The intention of interviewee behind asking the question"),
        answer: z.string().describe("How to answer this question, what points to cover, what approach to take, etc.")
    })).describe("The technical questions and answers for the interview."),
    behavioralQuestions: z.array(z.object({
        question: z.string().describe("The behavioral question can be asked in the interview"),
        intention: z.string().describe("The intention of interviewee behind asking the question"),
        answer: z.string().describe("How to answer this question, what points to cover, what approach to take, etc.")
    })).describe("The behavioral questions and answers for the interview."),
    skillGaps: z.array(z.object({
        skill: z.string().describe("The skill that the candidate is lacking"),
        severity: z.string().describe("The severity of the skill gap"),
    })).describe("List of skill gaps identified in the candidate."),
    preparationPlan: z.array(z.object({
        day: z.number().describe("The day number in the preparation plan"),
        focus: z.string().describe("The focus area for that day"),
        tasks: z.array(z.string()).describe("The tasks to be completed on that day")
    })).describe("A detailed preparation plan for the candidate.")
});


async function generateInterviewReport({resume, selfDescription,jobDescription}) {

    const prompt = `Generate an interview report for a candidate based on the following information:
Job Description:
${jobDescription}
Resume:
${resume}
Self Description:
${selfDescription}`;

    const response = await ai.models.generateContent({
        model: "gemini-3-flash-preview",
        contents: prompt,
        config: {
           responseMimeType: "application/json",
           responseSchema: zodToJsonSchema(interviewReportSchema)
        }
    });

    // console.log((response.text));
    // return response.text;

    // const report = JSON.parse(response.text);
    return JSON.parse(response.text);
}


module.exports = generateInterviewReport;