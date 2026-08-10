import counterReducer, {
  removeCartProduct,
  updateCartProductQuantity,
} from "./counterSlice";

const cartState = {
  value: 0,
  status: "idle",
  products: [
    {
      id: 10,
      name: "Cake pan",
      price: 7,
      qty: 2,
      quantity_available: 4,
    },
  ],
  cartQty: 2,
};

describe("cart reducers", () => {
  beforeEach(() => {
    sessionStorage.clear();
  });

  it("updates the product quantity and cart counter", () => {
    const state = counterReducer(
      cartState,
      updateCartProductQuantity({ id: 10, quantity: 3 })
    );

    expect(state.products[0].qty).toBe(3);
    expect(state.cartQty).toBe(3);
  });

  it("keeps the quantity between one and the available stock", () => {
    const belowMinimum = counterReducer(
      cartState,
      updateCartProductQuantity({ id: 10, quantity: 0 })
    );
    const aboveMaximum = counterReducer(
      cartState,
      updateCartProductQuantity({ id: 10, quantity: 8 })
    );

    expect(belowMinimum.products[0].qty).toBe(1);
    expect(aboveMaximum.products[0].qty).toBe(4);
  });

  it("removes a product and clears the cart counter", () => {
    const state = counterReducer(cartState, removeCartProduct({ id: 10 }));

    expect(state.products).toEqual([]);
    expect(state.cartQty).toBe(0);
    expect(sessionStorage.getItem("shoppingCart")).toBeNull();
  });
});
