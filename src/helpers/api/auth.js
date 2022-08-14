import axios from "../../config/axios";
import Axios from "axios";
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
