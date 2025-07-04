import React from "react";
import { Link } from "react-router-dom";

export default function Button({
  type = "button",
  text,
  children,
  onClick,
  to,
  width = "w-full",
  bgColor = "bg-primary",
  textColor = "text-white",
  className = "",
}) {
  const baseClass = `
    inline-flex items-center justify-center gap-2
    font-semibold transition duration-300 text-sm 
    hover:bg-secondary
    ${width} ${bgColor} ${textColor} ${className}
  `.trim();

  if (to) {
    return (
      <Link to={to} className={baseClass}>
        {children}
        {text}
      </Link>
    );
  }

  return (
    <button type={type} onClick={onClick} className={baseClass}>
      {children}
      {text}
    </button>
  );
}
