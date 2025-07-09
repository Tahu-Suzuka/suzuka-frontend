import React from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import ProtectedRoute from "./components/ProtectedRoute";

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

// Settings
import ProfilePage from "./pages/ProfilePage";
import OrderPage from "./pages/OrderPage";
import ChangePasswordPage from "./pages/ChangePasswordPage";

// Checkout
import CheckoutLayout from "./layouts/CheckoutLayout";
import CheckoutPage from "./pages/CheckoutPage";

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
import AddOrderPage from "./pages/Dashboard/order/AddOrderPage";
import ReadOrderPage from "./pages/Dashboard/order/ReadOrderPage";
import AddProductPage from "./pages/Dashboard/product/AddProductPage";
import EditProductPage from "./pages/Dashboard/product/EditProductPage";
import AddVoucherPage from "./pages/Dashboard/voucher/AddVoucherPage";
import EditVoucherPage from "./pages/Dashboard/voucher/EditVoucherPage";
import AddCustomerPage from "./pages/Dashboard/customer/AddCustomerPage";
import EditCustomerPage from "./pages/Dashboard/customer/EditCustomerPage";
import AddCategoryPage from "./pages/Dashboard/category/AddCategoryPage";
import EditCategoryPage from "./pages/Dashboard/category/EditCategoryPage";

// Error Pages
import ErrorPage from "./pages/ErrorPage";
import ChangePassword from "./pages/ChangePasswordPage";
import SettingLayout from "./layouts/SettingLayout";

const App = () => {
  return (
    <BrowserRouter>
      <Routes>
        {/* Dashboard Layout */}
        <Route
          path="/dashboard"
          element={
            <ProtectedRoute>
              <DashboardLayout />
            </ProtectedRoute>
          }
        >
          <Route index element={<DashboardPage />} />
          <Route path="orderDashboard" element={<OrderContent />} />
          <Route path="productDashboard" element={<ProductContent />} />
          <Route path="categoryDashboard" element={<CategoryContent />} />
          <Route path="customerDashboard" element={<CustomerContent />} />
          <Route path="voucherDashboard" element={<VoucherContent />} />
          <Route path="salesDashboard" element={<SalesContent />} />
          <Route path="revieDashboard" element={<ReviewContent />} />
          <Route path="add-order" element={<AddOrderPage />} />
          <Route path="order/:id" element={<ReadOrderPage />} />
          <Route path="add-product" element={<AddProductPage />} />
          <Route path="edit-product/:id" element={<EditProductPage />} />
          <Route path="add-voucher" element={<AddVoucherPage />} />
          <Route path="edit-voucher/:id" element={<EditVoucherPage />} />
          <Route path="add-customer" element={<AddCustomerPage />} />
          <Route path="edit-customer/:id" element={<EditCustomerPage />} />
          <Route path="add-category" element={<AddCategoryPage />} />
          <Route path="edit-category/:id" element={<EditCategoryPage />} />
        </Route>

        {/* Public Layout */}
        <Route path="/" element={<AppLayout />}>
          <Route index element={<HomePage />} />
          <Route path="about" element={<AboutPage />} />
          <Route path="product" element={<ProductPage />} />
          <Route path="/produk/:id" element={<DetailProductPage />} />
        </Route>

        {/* Setting Layout */}
        <Route element={<SettingLayout />}>
          <Route path="/profile" element={<ProfilePage />} />
          <Route path="/order" element={<OrderPage />} />
          <Route path="/changePassword" element={<ChangePasswordPage />} />
        </Route>

        {/* Checkout Layout */}
        <Route element={<CheckoutLayout />}>
          <Route path="checkout" element={<CheckoutPage />} />
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
