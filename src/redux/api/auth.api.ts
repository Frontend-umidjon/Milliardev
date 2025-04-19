import { mainApi } from './index'

const extendedApi = mainApi.injectEndpoints({
  endpoints: (build) => ({
    login: build.mutation({
      query: (body) => ({
        url: 'api/auth/signin',
        method: "POST",
        body
      }),
    }),
    profile: build.query({
      query: ()=> ({
        url: "api/auth/profile",
        method: "GET",
        headers: {
          Authorization: `Bearer ${localStorage.getItem("access_token")}`
        }
      })
    })
  }),
  overrideExisting: false,
})

export const { useLoginMutation, useProfileQuery } = extendedApi