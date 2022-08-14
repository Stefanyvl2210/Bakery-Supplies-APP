import { combineReducers } from "@reduxjs/toolkit";
import AuthSlice from "../../features/auth/AuthSlice";
import counterSlice from "../../features/counter/counterSlice";
import OrderSlice from "../../features/order/OrderSlice";

const rootReducer = combineReducers({
  counter: counterSlice,
  auth: AuthSlice,
  order: OrderSlice,
});

export default rootReducer;
