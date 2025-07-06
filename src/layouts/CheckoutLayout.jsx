import React from "react";
import { Outlet } from "react-router-dom";
import { Link } from "react-router-dom";

const CheckoutLayout = () => {
  return (
    <div className="bg-gray-100 min-h-screen pb-32">
      {/* Header */}
      <div className="bg-white px-6 lg:px-20 py-4 shadow flex items-center gap-3">
        <Link to="/">
          <img src="/images/logo/logo.png" alt="Logo" className="w-10 h-10" />
        </Link>
        <h1 className="text-lg lg:text-xl font-bold text-red-600">
          Total Pembayaran
        </h1>
      </div>
      <main>
        <Outlet />
      </main>
    </div>
  );
};

export default CheckoutLayout;
