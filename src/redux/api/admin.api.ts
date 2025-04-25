import { mainApi } from ".";

export const adminApi = mainApi.injectEndpoints({
  endpoints: (builder) => ({
    getAdmins: builder.query({
      query: () => "/api/admin",
      providesTags: ["ADMIN"],
    }),

    getAdminById: builder.query({
      query: (id: string) => `/admin/${id}`,
      providesTags: (result, error, id) => [{ type: "ADMIN", id }],
    }),

    createAdmin: builder.mutation({
      query: (newAdmin) => ({
        url: "/api/admin",
        method: "POST",
        body: newAdmin,
      }),
      invalidatesTags: ["ADMIN"],
    }),

    updateAdmin: builder.mutation({
      query: ({ id, ...data }) => ({
        url: `/api/admin/${id}`,
        method: "PUT",
        body: data,
      }),
      invalidatesTags: (result, error, { id }) => [{ type: "ADMIN", id }],
    }),

    deleteAdmin: builder.mutation({
      query: (id: string) => ({
        url: `/api/admin/${id}`,
        method: "DELETE",
      }),
      invalidatesTags: (result, error, id) => [{ type: "ADMIN", id }],
    }),
  }),

  overrideExisting: false,
});

export const {
  useGetAdminsQuery,
  useGetAdminByIdQuery,
  useCreateAdminMutation,
  useUpdateAdminMutation,
  useDeleteAdminMutation,
} = adminApi;
