import {NextRequest, NextResponse } from "next/server";
import db from "@/app/lib/dbConnect";
export async function GET(request:NextRequest){
    const {searchParams}= new URL(request.url);
    const goal_id = searchParams.get("goal_id");
    console.log("goal_id received:", goal_id);
    const myQuery= `SELECT * FROM expenses WHERE goal_id = ?  ORDER BY created_at DESC 
  LIMIT 5`;
         const [table]:any= await db.execute(myQuery,[Number(goal_id)]);

         return NextResponse.json({data:table});
}


export async function POST(request:NextRequest){
    console.log("hii")
    const {amount,purpose,balance_after,goal_id}= await request.json();
   console.log(amount, purpose, balance_after);

    const postQuery=`INSERT INTO expenses(amount,purpose,balance_after,goal_id)
    VALUES (?,?,?,?)`;

   const[result]= await db.execute(postQuery,[amount,purpose,balance_after,goal_id]);


   return NextResponse.json({message:"success"});

}