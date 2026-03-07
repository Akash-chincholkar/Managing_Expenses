import { getGoal } from "./fetchgoal";



async function createPrompt(text:string){
    const res= await fetch("/api/Parsing",{
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

      const goal=await getGoal();
       const data = {
  ...expense,
  goal_id: goal.balance.id
};

    const res= await fetch("/api/expense",{
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

async function Reload() {
    return window.location.reload();
    
}

async function handleConfirm(text:string) {


    const parsed= await createPrompt(text);
    console.log("Parsed",parsed);
     const goal=await getGoal();

   const data = {
  ...parsed,
  goal_id: goal.balance.id
};

console.log(data);

    const saved=await saveExpense(data);
    console.log("saved");
   await Reload();
    
}

export default handleConfirm;