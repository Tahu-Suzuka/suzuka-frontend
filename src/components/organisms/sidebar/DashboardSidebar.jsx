// components/organisms/DashboardSidebar.jsx
import { NavLink } from "react-router-dom";
import { RxDashboard } from "react-icons/rx";
import { PiPresentationChart } from "react-icons/pi";
import { TbFileInvoice } from "react-icons/tb";
import { CiDiscount1, CiStar } from "react-icons/ci";
import { BiBox } from "react-icons/bi";
import { MdInsertChartOutlined } from "react-icons/md";
import { FiUsers } from "react-icons/fi";

const menu = [
  { name: "Dashboard", path: "/dashboard", icon: PiPresentationChart },
  { name: "Pesanan", path: "/dashboard/order", icon: TbFileInvoice },
  { name: "Kategori", path: "/dashboard/category", icon: RxDashboard },
  { name: "Produk", path: "/dashboard/product", icon: BiBox },
  { name: "Voucher", path: "/dashboard/voucher", icon: CiDiscount1 },
  { name: "Penjualan", path: "/dashboard/sales", icon: MdInsertChartOutlined },
  { name: "Pelanggan", path: "/dashboard/customer", icon: FiUsers },
  { name: "Ulasan", path: "/dashboard/review", icon: CiStar },
];

const DashboardSidebar = () => (
  <aside className="w-64 h-screen bg-white shadow-md fixed top-0 left-0 z-40">
    {/* Header Logo */}
    <div className="flex items-center h-16 border-b px-4">
      <img src="/images/logo/logo.png" alt="Logo" className="w-8 h-8" />
      <h1 className="ml-3 text-xl font-semibold text-slate-800">Tahu Suzuka</h1>
    </div>

    {/* Menu Navigasi */}
    <div className="mt-6 space-y-2 px-2">
      {menu.map((item, i) => (
        <NavLink
          key={i}
          to={item.path}
          end={item.path === "/dashboard"}
          className={({ isActive }) =>
            `flex items-center gap-3 px-4 py-2 rounded-lg transition-colors font-medium ${
              isActive
                ? "bg-primary text-white"
                : "text-gray-600 hover:bg-gray-200"
            }`
          }
        >
          <item.icon className="text-lg" />
          <span>{item.name}</span>
        </NavLink>
      ))}
    </div>
  </aside>
);

export default DashboardSidebar;
