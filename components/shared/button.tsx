import React from 'react'

function Button({
  children,
  className,
  inverted,
  onClick,
}: {
  children: React.ReactNode;
  className?: string;
  inverted?: boolean;
  onClick?: (e: React.MouseEvent<HTMLButtonElement>) => void;
}) {
  return (
    <button
      onClick={onClick}
      className={`uppercase cursor-pointer ${
        inverted
          ? "bg-yellow-500 text-black hover:bg-red-600 hover:text-white"
          : "bg-red-600 text-white hover:bg-yellow-500 hover:text-black"
      } px-3 py-1 text-sm transition ${className}`}
    >
      {children}
    </button>
  );
}

export default Button