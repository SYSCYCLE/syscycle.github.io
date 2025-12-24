
import { GoogleGenAI } from "@google/genai";

export const analyzeWasmHeader = async (headerBytes: Uint8Array, fileName: string): Promise<string> => {
  const ai = new GoogleGenAI({ apiKey: process.env.API_KEY });
  const hex = Array.from(headerBytes.slice(0, 64))
    .map(b => b.toString(16).padStart(2, '0'))
    .join(' ');

  const prompt = `
    I have a WebAssembly file named "${fileName}".
    Here are the first 64 bytes in hex: ${hex}
    
    As a low-level systems expert, briefly explain what this Wasm file might be. 
    Verify if the magic numbers (\`00 61 73 6d\`) are correct. 
    Keep the explanation professional and concise (under 100 words).
  `;

  try {
    const response = await ai.models.generateContent({
      model: 'gemini-3-flash-preview',
      contents: prompt,
    });
    return response.text || "No analysis available.";
  } catch (error) {
    console.error("AI Analysis failed", error);
    return "AI analysis unavailable at this moment.";
  }
};
