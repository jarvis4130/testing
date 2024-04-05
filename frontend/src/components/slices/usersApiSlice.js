import { USERS_URL } from "../../constant";
import { apiSlice } from "./apiSlice";

export const usersApiSlice = apiSlice.injectEndpoints({
  endpoints: (builder) => ({
    getMe: builder.query({
      query: () => ({
        url: `${USERS_URL}/me`,
      }),
      keepUnusedDataFor: 5,
    }),
    login: builder.mutation({
      query: (data) => ({
        url: `${USERS_URL}/login`,
        method: "POST",
        body: data,
      }),
      keepUnusedDataFor: 5,
    }),
    logout: builder.mutation({
      query: (data) => ({
        url: `${USERS_URL}/logout`,
        method: "POST",
        body: data,
      }),
    }),
    signup: builder.mutation({
      query: (data) => ({
        url: `${USERS_URL}/signup`,
        method: "POST",
        body: data,
      }),
    }),
    updateme: builder.mutation({
      query: (data) => ({
        url: `${USERS_URL}/updateMe`,
        method: "PATCH",
        body: data,
      }),
    }),
    forgotpassword: builder.mutation({
      query: (data) => ({
        url: `${USERS_URL}/forgotPassword`,
        method: "POST",
        body: data,
      }),
    }),
    updatemypassword: builder.mutation({
      query: (data) => ({
        url: `${USERS_URL}/updateMyPassword`,
        method: "PATCH",
        body: data,
      }),
    }),
    resetpassword: builder.mutation({
      query: ({ token, data }) => ({
        url: `${USERS_URL}/resetPassword/${token}`,
        method: "PATCH",
        body: data,
      }),
    }),
    addtowishlist: builder.mutation({
      query: ({ userId, productData }) => ({
        url: `${USERS_URL}/${userId}/wishlist`,
        method: "POST",
        body: productData,
      }),
    }),
  }),
});

export const {
  useGetMeQuery,
  useLoginMutation,
  useLogoutMutation,
  useSignupMutation,
  useUpdatemeMutation,
  useUpdatemypasswordMutation,
  useForgotpasswordMutation,
  useResetpasswordMutation,
  useAddtowishlistMutation,
} = usersApiSlice;
