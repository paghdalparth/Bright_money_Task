export const addBill = (bill) => ({
  type: "ADD_BILL",
  payload: bill,
});

export const editBill = (id, updatedBill) => ({
  type: "EDIT_BILL",
  payload: { id, updatedBill },
});

export const deleteBill = (id) => ({
  type: "DELETE_BILL",
  payload: id,
});

export const filterByCategory = (category) => ({
  type: "FILTER_CATEGORY",
  payload: category,
});
