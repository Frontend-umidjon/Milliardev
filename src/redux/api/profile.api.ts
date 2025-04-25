import { mainApi } from ".";

export const extendedApi = mainApi.injectEndpoints({
  endpoints: (builder) => ({
    
    getProfile: builder.query({
      query: () => ({
        url: "/api/auth/profile",
        method: "GET",
        
      }),
    }),

  
  }),
});

export const {
  useGetProfileQuery
} = extendedApi;
