"use server"

import { getServerSession } from "next-auth";
import { authOptions } from "@/app/lib/authoptions";
import { cookies } from "next/headers"

async function getGoal(){
    const session = await getServerSession(authOptions);
    console.log("fetched goal session:",session);


     const cookieStore = await cookies();
     const cookieHeader = cookieStore.getAll()
    .map(c => `${c.name}=${c.value}`)
    .join("; ");

     const url=process.env.NEXT_PUBLIC_BASEURL|| 'http://localhost:3000'
    const res = await fetch(`${url}/api/goal`,{
        cache:"no-store",
        headers:{
            Cookie:cookieHeader,
        },
    });
 if (!res.ok) {
    const text = await res.text();
    throw new Error(`getGoal failed ${res.status}: ${text.slice(0, 200)}`);
  }
    const data = await res.json();
    return data;
}

async function getExpense(){

    const goal = await getGoal();
const goal_id = goal.balance.id;
console.log("this is goalid",goal_id);
const url=process.env.NEXT_PUBLIC_BASEURL|| 'http://localhost:3000'
    const res= await fetch(`${url}/api/expense?goal_id=${goal_id}`,{
        cache:"no-store",
    });

    const data = await res.json();
    return data;
}

async function saveGoal(Goal:{
    amount:number;
    use_till:string;
}) {
     const cookieStore = await cookies();
     const cookieHeader = cookieStore.getAll()
    .map(c => `${c.name}=${c.value}`)
    .join("; ");



    const url=process.env.NEXT_PUBLIC_BASEURL|| 'http://localhost:3000'
    const res= await fetch(`${url}/api/goal`,{
        method:"POST",
         headers: { "Content-Type": "application/json",
            Cookie:cookieHeader,
          },
         body:JSON.stringify({
            initial_balance:Goal.amount,
            end_date:Goal.use_till,
         })
    })
 
    return  res.json();
    
}

export {getGoal,getExpense,saveGoal};