import React from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";

// Auth
import LoginPage from "./pages/Auth/LoginPage";
import RegisterPage from "./pages/Auth/RegisterPage";
import AuthLayout from "./layout/AuthLayout";

// Home
import AppLayout from "./layout/AppLayout";
import HomePage from "./pages/HomePage";
import AboutPage from "./pages/AboutPage";
import ProductPage from "./pages/ProductPage";

// Dashboard
import DashboardPage from "./pages/Dashboard/DashboardPage";
import DashboardLayout from "./layout/dashboard/DashboardLayout";

const App = () => {
  return (
    <BrowserRouter>
      <Routes>
        {/* Public Layout */}
        <Route path="/" element={<AppLayout />}>
          <Route index element={<HomePage />} />
          <Route path="/AboutPage" element={<AboutPage />} />
          <Route path="/ProductPage" element={<ProductPage />} />
        </Route>

        {/* Dashboard Layout */}
        <Route path="/" element={<DashboardLayout />}>
          <Route path="/dashboard" element={<DashboardPage />} />
        </Route>

        {/* Auth Layout */}
        <Route path="/" element={<AuthLayout />}>
          <Route path="/login" element={<LoginPage />} />
          <Route path="/register" element={<RegisterPage />} />
        </Route>
      </Routes>
    </BrowserRouter>
  );
};

export default App;
