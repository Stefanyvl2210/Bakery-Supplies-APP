import axios from "../../config/axios";

const appendProducts = (formData, products = []) => {
  products.forEach((product, index) => {
    formData.append(`products[${index}][id]`, product.id);
    formData.append(`products[${index}][quantity]`, product.quantity);
  });
};

export const buildOrderFormData = ({
  address_id,
  guest,
  guest_address,
  delivery_type,
  payment_method_id,
  reference,
  reported_amount,
  proof,
  products,
}) => {
  const formData = new FormData();

  if (address_id) formData.append("address_id", address_id);
  if (guest_address) formData.append("guest_address", guest_address);
  if (guest?.name) formData.append("guest[name]", guest.name);
  if (guest?.phone) formData.append("guest[phone]", guest.phone);
  if (guest?.email) formData.append("guest[email]", guest.email);

  formData.append("delivery_type", delivery_type);
  formData.append("payment_method_id", payment_method_id);

  if (reference) formData.append("reference", reference);
  if (reported_amount) formData.append("reported_amount", reported_amount);
  if (proof) formData.append("proof", proof);

  appendProducts(formData, products);

  return formData;
};

export const createOrder = async (data) =>
  await axios.post("/orders", buildOrderFormData(data));

export const createGuestOrder = async (data) =>
  await axios.post("/guest-orders", buildOrderFormData(data));

export const getGuestOrder = async (token) =>
  await axios.get(`/guest-orders/${token}`);

export const getOrder = async (id) => await axios.get(`/orders/${id}`);

export const getOrders = async (params = {}) =>
  await axios.get("/orders", { params });

export const getOrdersByUser = async (userId, params = {}) =>
  await axios.get(`/orders/users/${userId}`, { params });

export const updateOrder = async (id, data) =>
  await axios.patch(`/orders/${id}`, data);

export const deleteOrder = async (id) => await axios.delete(`/orders/${id}`);

export const approvePayment = async (id) =>
  await axios.post(`/orders/${id}/approve-payment`);

export const rejectPayment = async (id, reason) =>
  await axios.post(`/orders/${id}/reject-payment`, { reason });

export const confirmCash = async (id) =>
  await axios.post(`/orders/${id}/confirm-cash`);

export const markCashPaid = async (id) =>
  await axios.post(`/orders/${id}/mark-cash-paid`);

export const getPaymentProofUrl = (id) =>
  `${axios.defaults.baseURL}/orders/${id}/payment-proof`;
