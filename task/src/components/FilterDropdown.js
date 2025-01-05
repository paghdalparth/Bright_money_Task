import React from "react";
import { useDispatch, useSelector } from "react-redux";
import { filterByCategory } from "../redux/actions/billsActions";

const FilterDropdown = () => {
  const bills = useSelector((state) => state.bills.bills);
  const dispatch = useDispatch();

  // Extract unique categories dynamically
  const categories = ["All", ...new Set(bills.map((bill) => bill.category))];

  const handleFilter = (e) => {
    dispatch(filterByCategory(e.target.value));
  };

  return (
    <div className="filter-dropdown">
      <label htmlFor="category-filter">Filter by Category: </label>
      <select id="category-filter" onChange={handleFilter}>
        {categories.map((category) => (
          <option key={category} value={category}>
            {category}
          </option>
        ))}
      </select>
    </div>
  );
};

export default FilterDropdown;
