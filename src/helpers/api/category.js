import axios from "../../config/axios";
import { ApiUrl } from "../url";

export const getCategories = async () => await axios.get(`${ApiUrl}/category`);

export const createCategory = async (data) =>
  await axios.post(`${ApiUrl}/category`, data);
