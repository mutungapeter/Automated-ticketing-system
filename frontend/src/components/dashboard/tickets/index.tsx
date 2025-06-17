"use client";

import Pagination from "@/components/common/Pagination";

import { useFilters } from "@/hooks/useFilters";


import DataTable, { Column } from "@/components/common/Table/DataTable";
import ContentSpinner from "@/components/common/spinners/dataLoadingSpinner";

import { PAGE_SIZE } from "@/lib/constants";


import { TicketType } from "@/definitions/tickets";
import { useGetTicketsQuery } from "@/store/services/tickets/ticketsService";
import { useRouter, useSearchParams } from "next/navigation";
import { useMemo } from "react";
import NewTicket from "./CreateTicket";



const Tickets = () => {
  const router = useRouter();
  const searchParams = useSearchParams();

  const { filters, currentPage, handlePageChange } =
    useFilters({
      initialFilters: {},
      initialPage: parseInt(searchParams.get("page") || "1", 10),
      router,
      debounceTime: 100,
      debouncedFields: [""],
    });

  const queryParams = useMemo(
    () => ({
      page: currentPage,
      page_size: PAGE_SIZE,
      ...filters,
    }),
    [currentPage, filters]
  );

  
  const { data:ticketesData, isLoading, error, refetch } = useGetTicketsQuery(queryParams, {
    refetchOnMountOrArgChange: true,
  });
  
  

 
 
  const columns: Column<TicketType>[] = [
    {
      header: "Name",
      accessor: "title",
      cell: (item: TicketType) => <span>{item.title} </span>,
    },
    {
      header: "Description",
      accessor: "description",
      cell: (item: TicketType) => (
        <span className="text-sm font-normal  whitespace-normal break-words">{item.description}</span>
      ),
    },
    {
      header: "Status",
      accessor: "status",
      cell: (item: TicketType) => (
        <span className={`text-sm font-normal px-3 py-1 rounded-md
            ${
            item.status === "open"
              ? "text-green-500 bg-green-100"
              : item.status === "closed"
              ? "text-red-500 bg-red-100"
              : "text-yellow-500 bg-yellow-100"
            }
            `}>{item.status}</span>
      ),
    },

    {
      header: "Priority",
      accessor: "priority",
      cell: (item: TicketType) => (
        <span>
          <span className={`text-sm
            ${item.priority === "high"
              ? "text-red-500 "
              : item.priority === "medium"
              ? "text-yellow-500 "
              : "text-green-500 "
            }
          `}>{item.priority}</span>
        </span>
      ),
    },
    {
      header: "Agent",
      accessor: "assigned_agent",
      cell: (item: TicketType) => (
        <span>
          <span className="text-sm normal">{item?.assigned_agent?.first_name}{item?.assigned_agent?.last_name}</span>
        </span>
      ),
    },
    {
      header: "Agent Level",
      accessor: "assigned_agent",
      cell: (item: TicketType) => (
        <span>
          <span className="text-sm normal">{item?.assigned_agent?.level}</span>
        </span>
      ),
    },
   
  ];
 

  return (
    <>
      <div className="bg-white w-full  p-1 shadow-md rounded-lg font-nunito">
        <div className=" p-3  flex flex-col md:flex-row md:items-center lg:items-center md:gap-0 lg:gap-0 gap-4 lg:justify-between md:justify-between">
          <h2 className="font-semibold text-black text-xl">All Tickets</h2>
          <NewTicket refetchData={refetch} />
         
        </div>

   
        {isLoading ? (
          <div className="flex justify-center py-8">
            <ContentSpinner />
          </div>
        ) : error ? (
          <div className="bg-red-50 p-4 rounded-md text-red-800 text-center">
            Error loading Tickets . Please try again later.
          </div>
        ) : ticketesData && ticketesData.results.length > 0 ? (
          <DataTable
            data={ticketesData?.results}
            columns={columns}
            isLoading={isLoading}
            error={error}
          />
        ) : (
          <div className="text-center text-gray-500 py-8">No data</div>
        )}

        {ticketesData && ticketesData.count > 0 && (
          <Pagination
            currentPage={currentPage}
            totalItems={ticketesData.count}
            pageSize={PAGE_SIZE}
            onPageChange={handlePageChange}
          />
        )}

     
      </div>
    </>
  );
};

export default Tickets;
