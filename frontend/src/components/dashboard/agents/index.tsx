"use client";

import Pagination from "@/components/common/Pagination";

import { useFilters } from "@/hooks/useFilters";


import DataTable, { Column } from "@/components/common/Table/DataTable";
import ContentSpinner from "@/components/common/spinners/dataLoadingSpinner";

import { PAGE_SIZE } from "@/lib/constants";

import { AgentType } from "@/definitions/agents";
import { useGetAgentsQuery } from "@/store/services/agents/agentsService";
import { useRouter, useSearchParams } from "next/navigation";
import { useMemo } from "react";
import NewAgent from "./CreateAgent";



const Agents = () => {
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

  
  const { data:agentsData, isLoading, error, refetch } = useGetAgentsQuery(queryParams, {
    refetchOnMountOrArgChange: true,
  });
  
  

 
 
  const columns: Column<AgentType>[] = [
    {
      header: "Name",
      accessor: "first_name",
      cell: (item: AgentType) => <span>{item.first_name} {item.last_name}</span>,
    },
    {
      header: "Email",
      accessor: "email",
      cell: (item: AgentType) => (
        <span className="text-sm font-normal">{item.email}</span>
      ),
    },
    {
      header: "Level",
      accessor: "level",
      cell: (item: AgentType) => (
        <span className="text-sm font-normal">{item.level}</span>
      ),
    },
    {
      header: "Gender",
      accessor: "gender",
      cell: (item: AgentType) => (
        <span>
          <span className="text-sm">{item.gender}</span>
        </span>
      ),
    },
    {
      header: "Assigned Tickets",
      accessor: "assigned_ticket_count",
      cell: (item: AgentType) => (
        <span>
          <span className="text-sm normal">{item.assigned_ticket_count}</span>
        </span>
      ),
    },
   

   

  ];
 
  console.log("data", agentsData);
  return (
    <>
      <div className="bg-white w-full  p-1 shadow-md rounded-lg font-nunito">
        <div className=" p-3  flex flex-col md:flex-row md:items-center lg:items-center md:gap-0 lg:gap-0 gap-4 lg:justify-between md:justify-between">
          <h2 className="font-semibold text-black text-xl">All Agents</h2>
          
         <div>
            <NewAgent refetchData={refetch} />
         </div>
        </div>

   
        {isLoading ? (
          <div className="flex justify-center py-8">
            <ContentSpinner />
          </div>
        ) : error ? (
          <div className="bg-red-50 p-4 rounded-md text-red-800 text-center">
            Error loading Agents . Please try again later.
          </div>
        ) : agentsData && agentsData.results.length > 0 ? (
          <DataTable
            data={agentsData?.results}
            columns={columns}
            isLoading={isLoading}
            error={error}
          />
        ) : (
          <div className="text-center text-gray-500 py-8">No data</div>
        )}

        {agentsData && agentsData.count > 0 && (
          <Pagination
            currentPage={currentPage}
            totalItems={agentsData.count}
            pageSize={PAGE_SIZE}
            onPageChange={handlePageChange}
          />
        )}

     
      </div>
    </>
  );
};

export default Agents;
