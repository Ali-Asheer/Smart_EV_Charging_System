import React from "react";

const TopBar = ({ toggleSidebar }) => {
  return (
    <div className="bg-gray-800 p-4 flex justify-between items-center">
      <button onClick={toggleSidebar} className="">
        ☰
      </button>
      <div className="font-semibold">Grid Load: 32 kW / 80 kW</div>
      <div>Admin User 🔔</div>
    </div>
  );
};

export default TopBar;