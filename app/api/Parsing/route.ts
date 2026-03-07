import { NextRequest,NextResponse } from "next/server";
import { GoogleGenerativeAI } from "@google/generative-ai";

export  async function POST(req:NextRequest) {
    const {prompt}= await req.json();
    
const genAI = new GoogleGenerativeAI(process.env.GOOGLE_API_KEY!);

const model = genAI.getGenerativeModel({
    model: "gemini-2.5-flash",
  });

const result= await model.generateContent([
  
   {
    text : ` Extract expense information from this sentence:

"${prompt}"

Rules:
- amount must be a number only
- purpose must be short text
- If not found, return null
- Return ONLY valid JSON
- No explanation, no markdown, no code blocks

Format:
{"amount": number|null, "purpose": string|null}
`


   }
]

)

return NextResponse.json({message:"success",
    data:result.response.text(),
})

    
}