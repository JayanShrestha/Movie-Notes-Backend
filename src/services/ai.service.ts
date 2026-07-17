import { GoogleGenAI } from "@google/genai";
import dotenv from "dotenv";
dotenv.config();

const ApiKey = process.env.GEMINI_API_KEY;

const ai = new GoogleGenAI({apiKey: ApiKey});

const interaction = await ai.interactions.create({
  model: "gemini-3.5-flash",
  input: "Explain how AI works in 75 words",
});
console.log(interaction.output_text);