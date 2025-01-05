const initialState = {
  bills: [],
  filteredBills: [],
};

export const billsReducer = (state = initialState, action) => {
  switch (action.type) {
    case "ADD_BILL":
      const newBills = [...state.bills, action.payload];
      return {
        ...state,
        bills: newBills,
        filteredBills: newBills, // Ensure filteredBills updates with new bills
      };
    case "EDIT_BILL":
      return {
        ...state,
        bills: state.bills.map((bill) =>
          bill.id === action.payload.id ? action.payload.updatedBill : bill
        ),
        filteredBills: state.filteredBills.map((bill) =>
          bill.id === action.payload.id ? action.payload.updatedBill : bill
        ),
      };
    case "DELETE_BILL":
      return {
        ...state,
        bills: state.bills.filter((bill) => bill.id !== action.payload),
        filteredBills: state.filteredBills.filter(
          (bill) => bill.id !== action.payload
        ),
      };
    case "FILTER_CATEGORY":
      return {
        ...state,
        filteredBills:
          action.payload === "All"
            ? state.bills
            : state.bills.filter((bill) => bill.category === action.payload),
      };
    default:
      return state;
  }
};
