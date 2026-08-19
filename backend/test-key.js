const { GoogleGenerativeAI } = require('@google/generative-ai');

async function test() {
  try {
    const key = 'AQ.Ab8RN6JvwwchVBeUJiNezEnhPCDyxj3WOxClc3rvOxSK6al2gQ';
    const genAI = new GoogleGenerativeAI(key);
    
    console.log("Testing gemini-1.5-flash...");
    let model = genAI.getGenerativeModel({ model: 'gemini-1.5-flash' });
    let result = await model.generateContent("Say hello");
    console.log("SUCCESS: gemini-1.5-flash ->", result.response.text());
    
  } catch (e) {
    console.error("FAILED gemini-1.5-flash:", e.message);
  }
}

test();
