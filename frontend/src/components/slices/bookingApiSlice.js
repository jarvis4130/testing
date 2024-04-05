import { BOOKINGS_URL } from "../../constant";
import { apiSlice } from "./apiSlice";

export const bookingsApiSlice = apiSlice.injectEndpoints({
  endpoints: (builder) => ({
    getMyProducts: builder.query({
      query: () => ({
        url: `${BOOKINGS_URL}/my-products`,
      }),
      keepUnusedDataFor: 5,
    }),
  }),
});

export const { useGetMyProductsQuery } = bookingsApiSlice
