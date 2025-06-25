import React from "react";
import DashboardSidebar from "../../components/organisms/sidebar/DashboardSidebar";
import Header from "../../components/organisms/dashboard/Header";
import { Outlet } from "react-router-dom";

export default function DashboardLayout() {
  return (
    <div className="min-h-screen flex">
      <DashboardSidebar />
      <div className="flex-1 flex flex-col">
        <Header />
        <main className="p-4 lg:ml-64 bg-gray-100 flex-1">
          <Outlet />
        </main>
      </div>
    </div>
  );
}
