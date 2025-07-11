import React from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import ProtectedRoute from "./components/ProtectedRoute.jsx";

// Auth
import AuthLayout from "./layouts/AuthLayout.jsx";
import LoginPage from "./pages/auth/LoginPage.jsx";
import RegisterPage from "./pages/auth/RegisterPage.jsx";
import Otp from "./components/organisms/Otp.jsx";
import ForgotPasswordPage from "./pages/auth/ForgotPasswordPage.jsx";

// Home
import AppLayout from "./layouts/AppLayout.jsx";
import HomePage from "./pages/HomePage.jsx";
import AboutPage from "./pages/AboutPage.jsx";
import ProductPage from "./pages/ProductPage.jsx";
import DetailProductPage from "./pages/DetailProductPage.jsx";

// Settings
import SettingLayout from "./layouts/SettingLayout.jsx";
import ProfilePage from "./pages/ProfilePage.jsx";
import OrderPage from "./pages/OrderPage.jsx";
import ChangePasswordPage from "./pages/ChangePasswordPage.jsx";

// Checkout
import CheckoutLayout from "./layouts/CheckoutLayout.jsx";
import CheckoutPage from "./pages/CheckoutPage.jsx";

// Dashboard
import DashboardPage from "./pages/dashboard/DashboardPage.jsx";
import DashboardLayout from "./layouts/dashboard/DashboardLayout.jsx";
import OrderDashboardPage from "./pages/dashboard/order/OrderDashboardPage.jsx";
import ProductDashboardPage from "./pages/dashboard/product/ProductDashboardPage.jsx";
import CategoryPage from "./pages/dashboard/category/CategoryPage.jsx";
import CustomerPage from "./pages/dashboard/customer/CustomerPage.jsx";
import VoucherPage from "./pages/dashboard/voucher/VoucherPage.jsx";
import SalesPage from "./pages/dashboard/SalesPage.jsx";
import ReviewPage from "./pages/dashboard/ReviewPage.jsx";
import AddOrderPage from "./pages/dashboard/order/AddOrderPage.jsx";
import ReadOrderPage from "./pages/dashboard/order/ReadOrderPage.jsx";
import AddProductPage from "./pages/dashboard/product/AddProductPage.jsx";
import EditProductPage from "./pages/dashboard/product/EditProductPage.jsx";
import AddVoucherPage from "./pages/dashboard/voucher/AddVoucherPage.jsx";
import EditVoucherPage from "./pages/dashboard/voucher/EditVoucherPage.jsx";
import AddCustomerPage from "./pages/dashboard/customer/AddCustomerPage.jsx";
import EditCustomerPage from "./pages/dashboard/customer/EditCustomerPage.jsx";
import AddCategoryPage from "./pages/dashboard/category/AddCategoryPage.jsx";
import EditCategoryPage from "./pages/dashboard/category/EditCategoryPage.jsx";

// Error Pages
import NotFoundPage from "./pages/error/NotFoundPage.jsx";
import ServerErrorPage from "./pages/error/ServerErrorPage.jsx";
import ForbiddenPage from "./pages/error/ForbiddenPage.jsx";

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
          <Route path="produk/:id" element={<DetailProductPage />} />
        </Route>

        {/* Setting Layout */}
        <Route element={<SettingLayout />}>
          <Route path="/profile" element={<ProfilePage />} />
          <Route path="/order" element={<OrderPage />} />
          <Route path="/changePassword" element={<ChangePasswordPage />} />
        </Route>

        {/* Checkout Layout */}
        <Route element={<CheckoutLayout />}>
          <Route path="/checkout" element={<CheckoutPage />} />
        </Route>

        {/* Auth Layout (Sudah Benar) */}
        <Route element={<AuthLayout />}>
          <Route path="/login" element={<LoginPage />} />
          <Route path="/register" element={<RegisterPage />} />
          <Route path="/otp" element={<Otp />} />
          <Route path="/forgot-password" element={<ForgotPasswordPage />} />
        </Route>

        {/* Error pages */}
        <Route path="/403" element={<ForbiddenPage />} />
        <Route path="/500" element={<ServerErrorPage />} />
        <Route path="*" element={<NotFoundPage />} />
      </Routes>
    </BrowserRouter>
  );
};

export default App;
