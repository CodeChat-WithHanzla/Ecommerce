import { PRODUCT_URL } from "../constants";
import apiSlice from "./apiSlice";

const productApiSlice = apiSlice.injectEndpoints({
  endpoints: (builder) => ({
    getProducts: builder.query({
      query: ({ keyword }) => ({
        url: `${PRODUCT_URL}`,
        params: { keyword }
      }),
      keepUnusedDataFor: 5,
      providesTags: ["Product"]
    }),
    getProductById: builder.query({
      query: (productId) => ({
        url: `${PRODUCT_URL}/${productId}`,
        providesTags: (result, error, productId) => [
          { type: "Product", id: productId }
        ]
      })
    }),
    getProductDetails: builder.query({
      query: (productId) => ({
        url: `${PRODUCT_URL}/${productId}`
      }),
      keepUnusedDataFor: 5
    }),
    allProducts: builder.query({
      query: () => ({
        url: `${PRODUCT_URL}/allProducts`
      })
    }),
    createProduct: builder.mutation({
      query: (data) => ({
        url: `${PRODUCT_URL}`,
        method: "POST",
        body: data
      }),
      invalidatesTags: ["Product"]
    }),
    updateProduct: builder.mutation({
      query: ({ productId, formData }) => ({
        url: `${PRODUCT_URL}/${productId}`,
        method: "PUT",
        body: formData
      })
    }),
    deleteProduct: builder.mutation({
      query: (productId) => ({
        url: `${PRODUCT_URL}/${productId}`,
        method: "DELETE"
      }),
      providesTags: ["Product"]
    }),
    createReview: builder.mutation({
      query: (data) => ({
        url: `${PRODUCT_URL}/${data.productId}/reviews`,
        method: "POST",
        body: data
      })
    }),
    getTopProducts: builder.query({
      url: `${PRODUCT_URL}/top`,
      keepUnusedDataFor: 5
    }),
    getNewProducts: builder.query({
      url: `${PRODUCT_URL}/new`,
      keepUnusedDataFor: 5
    })
  })
});
export const {
  useGetProductsQuery,
  useGetProductByIdQuery,
  useGetProductDetailsQuery,
  useAllProductsQuery,
  useCreateProductMutation,
  useUpdateProductMutation,
  useDeleteProductMutation,
  useCreateReviewMutation,
  useGetTopProductsQuery,
  useGetNewProductsQuery
} = productApiSlice;
