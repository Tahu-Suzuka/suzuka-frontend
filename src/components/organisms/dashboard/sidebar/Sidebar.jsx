import { CiStar, CiDiscount1 } from "react-icons/ci";
import { FiUsers } from "react-icons/fi";
import { TbFileInvoice } from "react-icons/tb";
import { MdInsertChartOutlined } from "react-icons/md";
import { RxDashboard } from "react-icons/rx";
import SidebarItem from "./SidebarItem";

export default function Sidebar({ open, setOpen }) {
  const SidebarLinks = [
    { name: "Dashboard", path: "/", icon: RxDashboard },
    { name: "Pemesanan", path: "/settings", icon: TbFileInvoice },
    { name: "Diskon", path: "/discount", icon: CiDiscount1 },
    { name: "Penjualan", path: "/users", icon: MdInsertChartOutlined },
    { name: "Pengguna", path: "/settings", icon: FiUsers },
    { name: "Ulasan", path: "/rating", icon: CiStar },
  ];

  return (
    <>
      <aside
        className={`fixed top-0 left-0 h-full bg-white shadow-md z-40 transform transition-all duration-300
          ${open ? "w-56" : "w-18"}
        `}
      >
        {/* Logo */}
        <div className="flex items-center h-16 border-b px-4">
          <img src="/images/logo/logo.png" alt="Logo" className="w-8 h-8" />
          <span
            className={`ml-3 text-3xl font-bebas tracking-wider text-slate-800 transition-opacity duration-300 ${
              open ? "opacity-100" : "opacity-0"
            }`}
          >
            Tahu Suzuka
          </span>
        </div>

        <nav className="mt-4 flex flex-col space-y-2">
          {/* Menu */}
          {/* {open && (
            <div className="px-4 py-2 text-xs text-slate-400 font-semibold tracking-wider uppercase">
              Menu
            </div>
          )} */}

          {SidebarLinks.map((item, index) => (
            <SidebarItem
              key={index}
              icon={item.icon}
              label={item.name}
              to={item.path}
              isCollapsed={!open}
              active={index === 0}
            />
          ))}

          {/* Support */}
          {/* {open && (
            <div className="px-4 pt-6 text-xs text-slate-400 font-semibold tracking-wider uppercase">
              Support
            </div>
          )} */}
        </nav>
      </aside>

      {open && (
        <div
          onClick={() => setOpen(false)}
          className="fixed inset-0 bg-black opacity-40 z-30 lg:hidden"
        />
      )}
    </>
  );
}
