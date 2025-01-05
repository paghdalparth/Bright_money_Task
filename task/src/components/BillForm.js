import React, { useState } from "react";
import { useDispatch } from "react-redux";
import { addBill } from "../redux/actions/billsActions";

const BillForm = () => {
  const [bill, setBill] = useState({
    id: "",
    description: "",
    category: "",
    amount: "",
    date: "",
  });

  const dispatch = useDispatch();

  const handleChange = (e) => {
    setBill({ ...bill, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    dispatch(addBill({ ...bill, id: Date.now() }));
    setBill({ id: "", description: "", category: "", amount: "", date: "" });
  };

  return (
    <form onSubmit={handleSubmit}>
      <input name="description" placeholder="Description" value={bill.description} onChange={handleChange} required />
      <input name="category" placeholder="Category" value={bill.category} onChange={handleChange} required />
      <input name="amount" type="number" placeholder="Amount" value={bill.amount} onChange={handleChange} required />
      <input name="date" type="date" value={bill.date} onChange={handleChange} required />
      <button type="submit">Add Bill</button>
    </form>
  );
};

export default BillForm;
