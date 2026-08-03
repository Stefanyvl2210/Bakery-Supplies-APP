import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  user: null,
  token: null,
  status: "idle",
};

export const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    sessionLoading: (state) => {
      state.status = "loading";
    },
    sessionAuthenticated: (state, { payload }) => {
      state.user = payload?.user ?? payload;
      state.token = payload?.token ?? state.token ?? null;
      state.status = "authenticated";
    },
    sessionAnonymous: (state) => {
      state.user = null;
      state.token = null;
      state.status = "anonymous";
    },
  },
});

export const {
  sessionLoading,
  sessionAuthenticated,
  sessionAnonymous,
} = authSlice.actions;

export const userLogged = (state) => state.auth.user;
export const authToken = (state) => state.auth.token;
export const authStatus = (state) => state.auth.status;
export const isAuthenticated = (state) =>
  state.auth.status === "authenticated" && Boolean(state.auth.user);

export const userHasRole = (user, roleName) =>
  user?.role === roleName ||
  user?.role?.name === roleName ||
  (Array.isArray(user?.roles) &&
    user.roles.some((role) =>
      typeof role === "string" ? role === roleName : role?.name === roleName
    ));

export const isAdmin = (state) => userHasRole(state.auth.user, "admin");

export default authSlice.reducer;
