"use client";


import { useState } from "react";
interface InputProps{
    value:number;
      setValue: (value: number | "") => void,
}

const NumberInputwithClear:React.FC<InputProps>=({value,setValue})=>{
  
    return (
        <div>
            <input
            type="number"
            value={value}
            onChange={(e)=>setValue(Number(e.target.value))}
            placeholder="Enter amount"
            ></input>
            {
                value && (
                    <button
                    onClick={()=>setValue("")}>x</button>
                )
            }
        </div>
    )
    
}
export default NumberInputwithClear;