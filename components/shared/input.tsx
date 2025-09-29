import React from "react";

type InputProps = {
  name: string;
  value: string;
  onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  placeholder?: string;
  type?: string;
  required?: boolean;
  className?: string;
};

export default function Input({
  name,
  value,
  onChange,
  placeholder,
  type = "text",
  required = false,
  className = "",
}: InputProps) {
  return (
    <input
      name={name}
      value={value}
      onChange={onChange}
      placeholder={placeholder}
      type={type}
      required={required}
      className={`p-2 border border-gray-500 rounded ${className}`}
    />
  );
}
