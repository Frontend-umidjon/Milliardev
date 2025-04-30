import { mainApi } from ".";
import { ServiceResponse, ServiceType } from "../../types";


export const servicesApi = mainApi.injectEndpoints({
  endpoints: (builder) => ({
    getServices: builder.query<ServiceResponse, void>({
      query: () => "/api/services",
    }),

    getServiceById: builder.query<ServiceType, string>({
      query: (id) => `/api/services/${id}`,
    }),

    createService: builder.mutation<void, FormData>({
      query: (formData) => ({
        url: "/api/services",
        method: "POST",
        body: formData,
      }),
    }),

    updateService: builder.mutation<void, { id: string; data: FormData }>({
      query: ({ id, data }) => ({
        url: `/api/services/${id}`,
        method: "PATCH",
        body: data,
      }),
    }),

    deleteService: builder.mutation<void, string>({
      query: (id) => ({
        url: `/api/services/${id}`,
        method: "DELETE",
      }),
    }),
  }),
  overrideExisting: false,
});

export const {
  useGetServicesQuery,
  useGetServiceByIdQuery,
  useCreateServiceMutation,
  useUpdateServiceMutation,
  useDeleteServiceMutation,
} = servicesApi;
