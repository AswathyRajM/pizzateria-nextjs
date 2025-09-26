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
      className={`py-1 bg-gray-700 cursor-pointer px-3 text-xl hover:text-white ${className}`}
      onClick={onClick}
    >
      {children}
    </button>
  );
}

export default QuantityButton;
