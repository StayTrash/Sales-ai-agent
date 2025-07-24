// app/api/chat/route.ts
import { NextRequest, NextResponse } from "next/server";
import { getChatCompletion } from "../../../lib/openai";

export async function POST(req: NextRequest) {
  const { messages } = await req.json();
  const message = await getChatCompletion(messages);
  return NextResponse.json({ message });
}
