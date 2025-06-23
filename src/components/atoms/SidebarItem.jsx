import { NavLink } from "react-router-dom";

export default function SidebarItem({ icon: Icon, label, to, isCollapsed }) {
  return (
    <NavLink
      to={to}
      className={({ isActive }) =>
        `flex items-center gap-3 px-4 py-2 rounded-lg transition-colors font-medium
        ${
          isActive ? "bg-primary text-white" : "text-gray-600 hover:bg-gray-100"
        }`
      }
    >
      <Icon className="text-lg" />
      {!isCollapsed && <span>{label}</span>}
    </NavLink>
  );
}
