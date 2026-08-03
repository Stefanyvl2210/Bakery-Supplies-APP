import axios from "../../config/axios";
import { getResourceData } from "./response";

export const loginUser = async (data) => await axios.post("/login", data);

export const getAuthenticatedUser = async (config = {}) =>
  await axios.get("/user", config);

export const getAuthPayload = (response) => getResourceData(response);

export const getUserFromAuthResponse = (response) => {
  const payload = getAuthPayload(response);
  const user = payload?.user ?? payload;

  return Array.isArray(user) ? null : user ?? null;
};

export const getTokenFromAuthResponse = (response) =>
  getAuthPayload(response)?.token ??
  response?.data?.token ??
  response?.data?.access_token ??
  null;

export const logoutUser = async () => await axios.post("/logout");

export const registerUser = async (data) => await axios.post("/register", data);

export const forgotPassword = async (data) =>
  await axios.post("/forgot-password", data);

export const resetPassword = async (data) =>
  await axios.post("/reset-password", data);

export const verifyEmail = async (data, token) =>
  await axios.post("/verify-email", data, {
    headers: token ? { Authorization: `Bearer ${token}` } : undefined,
  });

export const resendEmailVerification = async () =>
  await axios.post("/verify-email/resend");

export const addAddressUser = async (data) =>
  await axios.post("/address", data);

export const getAddressUser = async () => await axios.get("/address");

export const updateAddressUser = async (id, data) =>
  await axios.patch(`/address/${id}`, data);

export const deleteAddressUser = async (id) =>
  await axios.delete(`/address/${id}`);

export const updateUser = async (id, data) => await axios.put(`/user/${id}`, data);
