

"use server"
import { cookies } from "next/headers"

async function createPrompt(text:string){
    const url=process.env.NEXT_PUBLIC_BASEURL|| 'http://localhost:3000'
    const res= await fetch(`${url}/api/Parsing`,{
        method:"POST",
        headers: { "Content-Type": "application/json" },
        body:JSON.stringify({prompt:text}),
    });
    
const data = await res.json(); 
    const parsed=JSON.parse(data.data);
    return parsed;
}


export async function saveExpense(expense:{
    amount:number;
    purpose:string;
    balance_after:null;
}) {
     const url=process.env.NEXT_PUBLIC_BASEURL|| 'http://localhost:3000'

     const cookieStore = await cookies();
          const cookieHeader = cookieStore.getAll()
         .map(c => `${c.name}=${c.value}`)
         .join("; ");

   const goalRes = await fetch(`${url}/api/goal`,{
    cache:"no-store",
        headers:{
            Cookie:cookieHeader,
        },
    }
   );
  const goal = await goalRes.json();
  console.log(goal);
       const data = {
  ...expense,
  goal_id: goal.balance.id
};
    
    const res= await fetch(`${url}/api/expense`,{
        method:"POST",
         headers: { "Content-Type": "application/json" },
         body:JSON.stringify({
            amount:expense.amount,
            purpose:expense.purpose,
            balance_after:null,
            goal_id:data.goal_id,
         })
    })

    return await res.json();
    
}

// async function Reload() {
//     return window.location.reload();
    
// }

async function handleConfirm(text:string) {


    const parsed= await createPrompt(text);
    console.log("Parsed",parsed);
   const url=process.env.NEXT_PUBLIC_BASEURL|| 'http://localhost:3000'

   const cookieStore = await cookies();
          const cookieHeader = cookieStore.getAll()
         .map(c => `${c.name}=${c.value}`)
         .join("; ");


 const goalRes = await fetch(`${url}/api/goal`,{
    cache:"no-store",
        headers:{
            Cookie:cookieHeader,
        },
    }
   );

  const goal = await goalRes.json();

   const data = {
  ...parsed,
  goal_id: goal.balance.id
};

console.log(data);

    const saved=await saveExpense(data);
    console.log("saved");
   
    return (saved);
    
}

export default handleConfirm;