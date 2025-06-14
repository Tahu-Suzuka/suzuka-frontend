import { NavLink } from "react-router-dom";

export default function SidebarItem({ icon: Icon, label, to, isCollapsed }) {
  return (
    <NavLink
      to={to}
      className={({ isActive }) =>
        `flex items-center px-4 py-2 mx-2 my-1 w-auto rounded-lg transition-colors duration-200
        ${isCollapsed ? "justify-center" : "space-x-3"}
        ${
          isActive
            ? "font-medium text-slate-600"
            : "text-slate-600 hover:bg-primary hover:bg-opacity-15 hover:font-semibold hover:text-primary"
        }`
      }
    >
      <Icon className="w-5 h-5" />
      {!isCollapsed && <span className="text-sm">{label}</span>}
    </NavLink>
  );
}
