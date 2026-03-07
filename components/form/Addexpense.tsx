"use client"

import { useForm, Controller } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod"
import { Input } from "@/components/ui/input"
import { useRouter } from "next/navigation";
import { saveExpense } from "@/lib/postexpense";
import {
  Field,
  FieldError,
  FieldGroup,
  FieldLabel,
} from "@/components/ui/field"
import {AddexpenseSchema,ExpenseInput,ExpenseData} from "./zod";


const today = new Date();
today.setHours(0, 0, 0, 0);

const AddExpenseForm = () => {
    const router=useRouter();
  const form = useForm<ExpenseInput, any, ExpenseData>({
    resolver: zodResolver(AddexpenseSchema),
    defaultValues: {
      amount: "",
      purpose: "",
      goal_id: "",
    },
  });

  function onSubmit(data: ExpenseData) {

    const res= saveExpense({amount:data.amount,purpose:data.purpose,balance_after:null,goal_id:data.goal_id})
    console.log(res);
    router.push("/");
  }

  return (
    <div className="flex justify-center items-center min-h-screen bg-gray-50/50 px-4 py-12 sm:px-6 lg:px-8 w-full">
      
      <form
        onSubmit={form.handleSubmit(onSubmit)}
        className="w-full max-w-md space-y-8 bg-white p-10 shadow-xl ring-1 ring-gray-900/5 rounded-2xl sm:p-12"
      >
        <div className="space-y-2 text-center sm:text-left">
          <h2 className="text-2xl font-bold tracking-tight text-gray-900">
            Add a New Expense
          </h2>
          <p className="text-sm text-gray-500">
            Define your amount spent and purpose below.
          </p>
        </div>

        <FieldGroup className="space-y-6">
          {/* Amount Field */}
          <Controller
            name="amount"
            control={form.control}
            render={({ field, fieldState }) => (
              <Field data-invalid={fieldState.invalid} className="space-y-2">
                <FieldLabel className="text-sm font-semibold leading-6 text-gray-900">
                  Amount spent
                </FieldLabel>

                <div className="relative">
                  <div className="pointer-events-none absolute inset-y-0 left-0 flex items-center pl-3">
                    <span className="text-gray-500 sm:text-sm">₹</span>
                  </div>
                  <Input
                    type="number"
                    placeholder="0.00"
                    {...field}
                    className={`
                      block w-full rounded-lg border-0 py-2.5 pl-7 pr-3 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 
                      placeholder:text-gray-400 
                      focus:ring-2 focus:ring-inset focus:ring-black 
                      sm:text-sm sm:leading-6 transition-all duration-200 ease-in-out
                      ${fieldState.invalid ? "ring-red-300 focus:ring-red-500 text-red-900 placeholder:text-red-300" : ""}
                    `}
                  />
                </div>

                {/* CHANGED: <p> to <div> to prevent hydration error */}
                {fieldState.invalid && (
                  <div className="mt-2 text-sm text-red-600 animate-pulse">
                     <FieldError errors={[fieldState.error]} />
                  </div>
                )}
              </Field>
            )}
          />

          {/* Use Till Date Field */}
          <Controller
            name="purpose"
            control={form.control}
            render={({ field, fieldState }) => (
              <Field data-invalid={fieldState.invalid} className="space-y-2">
                <FieldLabel className="text-sm font-semibold leading-6 text-gray-900">
                  what did you spend it for
                </FieldLabel>

                <Input
                  type="text"
                  value={
                    field.value
                      ?field.value
                      : ""
                  }
                  onChange={(e) =>
                    field.onChange((e.target.value))
                  }
                  className={`
                    block w-full rounded-lg border-0 py-2.5 px-3 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 
                    placeholder:text-gray-400 
                    focus:ring-2 focus:ring-inset focus:ring-black 
                    sm:text-sm sm:leading-6 transition-all duration-200
                    ${fieldState.invalid ? "ring-red-300 focus:ring-red-500 text-red-900" : ""}
                  `}
                />

            
                {fieldState.invalid && (
                  <div className="mt-2 text-sm text-red-600">
                    <FieldError errors={[fieldState.error]} />
                  </div>
                )}
              </Field>
            )}
          />
        </FieldGroup>

        <div className="pt-2">
          <button
            type="submit"
            className="flex w-full justify-center rounded-lg bg-zinc-900 px-3 py-3 text-sm font-semibold leading-6 text-white shadow-sm hover:bg-zinc-800 hover:shadow-lg focus-visible:outline  focus-visible:outline-offset-2 focus-visible:outline-zinc-600 transition-all duration-200 transform active:scale-[0.98] cursor-pointer"
          >
            Add Expense
          </button>
        </div>
      </form>
    </div>
  );
}

export default AddExpenseForm;