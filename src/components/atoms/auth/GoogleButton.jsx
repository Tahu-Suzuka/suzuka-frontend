import React from "react";
import { FcGoogle } from "react-icons/fc";
import { API_URL } from "../../../services/API";

export default function GoogleButton({ text = "Login Dengan Google" }) {
  const handleGoogleLogin = () => {
    window.location.href = `${API_URL}/auth/google`;
  };

  return (
    <button
      type="button"
      onClick={handleGoogleLogin}
      className="w-full flex items-center justify-center border-2 border-gray-300 rounded-xl py-2 px-4 text-sm text-gray-700 font-semibold hover:bg-gray-100 transition duration-300"
    >
      <FcGoogle className="w-5 h-5 mr-2" />
      {text}
    </button>
  );
}
