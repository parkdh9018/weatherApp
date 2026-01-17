import { NavLink } from "react-router-dom";
import { NAV_ITEMS } from "../config/navItems";

const getNavLinkClass = ({ isActive }: { isActive: boolean }) =>
  `px-4 py-2 font-medium transition-colors ${
    isActive
      ? "text-blue-600 border-b-2 border-blue-600"
      : "text-gray-600 hover:text-gray-900"
  }`;

export function Navigation() {
  return (
    <div className="flex gap-2 border-b">
      {NAV_ITEMS.map((item) => (
        <NavLink key={item.to} to={item.to} className={getNavLinkClass}>
          {item.label}
        </NavLink>
      ))}
    </div>
  );
}
