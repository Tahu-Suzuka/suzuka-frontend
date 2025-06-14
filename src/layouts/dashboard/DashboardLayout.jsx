import React, { useState } from "react";
import Header from "../../components/organisms/dashboard/header/Header";
import Sidebar from "../../components/organisms/dashboard/sidebar/Sidebar";

export default function DashboardLayout({ children }) {
  const [open, setOpen] = useState(true);

  return (
    <div className="min-h-screen flex">
      <Sidebar open={open} setOpen={setOpen} />
      <div className="flex-1 flex flex-col">
        <Header open={open} onToggleSidebar={() => setOpen(!open)} />
        <main className="mt-16 p-4">{children}</main>
      </div>
    </div>
  );
}
