import { getGoal } from "./fetchgoal";


export async function totalExpense() {
    const goal= await getGoal();
   const goal_id= goal.balance.id;
   const url=process.env.BASEURL|| 'http://localhost:3000'
    const res=await fetch(`${url}/api/expense/total?goal_id=${goal_id}`,{
        cache:"no-store"
    })

   return res.json();
   
   
}

