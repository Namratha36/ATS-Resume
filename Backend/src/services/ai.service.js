// const {GoogleGenAI} =  require("@google/genai");

// const ai = new GoogleGenAI({
//     apiKey: process.env.GOOGLE_GENAI_API_KEY
// });

// async function invokeGeminiAi(){
//     const response = await ai.models.generateContent({
//         model: "gemini-2.5-flash",
//         contents:"Hello gemini !Explain what is interview ?"
//     });

//     console.log(response);
// }

// module.exports = {
//     invokeGeminiAi
// };
const { GoogleGenAI } = require("@google/genai");

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

module.exports = {
    invokeGeminiAi
};