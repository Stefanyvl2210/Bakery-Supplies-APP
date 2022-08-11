import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  token: null,
  user: null
};

export const authSlice = createSlice({
  name: "counter",
  initialState,
  reducers: {
    login: (state, payload) => {
      console.log(payload);
    },
  },
});

export const { login } = authSlice.actions;

export default authSlice.reducer;
