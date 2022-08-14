import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  orders: []
};

export const orderSlice = createSlice({
  name: "order",
  initialState,
  reducers: {
    addOrder: (state, { payload }) => {
      state.orders = [...state.orders, payload];
      sessionStorage.setItem("orders", JSON.stringify(state.orders));
    },
  },
});

export const { addOrder } = orderSlice.actions;

export const allOrders = (state) => state.order.orders;

export default orderSlice.reducer;
