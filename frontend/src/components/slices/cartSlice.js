import { createSlice } from "@reduxjs/toolkit";
import { toast } from "react-hot-toast";

const initialState = localStorage.getItem("cart")
  ? JSON.parse(localStorage.getItem("cart"))
  : {
      cart: [],
      shippingAddress: {},
      PaymentMethod: "Paypal",
    };

const cartSlice = createSlice({
  name: "cart",
  initialState,
  reducers: {
    addItem(state, action) {
      const newItem = action.payload;
      const existingItem = state.cart.find(
        (item) => item.productId === newItem.productId
      );
      if (existingItem) {
        toast.error("Item already added in cart");
        return;
      }

      state.cart.push(newItem);
      localStorage.setItem("cart", JSON.stringify(state));
    },
    deleteItem(state, action) {
      state.cart = state.cart.filter(
        (item) => item.productId !== action.payload
      );
      localStorage.setItem("cart", JSON.stringify(state));
    },
    increaseItemQuantity(state, action) {
      const item = state.cart.find((item) => item.productId === action.payload);

      if (item && item.quantity >= 10) {
        toast.error("Cannot Add more than 10 items at once");
        return;
      }

      if (item && item.quantity < item.stock) {
        item.quantity++;
        item.totalPrice = item.quantity * item.unitPrice;
      } else {
        toast.error("Product is out of stock or quantity limit reached.");
      }
      localStorage.setItem("cart", JSON.stringify(state));
      // update stock in database after doing the payment
    },
    decreaseItemQuantity(state, action) {
      const item = state.cart.find((item) => item.productId === action.payload);

      item.quantity--;
      item.totalPrice = item.quantity * item.unitPrice;

      if (item.quantity === 0) cartSlice.caseReducers.deleteItem(state, action);
      localStorage.setItem("cart", JSON.stringify(state));
    },
    clearCart(state) {
      state.cart = [];
      localStorage.removeItem("cart");
    },
    saveShippingAddress(state, action) {
      state.shippingAddress = action.payload;
      localStorage.setItem("cart", JSON.stringify(state));
    },
  },
});

export const {
  addItem,
  deleteItem,
  increaseItemQuantity,
  decreaseItemQuantity,
  clearCart,
  saveShippingAddress,
} = cartSlice.actions;

export default cartSlice.reducer;

export const getCart = (state) => state.cart.cart;
export const getShippingAddress = (state) => state.cart.shippingAddress;

export const getTotalCartQuantity = (state) =>
  state.cart.cart.reduce((sum, item) => sum + item.quantity, 0);

export const getTotalCartPrice = (state) =>
  state.cart.cart.reduce((sum, item) => sum + item.totalPrice, 0);

export const getCurrentQuantityById = (id) => (state) =>
  state.cart.cart.find((item) => item.productId === id)?.quantity ?? 0;
