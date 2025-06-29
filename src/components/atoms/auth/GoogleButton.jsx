import React from "react";
import { FcGoogle } from "react-icons/fc";

export default function GoogleButton({ text = "Login Dengan Google" }) {
  return (
    <button
      type="button"
      className="w-full flex items-center justify-center border-2 border-gray-300 rounded-full py-2 px-4 text-sm text-gray-700 font-semibold hover:bg-gray-100 transition duration-300"
    >
      <FcGoogle className="w-5 h-5 mr-2" />
      {text}
    </button>
  );
}
