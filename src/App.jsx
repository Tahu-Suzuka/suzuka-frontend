import React from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";

// Auth
import AuthLayout from "./layouts/AuthLayout";
import LoginPage from "./pages/Auth/LoginPage";
import RegisterPage from "./pages/Auth/RegisterPage";
import Otp from "./components/organisms/Otp";
import ForgotPasswordPage from "./pages/Auth/ForgotPasswordPage";

// Home
import AppLayout from "./layouts/AppLayout";
import HomePage from "./pages/HomePage";
import AboutPage from "./pages/AboutPage";
import ProductPage from "./pages/ProductPage";
import DetailProductPage from "./pages/DetailProductPage";
import ProfilePage from "./pages/ProfilePage";

// Checkout
import CheckoutLayout from "./layouts/CheckoutLayout";
import CheckoutPage from "./pages/CheckoutPage";

// sementara

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
import CustomerContent from "./components/organisms/dashboard/CustomerContent";
import VoucherContent from "./components/organisms/dashboard/VoucherContent";
import SalesContent from "./components/organisms/dashboard/SalesContent";
import ReviewContent from "./components/organisms/dashboard/ReviewContent";
import AddOrderPage from "./pages/Dashboard/orders/AddOrderPage";
import ReadOrderPage from "./pages/Dashboard/orders/ReadOrderPage";
import AddProductPage from "./pages/Dashboard/products/AddProductPage";
import EditProductPage from "./pages/Dashboard/products/EditProductPage";

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
          <Route path="customer" element={<CustomerContent />} />
          <Route path="voucher" element={<VoucherContent />} />
          <Route path="sales" element={<SalesContent />} />
          <Route path="review" element={<ReviewContent />} />
          <Route path="add-order" element={<AddOrderPage />} />
          <Route path="order/:id" element={<ReadOrderPage />} />
          <Route path="add-product" element={<AddProductPage />} />
          <Route path="edit-product/:id" element={<EditProductPage />} />
        </Route>

        {/* Public Layout */}
        <Route path="/" element={<AppLayout />}>
          <Route index element={<HomePage />} />
          <Route path="about" element={<AboutPage />} />
          <Route path="product" element={<ProductPage />} />
          <Route path="detail-product" element={<DetailProductPage />} />
          <Route path="profile" element={<ProfilePage />} />
        </Route>

        {/* Checkout Layout */}
        <Route element={<CheckoutLayout />}>
          <Route path="checkout" element={<CheckoutPage />} />
        </Route>

        {/* Security Check */}
        <Route element={<SecurityLayout />}>
          <Route path="/security-check" element={<SecurityCheck />} />
          <Route path="/security-password" element={<SecurityPassword />} />
          <Route path="/security-failed" element={<SecurityFailed />} />
        </Route>

        {/* Auth Layout */}
        <Route path="/" element={<AuthLayout />}>
          {" "}
          <Route path="login" element={<LoginPage />} />
          <Route path="register" element={<RegisterPage />} />
          <Route path="otp" element={<Otp />} />
          <Route path="forgot-password" element={<ForgotPasswordPage />} />
        </Route>

        <Route path="/error" element={<ErrorPage />} />
      </Routes>
    </BrowserRouter>
  );
};

export default App;
