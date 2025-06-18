// layouts/SecurityLayout.jsx
import React from "react";
import { Outlet } from "react-router-dom";
import SecurityNavbar from "../components/organisms/SecurityNavbar";
import WaveFooter from "../components/organisms/Footer";

const SecurityLayout = () => {
  return (
    <div className="min-h-screen bg-[#F3F4F6]">
      <SecurityNavbar />
      <main>
        <Outlet />
      </main>
      <div className="mt-32">
        <WaveFooter />
      </div>
    </div>
  );
};

export default SecurityLayout;
