import { mainApi } from ".";

export const adminApi = mainApi.injectEndpoints({
  endpoints: (builder) => ({
    getAdmins: builder.query<any, void>({
      query: () => "/api/admin",
      providesTags: (result) =>
        result?.data?.payload
          ? [
              ...result.data.payload.map(({ _id }: { _id: string }) => ({
                type: "ADMIN" as const,
                id: _id,
              })),
              { type: "ADMIN", id: "LIST" },
            ]
          : [{ type: "ADMIN", id: "LIST" }],
    }),

    getAdminById: builder.query<any, string>({
      query: (id) => `/api/admin/${id}`,
      providesTags: (result, error, id) => [{ type: "ADMIN", id }],
    }),

    createAdmin: builder.mutation<any, any>({
      query: (newAdmin) => ({
        url: "/api/admin",
        method: "POST",
        body: newAdmin,
      }),
      invalidatesTags: [{ type: "ADMIN", id: "LIST" }],
    }),

    updateAdmin: builder.mutation<any, { id: string; [key: string]: any }>({
      query: ({ id, ...data }) => ({
        url: `/api/admin/${id}`,
        method: "PATCH",
        body: data,
      }),
      invalidatesTags: (result, error, { id }) => [
        { type: "ADMIN", id },
        { type: "ADMIN", id: "LIST" },
      ],
    }),

    deleteAdmin: builder.mutation<any, string>({
      query: (id) => ({
        url: `/api/admin/${id}`,
        method: "DELETE",
      }),
      invalidatesTags: (result, error, id) => [
        { type: "ADMIN", id },
        { type: "ADMIN", id: "LIST" },
      ],
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
