import { NavLink } from "react-router-dom";

export default function SidebarItem({
  icon: Icon,
  label,
  to,
  end,
  isCollapsed,
}) {
  return (
    <NavLink
      to={to}
      end={end} //
      className={({ isActive }) =>
        `flex items-center gap-3 px-4 py-2 rounded-lg transition-colors font-medium
        ${
          isActive ? "bg-primary text-white" : "text-gray-600 hover:bg-gray-200"
        }`
      }
    >
      <Icon className="text-lg" />
      {!isCollapsed && <span>{label}</span>}
    </NavLink>
  );
}
