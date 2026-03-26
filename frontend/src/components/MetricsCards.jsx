import React, { useEffect, useState } from "react";

const MetricsCards = () => {
  const [metrics, setMetrics] = useState({
    totalChargers: 0,
    activeSessions: 0,
    vehicles: 0,
    powerUsed: 0,
  });

  useEffect(() => {
    fetch("http://localhost:8080/metrics")
      .then((res) => res.json())
      .then((data) => setMetrics(data))
      .catch((err) => console.error("Failed to fetch metrics:", err));
  }, []);

  const cards = [
    { title: "Total Chargers", value: metrics.totalChargers },
    { title: "Active Sessions", value: metrics.activeSessions },
    { title: "Vehicles", value: metrics.vehicles },
    // { title: "Used power (kWh)", value: 0 /*metrics.powerUsed*/ },
  ];

  return (
    <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
      {cards.map((card) => (
        <div
          key={card.title}
          className=" p-4 rounded shadow-[5px_5px_15px_rgba(0,0,0,0.6)] bg-cyan-50"
        >
          <h2 className="text-sm font-semibold text-gray-500">{card.title}</h2>
          <p className="text-2xl font-bold">{card.value}</p>
        </div>
      ))}
    </div>
  );
};

export default MetricsCards;