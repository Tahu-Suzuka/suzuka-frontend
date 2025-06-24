// organisms/Sidebar.jsx
import { RxDashboard } from "react-icons/rx";
import { PiPresentationChart } from "react-icons/pi";
import { TbFileInvoice } from "react-icons/tb";
import { CiDiscount1, CiStar } from "react-icons/ci";
import { BiBox } from "react-icons/bi";
import { MdInsertChartOutlined } from "react-icons/md";
import { FiUsers } from "react-icons/fi";
import SidebarItem from "../../atoms/SidebarItem";

const menu = [
  { name: "Dashboard", path: "/dashboard", icon: PiPresentationChart },
  { name: "Pesanan", path: "/dashboard/order", icon: TbFileInvoice },
  { name: "Kategori", path: "/dashboard/category", icon: RxDashboard },
  { name: "Produk", path: "/dashboard/product", icon: BiBox },
  { name: "Voucher", path: "/discount", icon: CiDiscount1 },
  { name: "Penjualan", path: "/sales", icon: MdInsertChartOutlined },
  { name: "Pengguna", path: "/users", icon: FiUsers },
  { name: "Ulasan", path: "/reviews", icon: CiStar },
];

const Sidebar = () => (
  <aside className="w-64 h-screen bg-white shadow-md fixed top-0 left-0 z-40">
    <div className="flex items-center h-16 border-b px-4">
      <img src="/images/logo/logo.png" alt="Logo" className="w-8 h-8" />
      <h1 className="ml-3 text-xl font-semibold text-slate-800">Tahu Suzuka</h1>
    </div>
    <div className="mt-6 space-y-2 px-2">
      {menu.map((item, i) => (
        <SidebarItem
          key={i}
          to={item.path}
          label={item.name}
          icon={item.icon}
          end={item.path === "/dashboard"}
        />
      ))}
    </div>
  </aside>
);

export default Sidebar;
