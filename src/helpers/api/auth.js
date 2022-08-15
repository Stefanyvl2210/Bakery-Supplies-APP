import axios from "../../config/axios";
import { ApiUrl } from "../url";

export const loginUser = async (data) =>
  await axios.post(`${ApiUrl}/login`, data);

export const logoutUser = async (data) =>
  await axios.post(`${ApiUrl}/logout`, data);

export const registerUser = async (data) =>
  await axios.post(`${ApiUrl}/register`, data);

export const verifyEmail = async (data, token) =>
  await axios.post(`${ApiUrl}/verify-email`, data, {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });

export const addAddressUser = async (data, token) => 
  await axios.post(`${ApiUrl}/address`, data, {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });

export const getAddressUser = async (token) =>
  await axios.get(`${ApiUrl}/address`, '', {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });

export const deleteAddressUser = async (id, token) =>
  await axios.delete(`${ApiUrl}/address/${id}`, '', {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });
