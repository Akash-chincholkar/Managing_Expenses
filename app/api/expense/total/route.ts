import { NextRequest, NextResponse } from "next/server";
import db from "@/app/lib/dbConnect";
import { getGoal } from "@/lib/fetchgoal";
export async function GET(req:NextRequest) {
 const {searchParams}= new URL(req.url);
 const goal_id=searchParams.get("goal_id");
   console.log("goal_id received for total:", goal_id);
    const myQuery="SELECT SUM(amount) AS total_expense FROM EXPENSES WHERE goal_id=?"

    const [res]:any =await db.execute(myQuery,[Number(goal_id)]);

    return NextResponse.json({result:res});
    
}