import React from "react";
import Sidebar from "../../components/organisms/dashboard/Sidebar";
import Header from "../../components/organisms/dashboard/Header";
import { Outlet } from "react-router-dom";

export default function DashboardLayout() {
  return (
    <div className="min-h-screen flex">
      <Sidebar />
      <div className="flex-1 flex flex-col">
        <Header />
        <main className="p-4 lg:ml-64 bg-gray-100 flex-1">
          <Outlet />
        </main>
      </div>
    </div>
  );
}
