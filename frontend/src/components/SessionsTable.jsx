import { useEffect, useState } from "react";

export default function SessionsTable() {
  const [sessions, setSessions] = useState([]);

  useEffect(() => {
    fetch("http://localhost:8080/schedule/generate")
      .then((res) => res.json())
      .then((data) => {
        // Sort: Busy first, then Idle; within Busy, ascending priority
        const sorted = data.sort((a, b) => {
          if (a.status === b.status) {
            if (a.status === "Busy") return a.priority - b.priority; // ascending priority
            return 0; // Idle rows keep order
          }
          return a.status === "Busy" ? -1 : 1; // Busy first
        });
        setSessions(sorted);
      })
      .catch((err) => console.error("Failed to fetch sessions:", err));
  }, []);

  if (sessions.length === 0) {
    return <p className="text-gray-500 mt-4">No active charging sessions.</p>;
  }

  return (
    <div className="p-4  rounded shadow-[5px_5px_15px_rgba(0,0,0,0.6)] overflow-x-auto bg-cyan-50">
      <h2 className="text-lg font-semibold mb-4">Charging Sessions</h2>
      <table className="w-full table-auto min-w-[700px] border-collapse">
        <thead>
          <tr>
            <th className="border  border-gray-800 bg-cyan-100">Session No.</th>
            <th className="border p-2 border-gray-800 bg-cyan-100">Vehicle License Plate</th>
            <th className="border p-4 border-gray-800 bg-cyan-100">Charger</th>
            <th className="border p-2 border-gray-800 bg-cyan-100">Start Time</th>
            <th className="border p-2 border-gray-800 bg-cyan-100">End Time</th>
            <th className="border p-2 border-gray-800 bg-cyan-100">Priority</th>
            <th className="border p-2 border-gray-800 bg-cyan-100">Status</th>
          </tr>
        </thead>
        <tbody>
          {sessions.map((s, index) => (
            <tr key={index}>
              <td className="border pl-4 border-gray-800">{index + 1}</td>
              <td className="border p-2 border-gray-800">{s.vehicle || "N/A"}</td>
              <td className="border p-2 border-gray-800">{s.charger || "N/A"}</td>
              <td className="border p-2 border-gray-800">{s.startTime ? new Date(s.startTime).toLocaleString() : "N/A"}</td>
              <td className="border p-2 border-gray-800">{s.endTime ? new Date(s.endTime).toLocaleString() : "N/A"}</td>
              <td className="border p-2 border-gray-800">{s.priority ?? "N/A"}</td>
              <td className="border p-2 border-gray-800">{s.status}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}



