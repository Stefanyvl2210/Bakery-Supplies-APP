import axios from "../../config/axios";

export const getCategories = async () => await axios.get("/category");

export const getCategoryTree = async () => await axios.get("/category/tree");

export const createCategory = async (data) =>
  await axios.post("/category", data);

export const getCategoryById = async (id) =>
  await axios.get(`/category/${id}`);

export const editCategory = async (data, id) =>
  await axios.patch(`/category/${id}`, data);

export const deleteCategory = async (id) =>
  await axios.delete(`/category/${id}`);
