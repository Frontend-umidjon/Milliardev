import { mainApi } from ".";
import { CustomerType } from "../../types"; 

interface CustomerResponse {
  data: {
    payload: CustomerType[];
  };
}

export const extendedApi = mainApi.injectEndpoints({
  endpoints: (builder) => ({
    getCustomers: builder.query<CustomerResponse, { is_active?: boolean } | void>({

      query: (params) => ({
        url: "/api/customers",
        method: "GET",
        params: params || undefined,
      }),
    }),

    updateCustomer: builder.mutation<CustomerType, { id: string; data: Partial<CustomerType> }>({
      query: ({ id, data }) => ({
        url: `/api/customers/${id}`,
        method: "PATCH",
        body: data,
      }),
    }),

    deleteCustomer: builder.mutation<void, string>({
      query: (id) => ({
        url: `/api/customers/${id}`,
        method: "DELETE",
      }),
    }),

    getSingleCustomer: builder.query<CustomerType, string>({
      query: (id) => ({
        url: `/api/customers/${id}`,
        method: "GET",
      }),
    }),
  }),
  overrideExisting: false,
});

export const {
  useGetCustomersQuery,
  useUpdateCustomerMutation,
  useDeleteCustomerMutation,
  useGetSingleCustomerQuery,
} = extendedApi;
