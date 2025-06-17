import React from "react";
import { useLocation } from "react-router-dom";

const SecurityNavbar = () => {
  const location = useLocation();

  // Tentukan teks berdasarkan pathname
  const title =
    location.pathname === "/security-password"
      ? "Kata Sandi"
      : "Pemeriksaan Keamanan";

  return (
    <nav className="bg-white py-5 shadow-sm">
      <div className="container mx-auto px-4 flex items-center justify-center gap-5">
        <img src="/images/logo/logo.png" alt="Logo" className="h-8 w-8" />
        <h1 className="text-xl lg:text-2xl font-semibold">{title}</h1>
      </div>
    </nav>
  );
};

export default SecurityNavbar;
