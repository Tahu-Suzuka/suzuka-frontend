// components/Button.jsx
import React from "react";

export default function Button({
  type = "button",
  text,
  onClick,
  width = "w-full",
  py = "py-3",
  className = "",
}) {
  return (
    <button
      type={type}
      onClick={onClick}
      className={`${width} ${py} bg-primary text-white rounded-full font-semibold hover:bg-indigo-600 transition duration-300 ${className}`}
    >
      {text}
    </button>
  );
}
