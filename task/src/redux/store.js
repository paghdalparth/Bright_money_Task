import { createStore, applyMiddleware, combineReducers } from "redux";
import { thunk } from "redux-thunk"; // Updated import
import { billsReducer } from "./reducers/billsReducer";

const rootReducer = combineReducers({
  bills: billsReducer,
});

const store = createStore(rootReducer, applyMiddleware(thunk));

export default store;
