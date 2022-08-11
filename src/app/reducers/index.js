import { combineReducers } from "@reduxjs/toolkit";
import AuthSlice from "../../features/auth/AuthSlice";
import counterSlice from "../../features/counter/counterSlice";

const rootReducer = combineReducers({
  counter: counterSlice,
  auth: AuthSlice,
});

export default rootReducer;
