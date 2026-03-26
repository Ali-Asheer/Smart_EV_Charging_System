import React, { useState } from "react";
import Sidebar from "./components/Sidebar";
import Dashboard from "./components/Dashboard";
import { Routes, Route } from "react-router-dom";
import Vehicles from "./components/VehiclesTable";
import Sessions from "./components/SessionsTable";
import Chargers from "./components/ChargersGrid";
import PowerChart from "./components/PowerChart";


const App = () => {
  const [sidebarOpen, setSidebarOpen] = useState(true);

  return (
    <div className="flex min-h-screen">
      <Sidebar open={sidebarOpen} toggle={() => setSidebarOpen(!sidebarOpen)} />
      <div className="flex-1 p-4">
        <Routes>
          <Route path="/" element={<Dashboard />} />
          <Route path="/chargers" element={<Chargers />} /> 
          <Route path="/vehicles" element={<Vehicles />} />
          <Route path="/sessions" element={<Sessions />} />
          <Route path="/PowerChart" element={<PowerChart />} />
        </Routes>
      </div>
    </div>
  );
};



export default App;