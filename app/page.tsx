import UseCard from "@/components/useCard/useCard";
import Available from "@/components/useCard/Available";
import ExpenseTable from "@/components/useTable/useTable";
import { getGoal, getExpense } from "@/lib/fetchgoal";
import VoiceRecorder from "@/components/SpeechTranscribe/voiceRecorder/Voicerecorder";
import { totalExpense } from "@/lib/totalexpense";
import AddGoal from "@/components/addGoal";
import Addbutton from "@/components/addExpense";

export default async function Home() {
  const goal = await getGoal();
  const expense = await getExpense();
  const total = await totalExpense();

  const avail = goal.balance.initial_balance - total.result[0].total_expense;

  return (
    <div className="min-h-screen bg-[#FAFAFA] text-zinc-900 font-sans selection:bg-zinc-200">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-12 space-y-12">
        
        {/* 1. Page Header */}
        <div>
          <h1 className="text-3xl font-semibold tracking-tight text-zinc-900">
            Dashboard
          </h1>
          <p className="text-sm text-zinc-500 mt-1.5">
            Overview of your financial goals and expenses.
          </p>
        </div>

        {/* 2. Top Cards Section */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          
          <UseCard
            initial_balance={goal.balance.initial_balance}
            date={goal.balance.start_date}
          />
          
          {/* Middle Action: Clean, solid card without the messy dashed borders */}
          <div className="flex  items-center justify-center gap-5 bg-white rounded-2xl border border-zinc-200/60 shadow-sm p-6">
            <AddGoal />
          </div>

          <Available
            available_balance={avail}
            date={goal.balance.end_date}
          />
        </div>

        {/* 3. Expenses Section */}
        <div className="space-y-4">
          
          {/* Section Header (Moved upwards and outside the table card) */}
          <div className="flex items-center justify-between px-1">
            <h2 className="text-lg font-semibold tracking-tight text-zinc-900">
              Recent Transactions
            </h2>
            <button className="text-sm font-medium text-zinc-500 hover:text-zinc-900 transition-colors">
              View All &rarr;
            </button>
          </div>

          {/* Table Card (Exclusively for Voice Recorder and Table) */}
          <div className="bg-white rounded-2xl border border-zinc-200/60 shadow-sm overflow-hidden">
            
            {/* Dedicated Voice Recorder Bar */}
            <div className="border-b border-zinc-100 p-4 sm:p-6 bg-zinc-50/30 flex justify-center">
              <div className="w-full max-w-md">
                <VoiceRecorder />
              </div>
            </div>
            
            {/* The Table Itself */}
            <div className="p-0 sm:px-2">
              <ExpenseTable expenses={expense.data} />
            </div>

          </div>

        </div>

      </div>
    </div>
  );
}