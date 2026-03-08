async function getGoal(){
     const url=process.env.NEXT_PUBLIC_BASEURL|| 'http://localhost:3000'
    const res = await fetch(`${url}/api/goal`,{
        cache:"no-store",
    });


    return res.json();
}

async function getExpense(){

    const goal = await getGoal();
const goal_id = goal.balance.id;
console.log("this is goalid",goal_id);
const url=process.env.NEXT_PUBLIC_BASEURL|| 'http://localhost:3000'
    const res= await fetch(`${url}/api/expense?goal_id=${goal_id}`,{
        cache:"no-store",
    });

    const data = res.json();
    return data;
}

async function saveGoal(Goal:{
    amount:number;
    use_till:string;
}) {
    const url=process.env.NEXT_PUBLIC_BASEURL|| 'http://localhost:3000'
    const res= await fetch(`${url}/api/goal`,{
        method:"POST",
         headers: { "Content-Type": "application/json" },
         body:JSON.stringify({
            initial_balance:Goal.amount,
            end_date:Goal.use_till,
         })
    })
 
    return  res.json();
    
}

export {getGoal,getExpense,saveGoal};