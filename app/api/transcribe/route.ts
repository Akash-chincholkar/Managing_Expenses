import { GoogleGenerativeAI } from "@google/generative-ai";
import { NextRequest, NextResponse } from "next/server";

export const runtime = "nodejs";

const genAI = new GoogleGenerativeAI(process.env.GOOGLE_API_KEY!);

export async function POST(req: NextRequest) {
  const formData = await req.formData();
  const file = formData.get("file") as File;

  const arrayBuffer = await file.arrayBuffer();
  const base64Audio = Buffer.from(arrayBuffer).toString("base64");

  const model = genAI.getGenerativeModel({
    model: "gemini-2.5-flash",
  });

  const result = await model.generateContent([
    {
      text: "Transcribe this audio to plain text. Return only the transcript. make sure the transcript is 100% accurate",
    },
    {
      inlineData: {
        mimeType: file.type,
        data: base64Audio,
      },
    },
  ]);

  const response = await result.response;
  const text = response.text();

  return NextResponse.json({ text });
}
