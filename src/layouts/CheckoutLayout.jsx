import React from "react";
import { Outlet } from "react-router-dom";
import WaveFooter from "../components/organisms/Footer";

const CheckoutLayout = () => {
  return (
    <div className="bg-gray-100 min-h-screen pb-32">
      {/* Header */}
      <div className="bg-white px-6 lg:px-20 py-4 shadow flex items-center gap-3">
        <img src="/images/logo/logo.png" alt="Logo" className="w-10 h-10" />
        <h1 className="text-lg lg:text-xl font-bold text-red-600">
          Total Pembayaran
        </h1>
      </div>
      <main>
        <Outlet />
      </main>
      <div className="mt-30">
        <WaveFooter />
      </div>
    </div>
  );
};

export default CheckoutLayout;
