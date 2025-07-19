import React, { useState, useEffect } from "react";
import { Outlet } from "react-router-dom";

import Header from "../components/atoms/Header";
import SettingSidebar from "../components/organisms/sidebar/SettingSidebar";
import Navbar from "../components/organisms/Navbar.jsx";
import WaveFooter from "../components/organisms/Footer.jsx";

const SettingLayout = () => {
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
    <div className="flex flex-col min-h-screen">
      <Navbar />
      <div className="min-h-screen bg-[#F3F4F6] mb-40">
        <Header imageSrc="/images/product/header.png" />
        <div className="max-w-6xl mx-auto grid grid-cols-1 md:grid-cols-4 gap-6 pb-32 p-6">
          <div className="lg:col-span-1">
            <SettingSidebar />
          </div>
          <div className="lg:col-span-3 bg-white rounded-md">
            <Outlet />
          </div>
        </div>
      </div>
      <div className="-mt-64">
        <WaveFooter showGrayBackground={true} />
      </div>
    </div>
  );
};

export default SettingLayout;
