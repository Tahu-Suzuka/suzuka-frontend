import React from "react";
import { FiLock, FiEye, FiEyeOff } from "react-icons/fi";

export default function PasswordField({
  id = "password",
  label = "Kata Sandi",
  placeholder = "Masukkan kata sandi",
  showPassword = false,
  toggleVisibility,
  value,
  onChange,
  className = "",
  variant = "auth",
  withIcon = variant === "auth",
}) {
  const isAuth = variant === "auth";
  const inputClass = isAuth
    ? `py-4 ${withIcon ? "pl-12" : "pl-4"} pr-10 border-2 rounded-xl`
    : `${
        withIcon ? "pl-10" : "pl-4"
      } pr-1 py-3 border rounded-md focus:ring-1 focus:ring-primary`;

  const labelClass = isAuth
    ? `absolute -top-2 ${
        withIcon ? "left-12" : "left-4"
      } px-1 bg-white text-gray-400 text-sm font-bold z-10`
    : `block text-sm text-gray-700 font-bold mb-1`;

  const eyeIconClass = isAuth
    ? "absolute inset-y-0 right-0 flex items-center pr-4 text-gray-500"
    : "absolute top-12 right-0 transform -translate-y-1/2 flex items-center pr-4 text-gray-500";

  return (
    <div className="relative w-full mb-4">
      {/* Label */}
      {label && (
        <label htmlFor={id} className={labelClass}>
          {label}
        </label>
      )}

      {withIcon && (
        <FiLock
          className={`absolute top-1/2 transform -translate-y-1/2 text-gray-400 ${
            isAuth ? "left-4" : "left-3"
          }`}
        />
      )}

      {/* Input */}
      <input
        id={id}
        type={showPassword ? "text" : "password"}
        placeholder={placeholder}
        value={value}
        onChange={onChange}
        className={`w-full text-sm border-gray-300 bg-white text-gray-700 focus:outline-none ${inputClass} ${className}`}
      />

      {/* Icon*/}
      {toggleVisibility && (
        <div className={eyeIconClass}>
          <button type="button" onClick={toggleVisibility}>
            {showPassword ? <FiEyeOff size={18} /> : <FiEye size={18} />}
          </button>
        </div>
      )}
    </div>
  );
}
