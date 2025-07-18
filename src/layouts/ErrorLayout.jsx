import React from "react";
import { Link } from "react-router-dom";

const ErrorLayout = ({ imageSrc, code, description }) => {
  return (
    <div className="min-h-screen flex flex-col items-center justify-center px-6 text-center space-y-6 bg-gray-50">
      <img
        src={imageSrc}
        alt={`Error ${code}`}
        className="w-64 h-64 object-contain"
      />
      <h1 className="text-5xl font-bold text-primary">{code}</h1>
      <p className="text-gray-500 max-w-md">{description}</p>
      <Link
        to="/"
        className="px-5 py-2 bg-primary text-white rounded-md hover:bg-primary/90 transition"
      >
        Kembali ke Beranda
      </Link>
    </div>
  );
};

export default ErrorLayout;
