"use client"

import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table"

import { useRouter } from "next/navigation";
import Addbutton from "../addExpense";

interface Expense {
  id: number;
  purpose: string;
  created_at: string;
  amount: number;
}

interface ExpenseProps {
  expenses: Expense[];
}

const ExpenseTable: React.FC<ExpenseProps> = ({ expenses }) => {
  const router = useRouter();

  return (
    <div className="w-full max-w-5xl mx-auto mt-10 px-4 sm:px-6 lg:px-8">
      
      {/* Header Section: Stacks on mobile, inline on desktop */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 mb-6">
        <div>
          <h2 className="text-2xl font-bold text-slate-900 tracking-tight">
            Expenses
          </h2>
          <p className="text-sm text-slate-500 mt-1">
            Track and manage your recent transactions.
          </p>
        </div>
        <div className="w-full sm:w-auto">
          <Addbutton />
        </div>
      </div>

      {/* Table Container: Card-like UI with horizontal scroll for mobile */}
      <div className="bg-white border border-slate-200 rounded-xl shadow-sm overflow-hidden ring-1 ring-black/5">
        <div className="overflow-x-auto">
          {/* min-w ensures the table doesn't crush content on small screens */}
          <Table className="min-w-[600px] w-full text-left border-collapse">
            <TableHeader className="bg-slate-50/80 border-b border-slate-200">
              <TableRow className="hover:bg-transparent">
                <TableHead className="w-[180px] py-4 px-6 font-semibold text-xs text-slate-500 tracking-wider uppercase">
                  Date
                </TableHead>
                <TableHead className="py-4 px-6 font-semibold text-xs text-slate-500 tracking-wider uppercase">
                  Category
                </TableHead>
                <TableHead className="text-right py-4 px-6 font-semibold text-xs text-slate-500 tracking-wider uppercase">
                  Amount (₹)
                </TableHead>
              </TableRow>
            </TableHeader>

            <TableBody className="divide-y divide-slate-100">
              {expenses.length === 0 ? (
                <TableRow>
                  <TableCell colSpan={3} className="h-48 text-center">
                    <div className="flex flex-col items-center justify-center space-y-2">
                      <div className="h-10 w-10 rounded-full bg-slate-100 flex items-center justify-center mb-2">
                        <svg className="w-5 h-5 text-slate-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z"></path>
                        </svg>
                      </div>
                      <span className="text-slate-600 font-medium">No expenses found</span>
                      <span className="text-slate-400 text-sm">Add one to get started!</span>
                    </div>
                  </TableCell>
                </TableRow>
              ) : (
                expenses.map((expense) => (
                  <TableRow 
                    key={expense.id} 
                    className="group hover:bg-slate-50/80 transition-colors duration-200"
                  >
                    <TableCell className="py-4 px-6 text-sm text-slate-600 whitespace-nowrap">
                      {new Date(expense.created_at).toLocaleDateString("en-IN", {
                        day: 'numeric',
                        month: 'short',
                        year: 'numeric'
                      })}
                    </TableCell>

                    <TableCell className="py-4 px-6 text-sm font-medium text-slate-900 capitalize">
                      {expense.purpose}
                    </TableCell>

                    <TableCell className="py-4 px-6 text-right text-sm font-semibold text-slate-900 tabular-nums">
                      ₹{expense.amount.toLocaleString('en-IN')}
                    </TableCell>
                  </TableRow>
                ))
              )}
            </TableBody>
          </Table>
        </div>
      </div>
    </div>
  );
};

export default ExpenseTable;