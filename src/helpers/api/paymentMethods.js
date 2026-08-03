import axios from "../../config/axios";

export const getPaymentMethods = async () => await axios.get("/payment-methods");

export const getAdminPaymentMethods = async () =>
  await axios.get("/admin/payment-methods");

export const createPaymentMethod = async (data) =>
  await axios.post("/admin/payment-methods", data);

export const updatePaymentMethod = async (id, data) =>
  await axios.patch(`/admin/payment-methods/${id}`, data);

export const deletePaymentMethod = async (id) =>
  await axios.delete(`/admin/payment-methods/${id}`);
