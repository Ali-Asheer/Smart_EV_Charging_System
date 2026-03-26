import React, { useEffect, useState, useRef } from "react";
import { Line } from "react-chartjs-2";
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend,
} from "chart.js";

ChartJS.register(
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend,
);

// Colors for different vehicle lines
const COLORS = [
  "#22c55e",
  "#3b82f6",
  "#f59e0b",
  "#ef4444",
  "#8b5cf6",
  "#10b981",
];
const getColor = (index) => COLORS[index % COLORS.length];

const PowerChart = () => {
  const [history, setHistory] = useState({ labels: [], vehicles: {} }); // Chart history
  const [vehicleData, setVehicleData] = useState({}); // Current vehicle state (for simulation)
  const abortControllerRef = useRef(null);
  const MAX_POINTS = 6; // Number of points to keep for rolling chart

  const fetchData = async () => {
    try {
      if (abortControllerRef.current) abortControllerRef.current.abort();
      abortControllerRef.current = new AbortController();

      // 1️⃣ Fetch all vehicles
      const vehiclesRes = await fetch("http://localhost:8080/vehicle", {
        signal: abortControllerRef.current.signal,
      });
      const vehicles = await vehiclesRes.json();

      // 2️⃣ Fetch active charging schedule
      const scheduleRes = await fetch(
        "http://localhost:8080/schedule/generate",
        { signal: abortControllerRef.current.signal },
      );
      const schedule = await scheduleRes.json();
      const chargingVehicles = schedule.filter((row) => row.status === "Busy"); // Only active charging

      if (chargingVehicles.length === 0) return; // Nothing to show if no active charging

      // Map vehicles by licensePlate for quick access
      const vehiclesMap = {};
      vehicles.forEach((v) => {
        vehiclesMap[v.licensePlate] = { ...v };
      });

      // 3️⃣ Update vehicleData to simulate charging progress
      setVehicleData((prev) => {
        const newVehicleData = { ...prev };

        chargingVehicles.forEach((v) => {
          const plate = v.vehicle;
          const veh = vehiclesMap[plate];
          if (!veh) return;

          // Initialize vehicle if first time
          if (!newVehicleData[plate]) newVehicleData[plate] = { ...veh };

          // Simulate charge increase: chargeRate * deltaTime (10s)
          const chargeRate = v.chargeRate || 5; // Default 5 kW if missing
          const deltaCharge = chargeRate * (10 / 3600); // 10 sec → kWh approx.
          newVehicleData[plate].currentCharge = Math.min(
            newVehicleData[plate].currentCharge + deltaCharge,
            newVehicleData[plate].batteryCapacity,
          );
        });

        return newVehicleData;
      });

      // 4️⃣ Update chart history
      const timestamp = new Date().toLocaleTimeString();
      setHistory((prev) => {
        const newLabels = [...prev.labels, timestamp].slice(-MAX_POINTS);
        const newVehicles = {};

        chargingVehicles.forEach((v) => {
          const plate = v.vehicle;
          const veh = vehicleData[plate] || vehiclesMap[plate];
          if (!veh) return;

          // Compute State of Charge %
          const socPercent = (veh.currentCharge / veh.batteryCapacity) * 100;

          // Append to history and keep last MAX_POINTS
          newVehicles[plate] = [
            ...(prev.vehicles[plate] || []),
            socPercent,
          ].slice(-MAX_POINTS);
        });

        return { labels: newLabels, vehicles: newVehicles };
      });
    } catch (err) {
      if (err.name !== "AbortError")
        console.error("Failed to fetch data:", err);
    }
  };

  useEffect(() => {
    fetchData();
    const interval = setInterval(fetchData, 10000); // Update every 10 seconds
    return () => {
      clearInterval(interval);
      if (abortControllerRef.current) abortControllerRef.current.abort();
    };
  }, []);

  // Prepare datasets for Chart.js
  const datasets = Object.entries(history.vehicles).map(
    ([vehicle, values], i) => ({
      label: vehicle,
      data: values,
      borderColor: getColor(i),
      backgroundColor: `${getColor(i)}33`,
      tension: 0.3,
    }),
  );

  const chartData = { labels: history.labels, datasets };

  const options = {
    responsive: true,
    plugins: {
      legend: { position: "top" },
      tooltip: {
        callbacks: {
          label: (ctx) =>
            `${ctx.dataset.label}: ${ctx.formattedValue?.toFixed(1)} %`,
        },
      },
      title: {
        display: true,
        text: "Active Vehicles State of Charge (Simulation)",
      },
    },
    scales: {
      y: {
        beginAtZero: true,
        max: 100,
        title: { display: true, text: "State of Charge (%)" },
      },
      x: { title: { display: true, text: "Time" } },
    },
  };

  return (
    <div className="p-4 rounded shadow-[5px_5px_15px_rgba(0,0,0,0.6)] bg-cyan-50 overflow-x-auto">
      <h2 className="text-lg font-semibold mb-4">
        Active Vehicles State of Charge (Simulation)
      </h2>
      <Line data={chartData} options={options} />
    </div>
  );
};

export default PowerChart;
