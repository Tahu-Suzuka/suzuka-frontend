import React, { useEffect } from "react";
import Navbar from "../components/navbar/Navbar.jsx";
import WaveFooter from "../components/footer/Footer.jsx";
import { Outlet } from "react-router-dom";

const AppLayout = () => {
  return (
    <div className="flex flex-col min-h-screen">
      <Navbar />
      <main id="maincontent" className="flex-grow">
        <Outlet />
      </main>
      <WaveFooter />
    </div>
  );
};

export default AppLayout;
