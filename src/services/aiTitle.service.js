const { GoogleGenerativeAI } = require("@google/generative-ai");

const genAI = new GoogleGenerativeAI(process.env.GOOGLE_API_KEY);

async function generateTitle(prompt) {
  const model = genAI.getGenerativeModel({ 
    model: "gemini-1.5-flash", // Fast and efficient
    systemInstruction: `
      You are a concise title generator. Given a prompt, return ONLY a short title (3-7 words). 
      Example: 
      - Input: "Review this JavaScript async function" 
      - Output: "Async Function Code Review"
      - Input: "Check Python Flask API security"
      - Output: "Flask API Security Audit"
      
      Rules:
      1. Strictly 3-7 words.
      2. No explanations, just the title.
      3. Title must summarize the prompt.
    `
  });

  const result = await model.generateContent({
    contents: [{ 
      role: "user", 
      parts: [{ text: `Generate a short title for: "${prompt}"` }] 
    }]
  });

  const response = await result.response;
  return response.text().trim();
}

module.exports = generateTitle;