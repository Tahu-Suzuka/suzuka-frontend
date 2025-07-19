import React, { useState, useEffect } from "react";
import { Outlet, Link } from "react-router-dom";
import { LazyLoadImage } from "react-lazy-load-image-component";
import "react-lazy-load-image-component/src/effects/blur.css";

const CheckoutLayout = () => {
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const timer = setTimeout(() => setLoading(false), 1000);
    return () => clearTimeout(timer);
  }, []);

  if (loading) {
    return (
      <div className="flex items-center justify-center w-screen h-screen bg-gray-100 z-[9999]">
        <img
          src="/images/loading.gif"
          alt="Loading..."
          className="w-64 lg:w-72 h-auto object-contain"
        />
      </div>
    );
  }

  return (
    <div className="bg-gray-100 min-h-screen pb-10">
      {/* Header */}
      <div className="bg-white px-6 lg:px-20 py-4 shadow flex items-center gap-3">
        <Link to="/">
          <LazyLoadImage
            src="/images/logo/logo.png"
            alt="Logo"
            className="w-10 h-10"
            effect="blur"
          />
        </Link>
        <h1 className="text-lg lg:text-xl font-bold text-primary">
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
