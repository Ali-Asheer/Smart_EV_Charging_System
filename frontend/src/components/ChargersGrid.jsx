import React, { useEffect, useState } from "react";

const ChargersGrid = () => {
  const [chargers, setChargers] = useState([]);

  useEffect(() => {
    const controller = new AbortController();
    const signal = controller.signal;

    fetch("http://localhost:8080/charging_station", { signal })
      .then((res) => res.json())
      .then((data) => setChargers(data))
      .catch((err) => {
        if (err.name !== "AbortError") console.error("Error fetching chargers:", err);
      });

    return () => controller.abort();
  }, []);

  return (
    <div className="bg-cyan-50 p-4 py-5 rounded-lg shadow-[5px_5px_15px_rgba(0,0,0,0.6)] h-full ">
      <h2 className="text-lg font-semibold mb-4">Charger stations</h2>

      <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-3">
        {chargers.map((charger) => {
          const isActive = charger.available == 1;
          return (
            <div
              key={charger.id}
              className={`p-3 rounded text-white font-medium text-center shadow-[5px_5px_15px_rgba(0,0,0,0.6)] ${
                isActive ? "bg-green-500" : "bg-red-500"
              }`}
            >
              {charger.available}
              <div className="text-sm">Station No. {charger.id}, is {isActive ? "Active" : "Idle"}</div>
              
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default ChargersGrid;