import axios from "../../config/axios";
import { ApiUrl } from "../url";

export const createProduct = async (data) =>
  await axios.post(`${ApiUrl}/product`, data);

export const getProducts = async () => await axios.get(`${ApiUrl}/product`);

export const getProductById = async (id) =>
  await axios.get(`${ApiUrl}/product/${id}`);

export const editProduct = async (data, id) =>
  await axios.post(`${ApiUrl}/product/${id}?_method=PATCH`, data);

export const deleteProduct = async (id) =>
  await axios.delete(`${ApiUrl}/product/${id}`);
