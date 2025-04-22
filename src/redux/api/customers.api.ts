import { mainApi } from ".";

export const extendedApi = mainApi.injectEndpoints({
    endpoints: (builder) => ({
        getCustomers: builder.query({
            query: () => ({
                url: "api/customers",
                method: "GET",
            }),
        }), 
        UpdateCustomer: builder.mutation({
            query: ({ id, data }) => ({
                url: `api/customers/${id}`,
                method: "PATCH",
                body: data,
            }), 
        }),
        DeleteCustomer: builder.mutation({
            query: (id) => ({
                url: `api/customers/${id}`,
                method: "DELETE",
            }),
        }),
        GetSingleCustomer: builder.query({
            query: (id) => ({
                url: `api/customers/${id}`,
                method: "GET",
            }),
        }),


    })
});

export const { useGetCustomersQuery, useUpdateCustomerMutation, useDeleteCustomerMutation, useGetSingleCustomerQuery } = extendedApi
