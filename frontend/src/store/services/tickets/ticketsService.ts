
import { apiSlice } from "../../api/apiSlice";

interface MarksInterface{

  page?:number;
  page_size?:number;
  ticket_no?:string;
  status?:string;
}
export const academicsApis = apiSlice.injectEndpoints({
  endpoints: (builder) => ({
  getTickets: builder.query({
      query: ({
        page,
        page_size,
        ticket_no,
       
      }: MarksInterface = {}) => {
        const queryParams: Record<string, string | number | boolean | undefined> = {};
        if (page) queryParams.page = page;
        if (page_size) queryParams.page_size = page_size;
        if (ticket_no) queryParams.ticket_no = ticket_no;
    
        console.log("queryParams====",queryParams)
  
        return {
          url: `core/tickets/list/`,
          method: 'GET',
          params: queryParams,
        };
      },
    }),

   
    assignTicket: builder.mutation({
      query: (data) => ({
        url: `core/tickets/create/`,
        method: "POST",
        body: data,
        
      }),
    }),
   
  
    updateTicket: builder.mutation({
      query: ({id, data}) => ({
        url: `core/tickets/${id}/`,
        method: "PATCH",
        body: data,
        
      }),
    }),
 
    
   
   
  }),
});

export const {
useGetTicketsQuery,
useUpdateTicketMutation,
useAssignTicketMutation

} = academicsApis;
