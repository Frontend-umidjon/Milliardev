import { mainApi } from "./index";

const extendedApi = mainApi.injectEndpoints({
  endpoints: (build) => ({
    createProject: build.mutation({
      query: (body) => ({
        url: "api/projects",
        method: "POST",
        body,
      }),
    }),
    getProjects: build.query({
      query: (params) => ({
        url: "api/projects",
        method: "GET",
        params,
      }),
    }),
    updateProject: build.mutation<any, { id: string; data: any }>({
      query: ({ id, data }) => ({
        url: `api/projects/${id}`,
        method: "PATCH",
        body: data,
      }),
    }),
  }),
  overrideExisting: false,
});

export const { useCreateProjectMutation, useGetProjectsQuery, useUpdateProjectMutation } = extendedApi;
