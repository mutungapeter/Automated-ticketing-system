
import { apiSlice } from "../../api/apiSlice";

interface GetAgentsInterface{

  page?:number;
  page_size?:number;


 
}
export const agentsApi = apiSlice.injectEndpoints({
  endpoints: (builder) => ({
    getAgents: builder.query({
      query: ({
       
        page,
        page_size,
     
      }: GetAgentsInterface = {}) => {
        const queryParams: Record<string, string | number | boolean | undefined> = {};

       
        if (page) queryParams.page = page;
        if (page_size) queryParams.page_size = page_size;
       
      
        console.log("queryParams**************+", queryParams)
        return {
          url: `core/agents/list/`,
          method: "GET",
          params: queryParams,
        };
      },
    }),
   
   
    createAgent: builder.mutation({
      query: (data) => ({
        url: `core/agents/create/`,
        method: "POST",
        body: data,
        
      }),
    }),
 
    updateAgent: builder.mutation({
      query: ({ id, data }) => ({
        url: `core/agents/${id}/`,
        method: "PATCH",
        body: data,
        
      }),
    }),
   

    deleteAgent: builder.mutation({
      query: (id) => ({
        url: `students/delete-student/${id}/`,
        method: "DELETE",
      }),
    }),
    getAgent: builder.query({
      query: (id) => ({
        url: `core/agents/${id}/`,
        method: "GET",
      }),
    }),
   
   
  }),
});

export const {
useGetAgentsQuery,
useCreateAgentMutation,
useUpdateAgentMutation,
useDeleteAgentMutation,
useGetAgentQuery,






} = agentsApi;
