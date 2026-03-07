"use client"

import React from "react";
import { useRouter } from "next/navigation";

const AddGoal = () => {
  const router = useRouter();

  return (
    <button
      onClick={() => router.push("/pages/saveGoal")}
      type="button"
      className="group relative z-20 inline-flex items-center justify-center gap-2 rounded-full bg-zinc-900 px-6 py-2.5 text-sm font-semibold text-white shadow-md transition-all duration-200 hover:bg-zinc-800 hover:shadow-lg hover:-translate-y-0.5 focus:outline-none focus:ring-2 focus:ring-zinc-900 focus:ring-offset-2"
    >
      {/* Plus Icon constructed with CSS for pixel perfection */}
      <span className="flex h-5 w-5 items-center justify-center rounded-full bg-white/20 transition-colors group-hover:bg-white/30">
        <svg
          xmlns="http://www.w3.org/2000/svg"
          fill="none"
          viewBox="0 0 24 24"
          strokeWidth={2.5}
          stroke="currentColor"
          className="h-3.5 w-3.5"
        >
          <path strokeLinecap="round" strokeLinejoin="round" d="M12 4.5v15m7.5-7.5h-15" />
        </svg>
      </span>
      
      <span>Add Goal</span>
    </button>
  );
};

export default AddGoal;
