import { mainApi } from ".";

export const extendedApi = mainApi.injectEndpoints({
  endpoints: (builder) => ({
    getCustomers: builder.query<any, { is_active?: boolean } | void>({   // исправлено тут
      query: (params) => ({
        url: "/api/customers",
        method: "GET",
        params,
      }),
    }),

    updateCustomer: builder.mutation<any, { id: string; data: any }>({
      query: ({ id, data }) => ({
        url: `/api/customers/${id}`,
        method: "PATCH",
        body: data,
      }),
    }),

    deleteCustomer: builder.mutation<any, string>({
      query: (id) => ({
        url: `/api/customers/${id}`,
        method: "DELETE",
      }),
    }),

    getSingleCustomer: builder.query<any, string>({
      query: (id) => ({
        url: `/api/customers/${id}`,
        method: "GET",
      }),
    }),
  }),
});

export const {
  useGetCustomersQuery,
  useUpdateCustomerMutation,
  useDeleteCustomerMutation,
  useGetSingleCustomerQuery,
} = extendedApi;
