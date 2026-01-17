import { NavLink } from "react-router-dom";

export function Navigation() {
  return (
    <div className="flex gap-2 border-b">
      <NavLink
        to="/weather"
        className={({ isActive }) =>
          `px-4 py-2 font-medium transition-colors ${
            isActive
              ? "text-blue-600 border-b-2 border-blue-600"
              : "text-gray-600 hover:text-gray-900"
          }`
        }
      >
        날씨
      </NavLink>
      <NavLink
        to="/favorite"
        className={({ isActive }) =>
          `px-4 py-2 font-medium transition-colors ${
            isActive
              ? "text-blue-600 border-b-2 border-blue-600"
              : "text-gray-600 hover:text-gray-900"
          }`
        }
      >
        즐겨찾기
      </NavLink>
    </div>
  );
}
