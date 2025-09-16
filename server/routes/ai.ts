import { Request, Response } from "express";
import { GoogleGenerativeAI, GenerativeModel } from "@google/generative-ai";

export const chat = async (req: Request, res: Response) => {
  try {
    const message = req.body.message;

    // Initialize Gemini Pro
    const genAI = new GoogleGenerativeAI(process.env.GEMINI_API_KEY || "");
    let model: GenerativeModel;

    try{
      model = genAI.getGenerativeModel({ model: "gemini-pro"});
    }catch(e:any){
      return res.status(500).json({ error: `Gemini initialization failed: ${e.message}` });
    }
    // Ensure that the message is not undefined or null
    if (!message) {
      return res.status(400).json({ error: "Message is required" });
    }

    // Generate content with Gemini Pro
    const result = await model.generateContent(message);
    const response = await result.response;
    const reply = response.text();

    res.json({ reply });
  } catch (error) {
    console.error("AI Chat error:", error);
    res.status(500).json({ error: "Failed to process message" });
  }
};