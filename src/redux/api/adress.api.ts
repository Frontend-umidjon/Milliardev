import { mainApi } from ".";
import { AddressType, CreateAddressDto, UpdateAddressDto } from "../../types";

export const addressApi = mainApi.injectEndpoints({
  endpoints: (builder) => ({
    getAddresses: builder.query<AddressType[], void>({
      query: () => "/api/addresses",
     
    }),

    getAddressById: builder.query<AddressType, string>({
      query: (id) => `/api/addresses/${id}`,
      
    }),

    createAddress: builder.mutation<void, CreateAddressDto>({
      query: (newAddress) => ({
        url: "/api/addresses",
        method: "POST",
        body: newAddress,
      }),
     
    }),

    updateAddress: builder.mutation<AddressType, { id: string; data: UpdateAddressDto }>({
      query: ({ id, data }) => ({
        url: `/api/addresses/${id}`,
        method: "PATCH",
        body: data,
      }),
     
    }),

    deleteAddress: builder.mutation<void, string>({
      query: (id) => ({
        url: `/api/addresses/${id}`,
        method: "DELETE",
      }),
     
    }),
  }),
  overrideExisting: false,
});

export const {
  useGetAddressesQuery,
  useGetAddressByIdQuery,
  useCreateAddressMutation,
  useUpdateAddressMutation,
  useDeleteAddressMutation,
} = addressApi;
