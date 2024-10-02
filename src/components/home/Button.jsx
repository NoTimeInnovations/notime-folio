import React from 'react'

const Button = ({text,gradient , onClick , disabled}) => {
  return (
    <button onClick={onClick} className={`${gradient} ${disabled ? 'pointer-events-none opacity-50' : ''} w-full select-none cursor-pointer flex gap-4 items-center p-3 px-10 text-nowrap text-lg font-medium rounded-md justify-center`}>
        {text}
        <img src='/arrow-right.svg' alt="arrow-right" className='w-5' />    
    </button>
  )
}

export default Button