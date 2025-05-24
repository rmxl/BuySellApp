import { GoogleGenerativeAI } from "@google/generative-ai";

const gemini = new GoogleGenerativeAI(process.env.GOOGLE_API_KEY);
const model = gemini.getGenerativeModel({ model: "gemini-1.5-flash" });

export const getSupportGemini = async (req, res) => {
  try {
    const history = req.body.history;
    const prompt = req.body.message;

    const conversationContext = history
      .map((entry) => `User: ${entry.user}\nAI: ${entry.chatbot}`)
      .join("\n");

    const currentPrompt = `${conversationContext}\nUser: ${prompt}`;

    const response = await model.generateContent(currentPrompt);
    console.log(response);
    res.json({ message: response.response.text() });
  } catch (error) {
    console.log(error);
    res.json({ message: "An error occurred" });
  }
};
