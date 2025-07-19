// components/organisms/DashboardSidebar.jsx

import { NavLink, useLocation } from "react-router-dom";
import { RxDashboard } from "react-icons/rx";
import { PiPresentationChart } from "react-icons/pi";
import { TbFileInvoice } from "react-icons/tb";
import { CiDiscount1, CiStar } from "react-icons/ci";
import { BiBox } from "react-icons/bi";
import { MdInsertChartOutlined } from "react-icons/md";
import { FiUsers } from "react-icons/fi";
import { LazyLoadImage } from "react-lazy-load-image-component";
import "react-lazy-load-image-component/src/effects/blur.css";

const menu = [
  {
    name: "Dashboard",
    path: "/dashboard",
    icon: PiPresentationChart,
    exact: true,
  },
  {
    name: "Pesanan",
    path: "/dashboard/orderDashboard",
    icon: TbFileInvoice,
    relatedPaths: [
      "/dashboard/orderDashboard",
      "/dashboard/add-order",
      "/dashboard/order/",
    ],
  },
  {
    name: "Kategori",
    path: "/dashboard/categoryDashboard",
    icon: RxDashboard,
    relatedPaths: [
      "/dashboard/categoryDashboard",
      "/dashboard/add-category",
      "/dashboard/edit-category/",
    ],
  },
  {
    name: "Produk",
    path: "/dashboard/productDashboard",
    icon: BiBox,
    relatedPaths: [
      "/dashboard/productDashboard",
      "/dashboard/add-product",
      "/dashboard/edit-product/",
    ],
  },
  {
    name: "Voucher",
    path: "/dashboard/voucherDashboard",
    icon: CiDiscount1,
    relatedPaths: [
      "/dashboard/voucherDashboard",
      "/dashboard/add-voucher",
      "/dashboard/edit-voucher/",
    ],
  },
  {
    name: "Penjualan",
    path: "/dashboard/salesDashboard",
    icon: MdInsertChartOutlined,
    relatedPaths: ["/dashboard/salesDashboard"],
  },
  {
    name: "Pelanggan",
    path: "/dashboard/customerDashboard",
    icon: FiUsers,
    relatedPaths: [
      "/dashboard/customerDashboard",
      "/dashboard/add-customer",
      "/dashboard/edit-customer/",
    ],
  },
  {
    name: "Ulasan",
    path: "/dashboard/reviewDashboard",
    icon: CiStar,
    relatedPaths: ["/dashboard/reviewDashboard"],
  },
];

const DashboardSidebar = () => {
  const location = useLocation();
  const currentPath = location.pathname;

  return (
    <aside className="w-64 h-screen bg-white shadow-md fixed top-0 left-0 z-40">
      {/* Header Logo */}
      <div className="flex items-center h-16 border-b px-4">
        <LazyLoadImage
          src="/images/logo/logo.png"
          alt="Logo"
          className="w-8 h-8"
          effect="blur"
        />
        <h1 className="ml-3 text-xl font-semibold text-slate-800">
          Tahu Suzuka
        </h1>
      </div>

      {/* Navigation Menu */}
      <div className="mt-6 space-y-2 px-2">
        {menu.map((item, i) => {
          const isActive = item.exact
            ? currentPath === item.path
            : item.relatedPaths?.some((path) => currentPath.startsWith(path));

          return (
            <NavLink
              key={i}
              to={item.path}
              className={`flex items-center gap-3 px-4 py-2 rounded-lg transition-colors font-medium ${
                isActive
                  ? "bg-primary text-white"
                  : "text-gray-600 hover:bg-gray-200"
              }`}
            >
              <item.icon className="text-lg" />
              <span>{item.name}</span>
            </NavLink>
          );
        })}
      </div>
    </aside>
  );
};

export default DashboardSidebar;
