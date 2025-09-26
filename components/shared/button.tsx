import React, { ButtonHTMLAttributes } from "react";

type ButtonProps = {
  children: React.ReactNode;
  className?: string;
  inverted?: boolean;
  loading?: boolean;
  type?: "button" | "submit" | "reset";
  onClick?: (e: React.MouseEvent<HTMLButtonElement>) => void;
};

function Button({
  children,
  className,
  inverted,
  loading,
  type = "button",
  onClick,
}: ButtonProps) {
  return (
    <button
      type={type}
      onClick={onClick}
      disabled={loading}
      className={`uppercase cursor-pointer ${
        inverted
          ? "bg-yellow-500 text-black hover:bg-red-600 hover:text-white"
          : "bg-red-600 text-white hover:bg-yellow-500 hover:text-black"
      } px-3 py-1 text-sm transition ${className}`}
    >
      {loading ? "Loading" : children}
    </button>
  );
}

export default Button;
