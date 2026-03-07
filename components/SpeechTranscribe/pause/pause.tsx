"use client"


import { PauseIcon } from "../PauseIcon";



import React from 'react';


interface Button {
    handleClick: () => void;
}


const Pause: React.FC<Button> = ({ handleClick }) => {
    return (
       
            <button onClick={handleClick} className='cursor-pointer w-16 h-16 rounded-full bg-black text-white hover:scale-105 transition'>
                <PauseIcon />
            </button>
        
    )
}

export default Pause;

