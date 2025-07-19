import React, { useState, useEffect } from "react";
import { Outlet } from "react-router-dom";

const AuthLayout = () => {
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
    <div>
      <main>
        <Outlet />
      </main>
    </div>
  );
};

export default AuthLayout;
