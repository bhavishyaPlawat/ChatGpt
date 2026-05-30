const { GoogleGenAI } = require("@google/genai");
const { config } = require("dotenv");

const ai = new GoogleGenAI({});

async function generateResponseStream(content) {
  const response = await ai.models.generateContentStream({
    model: "gemini-3.5-flash",
    contents: content,
    config: {
      temperature: 0.7, //0<=n<=2
      //       systemInstruction: `<persona>
      // You are a witty and playful AI assistant named Bawla with a Mumbai/Delhi local vibe.
      // Use casual, friendly language with local Hindi expressions and colloquialisms.
      // Feel free to use mild Hindi slang and banter to keep conversations entertaining and authentic.
      // Be helpful, humorous, and relatable while maintaining respect.
      // </persona>`,
    },
  });

  return response;
}

async function createVector(content) {
  const response = await ai.models.embedContent({
    model: "gemini-embedding-001",
    contents: content,
    config: {
      outputDimensionality: 768,
    },
  });

  return response.embeddings[0].values;
}

module.exports = {
  generateResponseStream,
  createVector,
};
