
// import { GoogleGenerativeAI } from "@google/generative-ai";
// import { NextResponse } from "next/server";



// export async function GET() {
//   const genAI = new GoogleGenerativeAI(process.env.GEMINI_API_KEY!);

//   const models = await genAI.listModels();
//     const availableModels = [];
//     for (const model of models) {
//       availableModels.push({
//         name: model.name,
//         description: model.description,
//         supportedGenerationMethods: model.supportedGenerationMethods,
//       });

//   return NextResponse.json(models);
// }
// }
export const runtime = "nodejs";

export async function GET() {
  const res = await fetch("https://example.com");
  return Response.json({ status: res.status });
}


