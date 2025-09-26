import React from "react";

interface ButtonProps {
  svgImage?: React.ReactNode;
  caption: string;
  onClick?: () => void;
  type?: "button" | "submit" | "reset";
  className?: string;
  disabled?: boolean;
}
  
export default function Button({
  svgImage,
  caption,
  onClick,
  type = "button",
  className = "",
  disabled = false,
}: ButtonProps) {
  return (
    <button
      type={type}
      onClick={onClick}
      disabled={disabled}
      className={`
        px-4 py-2 rounded-lg border border-gray-300 
        text-gray-700 hover:bg-gray-100 
        disabled:opacity-50 disabled:cursor-not-allowed 
        ${className}
      `}
    >
      {svgImage ? svgImage : null}
      {caption}
    </button>
  );
}