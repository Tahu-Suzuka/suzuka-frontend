import React from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";

// Auth
import LoginPage from "./pages/Auth/LoginPage";
import RegisterPage from "./pages/Auth/RegisterPage";
import AuthLayout from "./layouts/AuthLayout";

// Home
import AppLayout from "./layouts/AppLayout";
import HomePage from "./pages/HomePage";
import AboutPage from "./pages/AboutPage";
import ProductPage from "./pages/ProductPage";
import DetailProductPage from "./pages/DetailProductPage";
import ProfilePage from "./pages/ProfilePage";

// Security Check
import SecurityLayout from "./layouts/SecurityLayout";
import SecurityCheck from "./pages/SecurityCheck";
import SecurityPassword from "./pages/SecurityPassword";

// Dashboard
import DashboardPage from "./pages/Dashboard/DashboardPage";
import DashboardLayout from "./layouts/dashboard/DashboardLayout";
import { Check } from "lucide-react";

const App = () => {
  return (
    <BrowserRouter>
      <Routes>
        {/* Public Layout */}
        <Route path="/" element={<AppLayout />}>
          <Route index element={<HomePage />} />
          <Route path="/about" element={<AboutPage />} />
          <Route path="/product" element={<ProductPage />} />
          <Route path="/detail-product" element={<DetailProductPage />} />
          <Route path="/profile" element={<ProfilePage />} />
        </Route>

        {/* Security Check */}
        <Route element={<SecurityLayout />}>
          <Route path="/security-check" element={<SecurityCheck />} />
          <Route path="/security-password" element={<SecurityPassword />} />
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
