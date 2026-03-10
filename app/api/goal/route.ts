import { NextRequest, NextResponse } from "next/server";
import db from "@/app/lib/dbConnect";
import { getServerSession } from "next-auth";

import { authOptions } from "@/app/lib/authoptions";



export async function GET(request: NextRequest) {
  const session = await getServerSession(authOptions);
  console.log("this is goal api get session ",session);
  
  if (!session || !session.user) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  const [res]: any = await db.query('SELECT * FROM users WHERE email = ?', [session.user.email]);

  
  if (!res || res.length === 0) {
    return NextResponse.json({ error: "User not found" }, { status: 404 });
  }

  const query = 'SELECT * FROM goals WHERE user_id = ? ORDER BY created_at DESC LIMIT 1';
  const [val]: any = await db.execute(query, [res[0].id]);

  if (!val || val.length === 0) {
    return NextResponse.json(null);
  }

  return NextResponse.json({ balance: val[0] });
}

export async function POST(request: NextRequest) {
   const session = await getServerSession(authOptions);
  console.log("this is goal api Post sessiom",session);


  if (!session || !session.user) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  const { initial_balance, end_date } = await request.json();
  const [res]: any = await db.query('SELECT * FROM users WHERE email = ?', [session.user.email]);

  const query = `INSERT INTO goals(user_id, initial_balance, end_date) VALUES(?, ?, ?)`;
  const [result] = await db.execute(query, [res[0].id, initial_balance, end_date]);
  console.log(result);

  return NextResponse.json({ message: "success" });
}