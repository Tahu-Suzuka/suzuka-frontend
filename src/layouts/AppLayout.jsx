import React, { useState, useEffect } from "react";
import Navbar from "../components/organisms/Navbar.jsx";
import WaveFooter from "../components/organisms/Footer.jsx";
import { Outlet, useLocation } from "react-router-dom";

const AppLayout = () => {
  const [loading, setLoading] = useState(true);
  const location = useLocation();

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

  const isDetailProductPage = location.pathname.startsWith("/produk/");

  return (
    <div className="flex flex-col min-h-screen">
      <Navbar />
      <main id="maincontent" className="flex-grow">
        <Outlet />
      </main>
      <div className="-mt-28">
        {isDetailProductPage ? (
          <WaveFooter showGrayBackground={true} />
        ) : (
          <WaveFooter />
        )}
      </div>
    </div>
  );
};

export default AppLayout;
