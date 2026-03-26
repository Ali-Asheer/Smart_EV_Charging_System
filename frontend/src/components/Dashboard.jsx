import React from "react";
import MetricsCards from "./MetricsCards";
import ChargersGrid from "./ChargersGrid";
import SessionsTable from "./SessionsTable";
import VehiclesTable from "./VehiclesTable";
import PowerChart from "./PowerChart";

const Dashboard = () => {
  return (
    <div className="space-y-4 bg-white  ">
      <MetricsCards />
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4 ">
        <div className="max-h-80 flex flex-col overflow-y-auto shadow-[5px_5px_15px_rgba(0,0,0,0.6)] ">
          <SessionsTable />
        </div>
        <div className="max-h-80 flex flex-col overflow-y-auto shadow-[5px_5px_15px_rgba(0,0,0,0.6)] ">
          <VehiclesTable />
        </div>
      </div>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <ChargersGrid />
        <PowerChart />
      </div>
    </div>
  );
};

export default Dashboard;
