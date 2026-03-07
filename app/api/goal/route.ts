import { NextRequest,NextResponse } from "next/server";
import db from "@/app/lib/dbConnect";

export async function GET(request:NextRequest) {
    const query='SELECT * FROM goals ORDER BY created_at DESC LIMIT 1'
    const [val]: any=await db.query(query);
    return NextResponse.json({balance: val[0]});
}

export async function POST(request:NextRequest){
    const {initial_balance,end_date}= await request.json();
    const query=`INSERT INTO goals(initial_balance,end_date)
    VALUES(?,?)`

    const [result]= await db.execute(query,[initial_balance,end_date]);
    console.log(result);
    

    return NextResponse.json({message:"success"});
}