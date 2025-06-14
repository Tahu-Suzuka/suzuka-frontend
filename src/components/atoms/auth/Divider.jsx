import React from "react";

export default function Divider() {
  return (
    <div className="flex items-center justify-center">
      <div className="flex-grow h-px bg-gray-300"></div>
      <span className="px-4 text-xs text-gray-500">Atau</span>
      <div className="flex-grow h-px bg-gray-300"></div>
    </div>
  );
}
