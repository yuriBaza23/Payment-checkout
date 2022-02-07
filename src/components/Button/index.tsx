import React, { ButtonHTMLAttributes } from "react";

interface IButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  buttonBackground?: string; 
}

function Button({ buttonBackground, ...rest }: IButtonProps) {
  return (
    <button className={`
      w-full 
      h-12 
      ${buttonBackground || 'bg-blue-checkout'} 
      rounded-md 
      text-white 
      font-semibold
      transition-all 
      duration-300
      hover:opacity-90 
      focus:outline-none 
      focus-visible:ring
      focus:ring`
    } {...rest}/>
  )
}

export { Button };