export const getAvailableStock = (product) => {
  const stock = Number(product?.quantity_available);

  return Number.isFinite(stock) ? Math.max(0, Math.floor(stock)) : 0;
};

export const getCartProductQuantity = (products, productId) => {
  const cartProduct = products.find(
    (product) => String(product.id) === String(productId)
  );

  return Math.max(0, Math.floor(Number(cartProduct?.qty) || 0));
};

export const getRemainingStock = (product, cartProducts) =>
  Math.max(
    0,
    getAvailableStock(product) -
      getCartProductQuantity(cartProducts, product?.id)
  );

export const clampQuantity = (value, maximum) => {
  const max = Math.max(0, Math.floor(Number(maximum) || 0));

  if (max === 0) return 0;

  const quantity = Math.floor(Number(value));

  if (!Number.isFinite(quantity)) return 1;

  return Math.min(Math.max(quantity, 1), max);
};
