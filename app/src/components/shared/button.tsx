import React from 'react'

function Button({ children, className, onClick }: { children: React.ReactNode, className?: string, onClick?: () => void }) {
  return (
    <button onClick={onClick} className={`uppercase cursor-pointer bg-red-600 text-white px-3 py-1 text-sm hover:bg-yellow-400 hover:text-black transition rounded ${className}`}>
      {children}
    </button>
  )
}

export default Button