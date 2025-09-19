import React from "react";

function QuantityButton({
  onClick,
  className,
  children,
}: {
  onClick: () => void;
  className?: string;
  children: React.ReactNode;
}) {
  return (
    <button
      className={`cursor-pointer px-3 text-2xl border border-gray-400 hover:text-white hover:border-white ${className}`}
      onClick={onClick}
    >
      {children}
    </button>
  );
}

export default QuantityButton;
