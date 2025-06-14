import React from "react";
import { FiLock, FiEye, FiEyeOff } from "react-icons/fi";

export default function PasswordField({
  id = "password",
  label = "Kata Sandi",
  showPassword,
  toggleVisibility,
  value,
  onChange,
}) {
  return (
    <div className="relative w-full mb-4">
      <label
        htmlFor={id}
        className="absolute -top-2 left-12 px-1 bg-white text-gray-400 text-sm font-bold z-10"
      >
        {label}
      </label>
      <FiLock className="absolute left-4 top-1/2 transform -translate-y-1/2 text-gray-400" />
      <input
        id={id}
        type={showPassword ? "text" : "password"}
        placeholder={`Masukkan ${label.toLowerCase()}`}
        value={value}
        onChange={onChange}
        className="w-full py-4 pl-12 pr-10 text-sm border-2 border-gray-300 rounded-full bg-white text-gray-700 focus:outline-none"
      />
      <button
        type="button"
        onClick={toggleVisibility}
        className="absolute right-4 top-1/2 transform -translate-y-1/2 text-gray-500"
      >
        {showPassword ? <FiEyeOff size={18} /> : <FiEye size={18} />}
      </button>
    </div>
  );
}
