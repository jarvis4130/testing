import { PRODUCTS_URL } from "../../constant";
import { apiSlice } from "./apiSlice";

export const productsApiSlice = apiSlice.injectEndpoints({
  endpoints: (builder) => ({
    getProducts: builder.query({
      query: ({page,limit,keyword}) => ({
        url: PRODUCTS_URL,
        params: {
          page,
          limit,
          keyword,
        },
      }),
      keepUnusedDataFor: 5,
    }),
    getProductDetails: builder.query({
      query: (productId) => ({
        url: `${PRODUCTS_URL}/${productId}`,
      }),
      keepUnusedDataFor: 5,
    }),
    getTopSellingProducts: builder.query({
      query: () => ({
        url: `${PRODUCTS_URL}/top-5-best`,
      }),
      keepUnusedDataFor: 5,
    }),
    createReviewOnProduct: builder.mutation({
      query: ({ productId, data }) => ({
        url: `${PRODUCTS_URL}/${productId}/reviews`,
        method: "POST",
        body: data,
      }),
    }),
  }),
});

export const {
  useGetProductsQuery,
  useGetProductDetailsQuery,
  useGetTopSellingProductsQuery,
  useCreateReviewOnProductMutation,
} = productsApiSlice;
