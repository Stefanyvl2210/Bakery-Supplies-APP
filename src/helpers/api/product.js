import axios from "../../config/axios";

export const createProduct = async (data) =>
  await axios.post("/product", data);

export const getProducts = async (params = {}) => await axios.get("/product", { params });

export const getProductById = async (id) =>
  await axios.get(`/product/${id}`);

export const editProduct = async (data, id) =>
  await axios.post(`/product/${id}?_method=PATCH`, data);

export const deleteProduct = async (id) =>
  await axios.delete(`/product/${id}`);
