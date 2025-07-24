// lib/openai.ts
import OpenAI from "openai";

export const openai = new OpenAI({
  apiKey: process.env.OPENAI_API_KEY
});

export async function getChatCompletion(messages: { role: string; content: string }[]) {
  const res = await openai.chat.completions.create({
    model: process.env.OPENAI_MODEL!,
    messages
  });
  return res.choices[0].message;
}
