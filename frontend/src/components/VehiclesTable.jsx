import React, { useEffect, useState } from "react";

const VehiclesTable = () => {
  const [vehicles, setVehicles] = useState([]);

  useEffect(() => {
    fetch("http://localhost:8080/vehicle")
      .then(res => res.json())
      .then(data => setVehicles(data))
      .catch(err => console.error("Error fetching vehicles:", err));
  }, []);
  
  return (
    <div className="p-4 rounded shadow-[5px_5px_15px_rgba(0,0,0,0.6)] overflow-x-auto  bg-cyan-50">
      <h2 className="text-lg font-semibold mb-4">Vehicles</h2>
      <table className="w-full table-auto border-collapse">
        <thead>
          <tr>
            <th className="border p-2 border-gray-800 bg-cyan-100">No.</th>
            <th className="border p-2 border-gray-800 bg-cyan-100">License plate</th>
            <th className="border p-2 border-gray-800 bg-cyan-100">Arrival time</th>
            <th className="border p-2 border-gray-800 bg-cyan-100">Battery capacity</th>
            <th className="border p-2 border-gray-800 bg-cyan-100">Current charge</th>
            <th className="border p-2 border-gray-800 bg-cyan-100">Priority</th>
          </tr>
        </thead>
        <tbody>
          {vehicles.map((v) => (
            <tr key={v.id}>
              <td className="border p-2 border-gray-800">{v.id}</td>
              <td className="border p-2 border-gray-800">{v.licensePlate}</td>
              <td className="border p-2 border-gray-800">{new Date(v.arrivalTime).toLocaleTimeString()}</td>
              <td className="border p-2 border-gray-800">{v.batteryCapacity}</td>
              <td className="border p-2 border-gray-800">{v.currentCharge}</td>
              <td className="border p-2 border-gray-800">{v.priority}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default VehiclesTable;