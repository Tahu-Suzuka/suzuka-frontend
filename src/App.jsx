import React from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import ProtectedRoute from "./components/ProtectedRoute";

// Auth
import AuthLayout from "./layouts/AuthLayout";
import LoginPage from "./pages/auth/LoginPage";
import RegisterPage from "./pages/auth/RegisterPage";
import Otp from "./components/organisms/Otp";
import ForgotPasswordPage from "./pages/auth/ForgotPasswordPage";

// Home
import AppLayout from "./layouts/AppLayout";
import HomePage from "./pages/HomePage";
import AboutPage from "./pages/AboutPage";
import ProductPage from "./pages/ProductPage";
import DetailProductPage from "./pages/DetailProductPage";

// Settings
import SettingLayout from "./layouts/SettingLayout";
import ProfilePage from "./pages/ProfilePage";
import OrderPage from "./pages/OrderPage";
import ChangePasswordPage from "./pages/ChangePasswordPage";

// Checkout
import CheckoutLayout from "./layouts/CheckoutLayout";
import CheckoutPage from "./pages/CheckoutPage";

// Dashboard
import DashboardPage from "./pages/dashboard/DashboardPage";
import DashboardLayout from "./layouts/dashboard/DashboardLayout";
import OrderDashboardPage from "./pages/dashboard/order/OrderDashboardPage";
import ProductDashboardPage from "./pages/dashboard/product/ProductDashboardPage";
import CategoryPage from "./pages/dashboard/category/CategoryPage";
import CustomerPage from "./pages/dashboard/customer/CustomerPage";
import VoucherPage from "./pages/dashboard/voucher/VoucherPage";
import SalesPage from "./pages/dashboard/SalesPage";
import ReviewPage from "./pages/dashboard/ReviewPage";
import AddOrderPage from "./pages/dashboard/order/AddOrderPage";
import ReadOrderPage from "./pages/dashboard/order/ReadOrderPage";
import AddProductPage from "./pages/dashboard/product/AddProductPage";
import EditProductPage from "./pages/dashboard/product/EditProductPage";
import AddVoucherPage from "./pages/dashboard/voucher/AddVoucherPage";
import EditVoucherPage from "./pages/dashboard/voucher/EditVoucherPage";
import AddCustomerPage from "./pages/dashboard/customer/AddCustomerPage";
import EditCustomerPage from "./pages/dashboard/customer/EditCustomerPage";
import AddCategoryPage from "./pages/dashboard/category/AddCategoryPage";
import EditCategoryPage from "./pages/dashboard/category/EditCategoryPage";

// Error Pages
import NotFoundPage from "./pages/error/NotFoundPage";
import ServerErrorPage from "./pages/error/ServerErrorPage";
import ForbiddenPage from "./pages/error/ForbiddenPage";

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
          <Route path="orderDashboard" element={<OrderDashboardPage />} />
          <Route path="productDashboard" element={<ProductDashboardPage />} />
          <Route path="categoryDashboard" element={<CategoryPage />} />
          <Route path="customerDashboard" element={<CustomerPage />} />
          <Route path="voucherDashboard" element={<VoucherPage />} />
          <Route path="salesDashboard" element={<SalesPage />} />
          <Route path="reviewDashboard" element={<ReviewPage />} />
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
          <Route path="login" element={<LoginPage />} />
          <Route path="register" element={<RegisterPage />} />
          <Route path="otp" element={<Otp />} />
          <Route path="forgot-password" element={<ForgotPasswordPage />} />
        </Route>

        {/* Error pages */}
        <Route path="/403" element={<ForbiddenPage />} />
        <Route path="/500" element={<ServerErrorPage />} />
        <Route path="/404" element={<NotFoundPage />} />
      </Routes>
    </BrowserRouter>
  );
};

export default App;
