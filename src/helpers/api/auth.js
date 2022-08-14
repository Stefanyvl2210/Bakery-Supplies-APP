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

export const addAddressUser = async (data) => {
  console.log('data', data.data)
  console.log('token', data.token)
  await axios.post(`${ApiUrl}/address`, data.data, {
    headers: {
      Authorization: `Bearer ${data.token}`,
    },
  });
}

export const getAddressUser = async (data) =>
  await axios.get(`${ApiUrl}/address`, data);

// export const deleteAddressUser = async (data) =>
//   await axios.delete(`${ApiUrl}/address/${data.id}`, data, {
//     headers: {
//       Authorization: `Bearer ${params?.id}`,
//     },
//   });
