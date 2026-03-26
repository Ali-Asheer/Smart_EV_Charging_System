const datasets = vehicles.map((v) => ({
  label: v.licensePlate,
  data: [v.currentCharge], // single value for now, or array if tracking history
  borderColor: randomColor(), // assign unique color per vehicle
  backgroundColor: "rgba(34,197,94,0.3)",
}));
