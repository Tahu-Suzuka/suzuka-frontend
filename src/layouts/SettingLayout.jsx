import React from "react";
import { Outlet } from "react-router-dom";

import Header from "../components/atoms/Header";
import SettingSidebar from "../components/organisms/sidebar/SettingSidebar";
import Navbar from "../components/organisms/Navbar.jsx";
import WaveFooter from "../components/organisms/Footer.jsx";

const SettingLayout = () => {
  return (
    <div className="flex flex-col min-h-screen">
      <Navbar />
      <div className="min-h-screen bg-[#F3F4F6]">
        <Header imageSrc="/images/product/header.png" title="Profil" />
        <div className="max-w-6xl mx-auto grid grid-cols-1 md:grid-cols-4 gap-6 pb-32 p-6">
          <div className="lg:col-span-1">
            <SettingSidebar />
          </div>
          <div className="lg:col-span-3 bg-white rounded-md">
            <Outlet />
          </div>
        </div>
      </div>
      <div className="-mt-28">
        <WaveFooter />
      </div>
    </div>
  );
};

export default SettingLayout;
