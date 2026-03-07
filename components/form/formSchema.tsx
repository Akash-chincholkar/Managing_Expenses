"use client"

import { useForm, Controller } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod"
import { Input } from "@/components/ui/input"
import { saveGoal } from "@/lib/fetchgoal";
import Link from "next/link";
import { useRouter } from "next/navigation";
import {
  Field,
  FieldError,
  FieldGroup,
  FieldLabel,
} from "@/components/ui/field"
import { goalSchema, GoalInput, GoalData } from "./zod";

const today = new Date();
const formatted=today.toISOString().split("T")[0];
console.log(formatted);

const AddgoalForm = () => {
  const router= useRouter();
  const form = useForm<GoalInput, any, GoalData>({
    resolver: zodResolver(goalSchema),
    defaultValues: {
      amount: "",
      use_till: today,
    },
  });

  function Navigatehome(){
     return router.push("/");
  }

  function onSubmit(data: GoalData) {
    
    const date=new Date(data.use_till)
    const end_date=date.toISOString().split("T")[0];
    console.log(end_date);
    const goal=data.amount;
    const res=  saveGoal({amount:goal,use_till:end_date});
    console.log(res)
      Navigatehome();
    console.log("SUBMIT CALLED");

  }

  return (
    <div className="flex justify-center items-center min-h-screen bg-gray-50/50 px-4 py-12 sm:px-6 lg:px-8">
      
      <form
        onSubmit={form.handleSubmit(onSubmit)}
        className="w-full max-w-md space-y-8 bg-white p-10 shadow-xl ring-1 ring-gray-900/5 rounded-2xl sm:p-12"
      >
        <div className="space-y-2 text-center sm:text-left">
          <h2 className="text-2xl font-bold tracking-tight text-gray-900">
            Set a New Goal
          </h2>
          <p className="text-sm text-gray-500">
            Define your target amount and timeline below.
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
                  Target Amount
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
            name="use_till"
            control={form.control}
            render={({ field, fieldState }) => (
              <Field data-invalid={fieldState.invalid} className="space-y-2">
                <FieldLabel className="text-sm font-semibold leading-6 text-gray-900">
                  Target Date
                </FieldLabel>

                <Input
                  type="date"
                  value={
                    field.value
                      ? new Date(field.value).toISOString().split("T")[0]
                      : ""
                  }
                  onChange={(e) =>
                    field.onChange(new Date(e.target.value))
                  }
                  className={`
                    block w-full rounded-lg border-0 py-2.5 px-3 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 
                    placeholder:text-gray-400 
                    focus:ring-2 focus:ring-inset focus:ring-black 
                    sm:text-sm sm:leading-6 transition-all duration-200
                    ${fieldState.invalid ? "ring-red-300 focus:ring-red-500 text-red-900" : ""}
                  `}
                />

                {/* CHANGED: <p> to <div> to prevent hydration error */}
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
            Save Goal
          </button>
          
        </div>
      </form>
    </div>
  );
}

export default AddgoalForm;
