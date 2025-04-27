import { mainApi } from ".";
import { Admin, AdminResponse } from "../../types";

export const adminApi = mainApi.injectEndpoints({
  endpoints: (builder) => ({
    getAdmins: builder.query<AdminResponse, void>({
      query: () => "/api/admin",
      providesTags: (result) =>
        result?.data?.payload
          ? [
              ...result.data.payload.map((admin) => ({
                type: "ADMIN" as const,
                id: admin._id,
              })),
              { type: "ADMIN", id: "LIST" },
            ]
          : [{ type: "ADMIN", id: "LIST" }],
    }),

    getAdminById: builder.query<Admin, string>({
      query: (id) => `/api/admin/${id}`,
      providesTags: (_, __, id) => [{ type: "ADMIN", id }],
    }),

    createAdmin: builder.mutation<Admin, Admin>({
      query: (newAdmin) => ({
        url: "/api/admin",
        method: "POST",
        body: newAdmin,
      }),
      invalidatesTags: [{ type: "ADMIN", id: "LIST" }],
    }),

    updateAdmin: builder.mutation<Admin, { id: string; data: Partial<Admin> }>({
      query: ({ id, ...data }) => ({
        url: `/api/admin/${id}`,
        method: "PATCH",
        body: data,
      }),
      invalidatesTags: (_, __, { id }) => [
        { type: "ADMIN", id },
        { type: "ADMIN", id: "LIST" },
      ],
    }),

    deleteAdmin: builder.mutation<void, string>({
      query: (id) => ({
        url: `/api/admin/${id}`,
        method: "DELETE",
      }),
      invalidatesTags: (_, __, id) => [
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
