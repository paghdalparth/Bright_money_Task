import React from "react";
import { Line } from "react-chartjs-2";
import { useSelector } from "react-redux";
import {
  Chart as ChartJS,
  LineElement,
  CategoryScale,
  LinearScale,
  PointElement,
} from "chart.js";

ChartJS.register(LineElement, CategoryScale, LinearScale, PointElement);

const TimeSeriesChart = () => {
  const bills = useSelector((state) => state.bills.bills);

  // Group bills by month and calculate monthly totals
  const monthlyTotals = bills.reduce((acc, bill) => {
    const date = new Date(bill.date);
    const monthYear = date.toLocaleString("default", { month: "long", year: "numeric" });
    acc[monthYear] = acc[monthYear] ? acc[monthYear] + Number(bill.amount) : Number(bill.amount);
    return acc;
  }, {});

  // Sort the totals by month (ascending)
  const sortedTotals = Object.entries(monthlyTotals).sort(([aKey], [bKey]) => {
    const aDate = new Date(`01 ${aKey}`);
    const bDate = new Date(`01 ${bKey}`);
    return aDate - bDate;
  });

  // Prepare data for the chart
  const labels = sortedTotals.map(([month]) => month);
  const dataPoints = sortedTotals.map(([, total]) => total);

  const data = {
    labels,
    datasets: [
      {
        label: "Monthly Billing",
        data: dataPoints,
        fill: false,
        borderColor: "blue",
        tension: 0.4,
      },
    ],
  };

  return (
    <div className="chart-section">
      <h2>Monthly Billing Chart</h2>
      <Line data={data} />
    </div>
  );
};

export default TimeSeriesChart;
