// layouts/SecurityLayout.jsx
import React from "react";
import { Outlet } from "react-router-dom";
import SecurityNavbar from "../components/organisms/SecurityNavbar";

const SecurityLayout = () => {
  return (
    <div className="min-h-screen bg-[#F3F4F6]">
      <SecurityNavbar />
      <main>
        <Outlet />
      </main>
    </div>
  );
};

export default SecurityLayout;
