import React from "react";
import { useSelector } from "react-redux";

const BillDashboard = () => {
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
    const aDate = new Date(`01 ${aKey}`); // "01" added to create a parsable date
    const bDate = new Date(`01 ${bKey}`);
    return aDate - bDate;
  });

  return (
    <div className="dashboard">
      <h2>Monthly Billing Totals</h2>
      <ul>
        {sortedTotals.map(([month, total]) => (
          <li key={month}>
            {month}: <strong>${total.toFixed(2)}</strong>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default BillDashboard;
