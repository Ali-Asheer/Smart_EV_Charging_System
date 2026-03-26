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
  Legend
} from "chart.js";

ChartJS.register(CategoryScale, LinearScale, PointElement, LineElement, Title, Tooltip, Legend);

const PowerAndBusyChart = () => {
  const [chartData, setChartData] = useState({
    labels: [],
    datasets: [
      {
        label: "Power (kWh)",
        data: [],
        borderColor: "rgb(34,197,94)",
        backgroundColor: "rgba(34,197,94,0.3)",
        yAxisID: "y1",
      },
      {
        label: "Busy Chargers",
        data: [],
        borderColor: "rgb(59,130,246)",
        backgroundColor: "rgba(59,130,246,0.3)",
        yAxisID: "y2",
      }
    ]
  });

  const abortControllerRef = useRef(null);

  const fetchData = () => {
    if (abortControllerRef.current) {
      abortControllerRef.current.abort();
    }
    abortControllerRef.current = new AbortController();

    fetch("http://localhost:8080/power-and-busy", { signal: abortControllerRef.current.signal })
      .then(res => res.json())
      .then(data => {
        
        const labels = data.timestamps.slice(-6);
        const powerValues = data.powerValues.slice(-6);
        const busyChargers = data.busyChargers.slice(-6);

        setChartData(prev => ({
          ...prev,
          labels,
          datasets: prev.datasets.map(ds => ({
            ...ds,
            data: ds.label === "Power (kWh)" ? powerValues : busyChargers
          }))
        }));
      })
      .catch(err => {
        if (err.name !== "AbortError") console.error("Failed to fetch chart data:", err);
      });
  };

  useEffect(() => {
    fetchData();
    const interval = setInterval(fetchData, 10000); // update 10s
    return () => {
      clearInterval(interval);
      if (abortControllerRef.current) abortControllerRef.current.abort();
    };
  }, []);

  const options = {
    responsive: true,
    interaction: { mode: 'index', intersect: false },
    stacked: false,
    plugins: {
      legend: { position: "top" },
      tooltip: {
        callbacks: {
          label: ctx => `${ctx.dataset.label}: ${ctx.formattedValue}`
        }
      },
      title: { display: false }
    },
    scales: {
      y1: {
        type: "linear",
        display: true,
        position: "left",
        min: 0,
        max: 5000,
        ticks: { stepSize: 100 },
        title: { display: true, text: "Power (kWh)" },
      },
      y2: {
        type: "linear",
        display: true,
        position: "right",
        title: { display: true, text: "Busy Chargers" },
        grid: { drawOnChartArea: false },
      }
    }
  };

  return (
    <div className="p-4 rounded shadow-[5px_5px_15px_rgba(0,0,0,0.6)] overflow-x-auto  bg-cyan-50">
      <h2 className="text-lg font-semibold mb-4">Power vs Busy Chargers (Last 6 Hours)</h2>
      <Line data={chartData} options={options} />
    </div>
  );
};

export default PowerAndBusyChart;