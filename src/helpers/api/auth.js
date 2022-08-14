import axios from "../../config/axios";
import { ApiUrl } from "../url";

export const loginUser = async (data) => await axios.post(`${ApiUrl}/login`, data);

export const logoutUser = async (data) => await axios.post(`${ApiUrl}/logout`, data);

export const registerUser = async (data) => await axios.post(`${ApiUrl}/register`, data);