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

// sementara
import Otp from "./components/organisms/Otp";

// Security Check
import SecurityLayout from "./layouts/SecurityLayout";
import SecurityCheck from "./pages/SecurityCheck";
import SecurityPassword from "./pages/SecurityPassword";
import SecurityFailed from "./pages/SecurityFailed";

// Dashboard
import DashboardPage from "./pages/Dashboard/DashboardPage";
import DashboardLayout from "./layouts/dashboard/DashboardLayout";
import OrderContent from "./components/organisms/dashboard/OrderContent";
import ProductContent from "./components/organisms/dashboard/ProductContent";
import CategoryContent from "./components/organisms/dashboard/CategoryContent";

// Error Pages
import ErrorPage from "./pages/ErrorPage";

const App = () => {
  return (
    <BrowserRouter>
      <Routes>
        {/* Dashboard Layout */}
        <Route path="/dashboard" element={<DashboardLayout />}>
          <Route index element={<DashboardPage />} />
          <Route path="order" element={<OrderContent />} />
          <Route path="product" element={<ProductContent />} />
          <Route path="category" element={<CategoryContent />} />
        </Route>

        {/* Public Layout */}
        <Route path="/" element={<AppLayout />}>
          <Route index element={<HomePage />} />
          <Route path="about" element={<AboutPage />} />
          <Route path="product" element={<ProductPage />} />
          <Route path="detail-product" element={<DetailProductPage />} />
          <Route path="profile" element={<ProfilePage />} />
          {/* sementara */}
          <Route path="otp" element={<Otp />} />
        </Route>

        {/* Security Check */}
        <Route element={<SecurityLayout />}>
          <Route path="/security-check" element={<SecurityCheck />} />
          <Route path="/security-password" element={<SecurityPassword />} />
          <Route path="/security-failed" element={<SecurityFailed />} />
        </Route>

        {/* Auth Layout */}
        <Route path="/" element={<AuthLayout />}>
          <Route path="login" element={<LoginPage />} />
          <Route path="register" element={<RegisterPage />} />
        </Route>

        <Route path="/error" element={<ErrorPage />} />
      </Routes>
    </BrowserRouter>
  );
};

export default App;
