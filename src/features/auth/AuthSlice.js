import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  token: null,
  user: null,
};

export const authSlice = createSlice({
  name: "counter",
  initialState,
  reducers: {
    login: (state, { payload }) => {
      console.log(payload);
      state.token = payload.token;
      state.user = payload.user;
    },
  },
});

export const { login } = authSlice.actions;

export default authSlice.reducer;
