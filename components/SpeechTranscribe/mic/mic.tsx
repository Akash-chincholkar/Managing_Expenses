"use client";

import React from 'react';
import { MicIcon } from '../MicIcon';


interface Button{
    handleClick:()=>void;
}


const Mic:React.FC<Button> = ({handleClick}) => {
  return (
   <div className='flex flex-col justify-center items-center gap-2'>
     <button onClick={handleClick} className='cursor-pointer w-16 h-16 rounded-full bg-black text-white hover:scale-105 transition'>
        <MicIcon/>
     </button>
     <p className='text-sm'>Use Ai to add expense</p>
     </div>

   
  )
}

export default Mic;
