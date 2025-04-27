import { mainApi } from "./index";
import { ProjectType, ProjectResponse } from "../../types";

const extendedApi = mainApi.injectEndpoints({
  endpoints: (build) => ({
    createProject: build.mutation<ProjectType, Partial<ProjectType>>({
      query: (body) => ({
        url: "api/projects",
        method: "POST",
        body,
      }),
    }),

    getProjects: build.query<ProjectResponse, { is_done?: boolean } | void>({
      query: (params: { is_done?: boolean } = {}) => ({
        url: "api/projects",
        method: "GET",
        params,
      }),
    }),

    updateProject: build.mutation<ProjectType, { id: string; data: Partial<ProjectType> }>({
      query: ({ id, data }) => ({
        url: `api/projects/${id}`,
        method: "PATCH",
        body: data,
      }),
    }),
  }),
  overrideExisting: false,
});

export const {
  useCreateProjectMutation,
  useGetProjectsQuery,
  useUpdateProjectMutation,
} = extendedApi;
