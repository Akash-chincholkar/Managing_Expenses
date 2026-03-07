"use client"
import { useRouter } from "next/navigation"

const Addbutton=()=>{
    const router=useRouter();
       function NavigateToExpenseForm(){
          return router.push("/pages/test");
  }
    return(
         <button
  onClick={() => NavigateToExpenseForm()}
  className="
    group relative flex items-center gap-2 rounded-full bg-zinc-900 px-5 py-2.5
    text-sm/5 font-semibold text-white shadow-sm 
    transition-all duration-200 mb-6;
    hover:bg-zinc-800 hover:shadow-md hover:-translate-y-0.5 
    active:scale-95 focus:outline-none focus:ring-2 focus:ring-zinc-900 focus:ring-offset-2
  "
>
  {/* The Icon */}
  <svg
    xmlns="http://www.w3.org/2000/svg"
    viewBox="0 0 20 20"
    fill="currentColor"
    className="h-4 w-4 transition-transform group-hover:rotate-90"
  >
    <path d="M10.75 4.75a.75.75 0 00-1.5 0v4.5h-4.5a.75.75 0 000 1.5h4.5v4.5a.75.75 0 001.5 0v-4.5h4.5a.75.75 0 000-1.5h-4.5v-4.5z" />
  </svg>

  <span>Add Expense</span>
</button>
    )
}


export default Addbutton;