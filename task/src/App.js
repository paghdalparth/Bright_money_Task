import React from "react";
import BillForm from "./components/BillForm";
import BillList from "./components/BillList";
import FilterDropdown from "./components/FilterDropdown";
import TimeSeriesChart from "./components/TimeSeriesChart";
import BillDashboard from "./components/BillDashboard";

const App = () => {
  return (
    <div>
      <h1>Bill Manager</h1>
      <BillDashboard />
      <FilterDropdown /> {/* Add the dropdown here */}
      <BillForm />
      <BillList />
      <TimeSeriesChart />
    </div>
  );
};

export default App;
