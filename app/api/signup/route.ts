import db from "@/app/lib/dbConnect";
import { NextResponse,NextRequest } from "next/server";


export async function POST(req:NextRequest){
      const {name,email,password} = await req.json();
    
      const myQuery= "INSERT INTO users(name,email,password) VALUES(?,?,?)"

      const res = await db.execute(myQuery,[name,email,password]);
      return NextResponse.json({ message: "User created" })
}