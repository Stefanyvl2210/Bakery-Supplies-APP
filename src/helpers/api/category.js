import axios from "../../config/axios";
import { ApiUrl } from "../url";

export const getCategories = async () => await axios.get(`${ApiUrl}/category`);

export const createCategory = async (data) =>
  await axios.post(`${ApiUrl}/category`, data);

export const getCategoryById = async (id) =>
  await axios.get(`${ApiUrl}/category/${id}`);

export const editCategory = async (data, id) =>
  await axios.patch(`${ApiUrl}/category/${id}`, data);

export const deleteCategory = async (id) =>
  await axios.delete(`${ApiUrl}/category/${id}`);
