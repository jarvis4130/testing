import { configureStore } from "@reduxjs/toolkit";
import { apiSlice } from "./components/slices/apiSlice";
import cartSliceReducer from "./components/slices/cartSlice";
import authSliceReducer from "./components/slices/authSlice";

const store = configureStore({
  reducer: {
    [apiSlice.reducerPath]: apiSlice.reducer,
    cart: cartSliceReducer,
    auth:authSliceReducer
  },
  // Adding the api middleware enables caching, invalidation, polling,
  // and other useful features of `rtk-query`.
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware().concat(apiSlice.middleware),
  devTools: true,
});

export default store;
