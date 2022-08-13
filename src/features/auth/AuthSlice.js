import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  token: null,
  user: null,
  address: []
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
    addAddress: (state, {payload}) => {
      const {city, address, state: stateUser} = payload

      if(state.address && state.address.length>0) {
        state.address = [...state.address, {city, address, state: stateUser }]
      } else {
        state.address = [{city, address, state: stateUser }]
      }
    }
  },
});

export const { login, logout, addAddress } = authSlice.actions;

export const userLogged = (state) => state.auth.user;
export const token = (state) => state.auth.token;
export const allAddresses = (state) => state.auth.address;

export default authSlice.reducer;
