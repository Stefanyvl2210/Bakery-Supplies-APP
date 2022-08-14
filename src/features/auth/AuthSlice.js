import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  token: null,
  user: null,
  addresses: []
};

export const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    login: (state, { payload }) => {
      state.token = payload.token;
      state.user = payload.user;
    },
    logout: (state) => {
      state.token = null;
      state.user = null;
    },
    addAddress: (state, { payload }) => {
      state.addresses = [...state.addresses, payload];
      sessionStorage.setItem("addresses", JSON.stringify(state.addresses));
    },
    deleteAddress: (state, {payload}) => {
      state.addresses = state.addresses.filter((item, index) => index !== payload.index);
      sessionStorage.setItem("addresses", JSON.stringify(state.addresses));
    }
  },
});

export const { login, logout, addAddress, deleteAddress } = authSlice.actions;

export const userLogged = (state) => state.auth.user;
export const token = (state) => state.auth.token;
export const allAddresses = (state) => state.auth.addresses;

export default authSlice.reducer;
