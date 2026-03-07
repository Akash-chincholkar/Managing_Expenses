"use client";

import { useState, useRef, useEffect } from "react";
import handleConfirm from "@/lib/postexpense";

interface TextProps {
  text: string;
}

const DisplayText: React.FC<TextProps> = ({ text: initialText }) => {
  // Local state to manage the editable text
  const [editableText, setEditableText] = useState(initialText);
  const textareaRef = useRef<HTMLTextAreaElement>(null);

  // Auto-resize the textarea height to fit content
  useEffect(() => {
    if (textareaRef.current) {
      textareaRef.current.style.height = "auto";
      textareaRef.current.style.height = textareaRef.current.scrollHeight + "px";
    }
  }, [editableText]);

  return (
    <div className="fixed inset-0 z-50 flex flex-col items-center justify-center bg-zinc-950/60 backdrop-blur-sm transition-all duration-300 p-4">
      
      {/* Card */}
      <div className="relative w-full max-w-lg overflow-hidden rounded-3xl bg-white/95 p-8 text-center shadow-2xl shadow-black/10 backdrop-blur-xl ring-1 ring-white/50 transition-all sm:p-10">
        
        {/* Background Ambient Glow */}
        <div className="absolute -top-20 -left-20 h-40 w-40 rounded-full bg-indigo-500/10 blur-3xl pointer-events-none"></div>
        <div className="absolute -bottom-20 -right-20 h-40 w-40 rounded-full bg-rose-500/10 blur-3xl pointer-events-none"></div>

        {/* Header Label */}
        <h2 className="mb-2 text-xs font-bold uppercase tracking-[0.2em] text-zinc-400 select-none">
          Review & Edit
        </h2>

        {/* Editable Input Area */}
        <div className="relative group mb-8 mt-4 flex justify-center">
          
          {/* Visual Quote Marks */}
          <span className="absolute -left-2 -top-4 text-4xl text-zinc-200 select-none font-serif">“</span>
          
          <textarea
            ref={textareaRef}
            value={editableText}
            onChange={(e) => setEditableText(e.target.value)}
            rows={1}
            className="
              w-full resize-none overflow-hidden bg-transparent text-center 
              text-2xl font-medium leading-relaxed text-zinc-800 
              placeholder-zinc-300 focus:outline-none focus:ring-0
              selection:bg-indigo-100 selection:text-indigo-900
              md:text-3xl
            "
            spellCheck="false"
          />
          
          <span className="absolute -bottom-4 -right-2 text-4xl text-zinc-200 select-none font-serif">”</span>

          {/* Edit Hint (appears on hover) */}
          <div className="absolute -bottom-6 opacity-0 transition-opacity duration-300 group-hover:opacity-100">
             <span className="text-[10px] uppercase tracking-widest text-zinc-300">Click text to edit</span>
          </div>
        </div>

        {/* Action Area */}
        <div className="flex flex-col items-center justify-center gap-3 sm:flex-row sm:gap-6">
          
          {/* Secondary Action */}
          <button
            onClick={() => window.location.reload()}
            className="
              order-2 sm:order-1
              group rounded-full px-6 py-3 text-xs font-bold uppercase tracking-widest text-zinc-400 
              transition-all duration-300 
              hover:bg-zinc-50 hover:text-zinc-600
            "
          >
            Cancel
          </button>

          {/* Primary Action */}
          <button
            onClick={() => handleConfirm(editableText)} // Passing the NEW text
            className="
              order-1 sm:order-2
              group relative flex w-full sm:w-40 items-center justify-center gap-2 rounded-full 
              bg-zinc-900 py-4 text-sm font-semibold tracking-wider text-zinc-50 shadow-lg 
              transition-all duration-300 ease-out
              hover:scale-[1.02] hover:bg-zinc-800 hover:shadow-xl hover:shadow-zinc-500/20
              active:scale-95
            "
          >
            <span>Confirm</span>
            <svg 
              className="h-4 w-4 transition-transform duration-300 group-hover:translate-x-1" 
              fill="none" viewBox="0 0 24 24" stroke="currentColor"
            >
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M14 5l7 7m0 0l-7 7m7-7H3" />
            </svg>
          </button>

        </div>
      </div>
    </div>
  );
};

export default DisplayText;



