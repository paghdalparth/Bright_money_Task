import React, { useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { deleteBill, editBill } from "../redux/actions/billsActions";

const BillList = () => {
  const filteredBills = useSelector((state) => state.bills.filteredBills);
  const dispatch = useDispatch();

  const [isEditing, setIsEditing] = useState(null); // Track the bill being edited
  const [editData, setEditData] = useState({
    description: "",
    category: "",
    amount: "",
    date: "",
  });

  const [budget, setBudget] = useState(""); // Budget input state
  const [selectedBills, setSelectedBills] = useState([]); // Highlighted bills state

  // Handle budget input change
  const handleBudgetChange = (e) => {
    setBudget(e.target.value);
  };

  // Calculate minimum number of bills to be paid
  const calculateBills = () => {
    const sortedBills = [...filteredBills].sort((a, b) => Number(a.amount) - Number(b.amount));
    let total = 0;
    const selected = [];

    for (let bill of sortedBills) {
      if (total + Number(bill.amount) <= Number(budget)) {
        total += Number(bill.amount);
        selected.push(bill.id);
      } else {
        break;
      }
    }

    setSelectedBills(selected);
  };

  const handleDelete = (id) => {
    if (window.confirm("Are you sure you want to delete this bill?")) {
      dispatch(deleteBill(id));
    }
  };

  // Handle editing a bill
  const handleEditClick = (bill) => {
    setIsEditing(bill.id); // Enable edit mode for the selected bill
    setEditData(bill); // Pre-fill the edit form with the selected bill's data
  };

  const handleEditChange = (e) => {
    setEditData({ ...editData, [e.target.name]: e.target.value });
  };

  const handleEditSubmit = (e) => {
    e.preventDefault();
    dispatch(editBill(isEditing, editData)); // Dispatch the edit action to update Redux state
    setIsEditing(null); // Exit edit mode
  };

  const handleCancelEdit = () => {
    setIsEditing(null); // Cancel edit mode
  };

  // Sort bills by date in ascending order
  const sortedBillsByDate = [...filteredBills].sort((a, b) => new Date(a.date) - new Date(b.date));

  return (
    <div>
      {/* Budget Input Section */}
      <div className="budget-section">
        <label htmlFor="budget">Monthly Budget:</label>
        <input
          id="budget"
          type="number"
          value={budget}
          onChange={handleBudgetChange}
          placeholder="Enter your budget"
        />
        <button onClick={calculateBills}>Calculate</button>
      </div>

      {/* Bills List */}
      <ul>
        {sortedBillsByDate.map((bill) =>
          isEditing === bill.id ? (
            <li key={bill.id}>
              <form onSubmit={handleEditSubmit}>
                <input
                  name="description"
                  value={editData.description}
                  onChange={handleEditChange}
                  placeholder="Description"
                />
                <input
                  name="category"
                  value={editData.category}
                  onChange={handleEditChange}
                  placeholder="Category"
                />
                <input
                  name="amount"
                  type="number"
                  value={editData.amount}
                  onChange={handleEditChange}
                  placeholder="Amount"
                />
                <input
                  name="date"
                  type="date"
                  value={editData.date}
                  onChange={handleEditChange}
                />
                <button type="submit" className="save-button">
                  Save
                </button>
                <button type="button" className="cancel-button" onClick={handleCancelEdit}>
                  Cancel
                </button>
              </form>
            </li>
          ) : (
            <li key={bill.id} className={selectedBills.includes(bill.id) ? "highlight" : ""}>
              <span>{bill.description}</span>
              <span>{bill.category}</span>
              <span>${bill.amount}</span>
              <span>{bill.date}</span>
              <button className="edit-button" onClick={() => handleEditClick(bill)}>
                Edit
              </button>
              <button className="delete-button" onClick={() => handleDelete(bill.id)}>
                Delete
              </button>
            </li>
          )
        )}
      </ul>
    </div>
  );
};

export default BillList;
