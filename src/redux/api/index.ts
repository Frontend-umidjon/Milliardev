import { createApi, fetchBaseQuery, BaseQueryFn, FetchArgs, FetchBaseQueryError } from '@reduxjs/toolkit/query/react';
import { logout } from '../feautures/auth.slice';

const baseQuery = fetchBaseQuery({
  baseUrl: "https://api.milliardev.com",
  prepareHeaders: (headers) => {
    const token = localStorage.getItem("access_token");
    if (token) {
      headers.set("Authorization", `Bearer ${token}`);
    }
    return headers;
  },
});

const baseQueryWithAuthHandling: BaseQueryFn<string | FetchArgs, unknown, FetchBaseQueryError> = async (args, api, extraOptions) => {
  const result = await baseQuery(args, api, extraOptions);

  if (result.error?.status === 401) {
    api.dispatch(logout());
  }

  return result;
};

export const mainApi = createApi({
  reducerPath: 'mainApi',
  baseQuery: baseQueryWithAuthHandling,
  endpoints: () => ({}),
  tagTypes: ["BLOG", "PRODUCT", "ADMIN", "ADDRESS", "CUSTOMER"],
});
