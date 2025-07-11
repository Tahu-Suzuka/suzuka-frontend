import React from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import ProtectedRoute from "./components/ProtectedRoute.jsx";

// Auth
import AuthLayout from "./layouts/AuthLayout.jsx";
import LoginPage from "./Pages/Auth/LoginPage.jsx";
import RegisterPage from "./Pages/Auth/RegisterPage.jsx";
import Otp from "./components/organisms/Otp.jsx";
import ForgotPasswordPage from "./Pages/Auth/ForgotPasswordPage.jsx";

// Home
import AppLayout from "./layouts/AppLayout.jsx";
import HomePage from "./Pages/HomePage.jsx";
import AboutPage from "./Pages/AboutPage.jsx";
import ProductPage from "./Pages/ProductPage.jsx";
import DetailProductPage from "./Pages/DetailProductPage.jsx";

// Settings
import SettingLayout from "./layouts/SettingLayout.jsx";
import ProfilePage from "./Pages/ProfilePage.jsx";
import OrderPage from "./Pages/OrderPage.jsx";
import ChangePasswordPage from "./Pages/ChangePasswordPage.jsx";

// Checkout
import CheckoutLayout from "./layouts/CheckoutLayout.jsx";
import CheckoutPage from "./Pages/CheckoutPage.jsx";

// Dashboard
import DashboardPage from "./Pages/Dashboard/DashboardPage.jsx";
import DashboardLayout from "./layouts/dashboard/DashboardLayout.jsx";
import OrderDashboardPage from "./Pages/Dashboard/order/OrderDashboardPage.jsx";
import ProductDashboardPage from "./Pages/Dashboard/product/ProductDashboardPage.jsx";
import CategoryPage from "./Pages/Dashboard/category/CategoryPage.jsx";
import CustomerPage from "./Pages/Dashboard/customer/CustomerPage.jsx";
import VoucherPage from "./Pages/Dashboard/voucher/VoucherPage.jsx";
import SalesPage from "./Pages/Dashboard/SalesPage.jsx";
import ReviewPage from "./Pages/Dashboard/ReviewPage.jsx";
import AddOrderPage from "./Pages/Dashboard/order/AddOrderPage.jsx";
import ReadOrderPage from "./Pages/Dashboard/order/ReadOrderPage.jsx";
import AddProductPage from "./Pages/Dashboard/product/AddProductPage.jsx";
import EditProductPage from "./Pages/Dashboard/product/EditProductPage.jsx";
import AddVoucherPage from "./Pages/Dashboard/voucher/AddVoucherPage.jsx";
import EditVoucherPage from "./Pages/Dashboard/voucher/EditVoucherPage.jsx";
import AddCustomerPage from "./Pages/Dashboard/customer/AddCustomerPage.jsx";
import EditCustomerPage from "./Pages/Dashboard/customer/EditCustomerPage.jsx";
import AddCategoryPage from "./Pages/Dashboard/category/AddCategoryPage.jsx";
import EditCategoryPage from "./Pages/Dashboard/category/EditCategoryPage.jsx";

// Error Pages
import NotFoundPage from "./Pages/Error/NotFoundPage.jsx";
import ServerErrorPage from "./Pages/Error/ServerErrorPage.jsx";
import ForbiddenPage from "./Pages/Error/ForbiddenPage.jsx";

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
