import React from "react";

export default function InputField({
  id,
  label,
  placeholder,
  value,
  onChange,
  icon: Icon,
  type = "text",
  variant = "auth",
}) {
  const isAuth = variant === "auth";

  const inputClass = isAuth
    ? "py-4 pl-12 pr-5 border-2 rounded-full"
    : "px-4 py-2 border rounded-md focus:ring-1 focus:ring-primary";

  const labelClass = isAuth
    ? "absolute -top-2 left-12 px-1 bg-white text-sm font-bold text-gray-400 z-10"
    : "block text-sm text-gray-700 font-bold mb-1";

  return (
    <div className={`relative w-full mb-4 ${isAuth ? "" : ""}`}>
      <label htmlFor={id} className={labelClass}>
        {label}
      </label>

      {isAuth && Icon && (
        <Icon className="absolute left-4 top-1/2 transform -translate-y-1/2 text-gray-400" />
      )}

      <input
        id={id}
        type={type}
        placeholder={placeholder}
        value={value}
        onChange={onChange}
        className={`w-full text-sm border-gray-300 bg-white text-gray-700 focus:outline-none ${inputClass}`}
      />
    </div>
  );
}
