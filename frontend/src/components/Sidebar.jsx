import React from "react";
import { NavLink } from "react-router-dom";
import { FaChargingStation, FaCar, FaChartLine, FaCogs, FaHistory, FaBolt, FaBars } from "react-icons/fa";

const menu = [
  { name: "Dashboard", icon: FaChartLine, path: "/" },
  { name: "Chargers", icon: FaChargingStation, path: "/chargers" },
  { name: "Vehicles", icon: FaCar, path: "/vehicles" },
  { name: "Charging Sessions", icon: FaHistory, path: "/sessions" },
  { name: "PowerChart", icon: FaBolt, path: "/PowerChart"} //"/PowerChart" }
];

export default function Sidebar({ open, toggle }) {
  return (
    <aside className={`bg-gray-900 text-gray-200 h-screen flex flex-col transition-all duration-300 ${open ? "w-64" : "w-20"}`}>
      {/* Header / Logo */}
      <div className="h-16 flex items-center justify-between p-10 border-b border-gray-600">
        <span className={`text-xl font-bold transition-all duration-300 ${open ? "opacity-100" : "opacity-0"}`}>EV Control Panel</span>
        <button onClick={toggle} className="text-gray-200 md:hidden">
          <FaBars size={20} />
        </button>
      </div>

      {/* Menu Items */}
      <nav className="flex-1 p-3">
        {menu.map((item) => {
          const Icon = item.icon;
          return (
            <NavLink
              key={item.name}
              to={item.path}
              title={item.name}
              className={({ isActive }) =>
                `flex items-center gap-4 p-3 mb-2 rounded-lg transition-all duration-200 ${
                  isActive ? "bg-blue-600 text-white" : "hover:bg-gray-700"
                }`
              }
            >
              <Icon size={20} />
              {open && <span>{item.name}</span>}
            </NavLink>
          );
        })}
      </nav>

      
    </aside>
  );
}