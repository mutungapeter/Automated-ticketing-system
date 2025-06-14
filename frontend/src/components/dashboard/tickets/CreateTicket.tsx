"use client";
import { zodResolver } from "@hookform/resolvers/zod";
import { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { IoCloseOutline } from "react-icons/io5";

import SuccessFailModal from "@/components/common/Modals/SuccessFailModal";
import SubmitSpinner from "@/components/common/spinners/submitSpinner";
import { useAssignTicketMutation } from "@/store/services/tickets/ticketsService";
import { BsChevronDown } from "react-icons/bs";
import { FiPlus } from "react-icons/fi";
import { CreateTicketSchema, TicketTypeFormData } from "@/schemas/tickets/tickets";

interface Props {
  refetchData: () => void;
}

const NewTicket = ({ refetchData }: Props) => {
  const [isOpen, setIsOpen] = useState(false);
  const [showSuccessModal, setShowSuccessModal] = useState(false);
  const [successMessage, setSuccessMessage] = useState("");
  const [isError, setIsError] = useState(false);

  const [assignTicket, { isLoading: isCreating }] = useAssignTicketMutation();

  const {
    register,
    handleSubmit,
    reset,
    formState: { isSubmitting, errors },
  } = useForm<TicketTypeFormData>({
    resolver: zodResolver(CreateTicketSchema),
  });

  useEffect(() => {
    console.log("Form Errors:", errors);
  }, [errors]);

  const handleCloseModal = () => {
    setIsOpen(false);
    reset();
  };

  const handleOpenModal = () => setIsOpen(true);

  const handleCloseSuccessModal = () => {
    setShowSuccessModal(false);
    setIsError(false);
    handleCloseModal();
  };

  const onSubmit = async (formData: TicketTypeFormData) => {
    console.log("submitting form data", formData);

    try {
      const response = await assignTicket(formData).unwrap();
      console.log("response", response);
      setIsError(false);
      setSuccessMessage("Ticket created and assigned to an agent successfully!");
      setShowSuccessModal(true);
      reset();
      refetchData();
    } catch (error: unknown) {
      console.log("error", error);
      setIsError(true);
      if (error && typeof error === "object" && "data" in error && error.data) {
        const errorData = (error as { data: { error: string } }).data;
        setSuccessMessage(`${errorData.error}` || "Failed to create and assign ticket.");
        setShowSuccessModal(true);
      } else {
        setIsError(true);
        setSuccessMessage("Unexpected error occurred. Please try again.");
        setShowSuccessModal(true);
      }
    }
  };

  return (
    <>
      <div
        onClick={handleOpenModal}
        className="flex flex-col md:flex-row md:items-center gap-4 w-full md:w-auto"
      >
        <div
          className="bg-primary-600 inline-flex cursor-pointer w-max 
         items-center space-x-2 text-white px-4 py-2 rounded-xl hover:bg-primary-700 hover:text-white transition duration-300"
        >
          <FiPlus className="text-md" />
          <span className="text-xs font-medium">New Ticket</span>
        </div>
      </div>

      {isOpen && (
        <div
          className="relative z-9999 animate-fadeIn"
          aria-labelledby="modal-title"
          role="dialog"
          aria-modal="true"
        >
          <div
            onClick={handleCloseModal}
            className="fixed inset-0 bg-black bg-opacity-50 transition-opacity animate-fadeIn"
            aria-hidden="true"
          ></div>

          <div
            className="fixed inset-0 min-h-full z-100 w-screen flex flex-col text-center md:items-center
           justify-start overflow-y-auto p-2 md:p-3"
          >
            <div
              className="relative transform justify-center animate-fadeIn max-h-[90vh]
                overflow-y-auto rounded-md bg-white text-left shadow-xl transition-all   
                w-full sm:max-w-c-500 md:max-w-500 px-3"
            >
              <>
                <div className="sticky top-0 bg-white z-40 flex  px-4 justify-between items-center py-3">
                  <p className="text-sm md:text-lg lg:text-lg font-semibold">
                    Create New Ticket
                  </p>
                  <div className="flex justify-end cursor-pointer">
                    <IoCloseOutline
                      size={30}
                      onClick={handleCloseModal}
                      className="text-gray-500"
                    />
                  </div>
                </div>

                <form
                  onSubmit={handleSubmit(onSubmit)}
                  className="space-y-4 mt-2 p-4 md:p-4 lg:p-4"
                >
               <div>
                      <div>
                        <label className="block space-x-1 text-sm font-medium mb-2">
                          Title<span className="text-red-500">*</span>
                        </label>
                        <input
                          type="text"
                          className="w-full py-2 px-4 border placeholder:text-sm rounded-md focus:outline-none"
                          placeholder="Title of the ticket"
                          {...register("title")}
                        />
                        {errors.title && (
                          <p className="text-red-500 text-sm mt-1">
                            {errors.title.message}
                          </p>
                        )}
                      </div>
                    </div>
                    <div>
                      <label
                        htmlFor="priority"
                        className="block text-sm mb-1 font-medium leading-6 text-gray-900"
                      >
                        Priority Status
                      </label>
                      <div className="relative">
                        <select
                          id="priority"
                          {...register("priority")}
                          className="w-full text-sm appearance-none cursor-pointer py-2 px-4 border border-gray-300 focus:outline-none focus:ring-1 focus:ring-blue-300 rounded-md text-gray-800 bg-white"
                        >
                          <option value="">Select Priority status</option>
                          <option value="high">High</option>
                          <option value="medium">Medium</option>
                          <option value="low">Low</option>
                        </select>
                        <BsChevronDown
                          size={12}
                          className="absolute top-1/2 right-3 transform -translate-y-1/2 text-gray-600 pointer-events-none"
                        />
                      </div>
                      {errors.priority && (
                        <p className="text-red-500 text-xs mt-0.5">
                          {errors.priority.message}
                        </p>
                      )}
                      
                      {/* Assignment Information Note */}
                      <div className="mt-2 p-3 bg-blue-50 border border-blue-200 rounded-md">
                        <p className="text-xs text-blue-700">
                          <span className="font-medium">ℹ️ Auto-Assignment:</span> Once created, this ticket will be automatically assigned based on priority level. High priority tickets are assigned to senior agents, with preference given to the least busy senior team members.
                        </p>
                      </div>
                    </div>

                   <div>
                      <div>
                        <label className="block space-x-1 text-sm font-medium mb-2">
                     Description
                          <span className="text-red-500">*</span>
                        </label>
                        <textarea
                         
                          className="w-full py-2 px-4 border placeholder:text-sm rounded-md focus:outline-none"
                          placeholder="write ticket description here..."
                          rows={4}
                          cols = {30}
                          {...register("description")}
                        />
                        {errors.description && (
                          <p className="text-red-500 text-sm mt-1">
                            {errors.description.message}
                          </p>
                        )}
                      </div>
                    </div>
               

                  <div className="sticky bottom-0 bg-white z-40 flex  space-x-3 gap-4 md:justify-end items-center py-3">
                    <button
                      type="button"
                      onClick={handleCloseModal}
                      className="border border-gray-300 bg-white shadow-sm text-gray-700 py-2 text-sm px-4 rounded-md w-full min-w-[100px] md:w-auto hover:bg-gray-50"
                    >
                      Cancel
                    </button>
                    <button
                      type="submit"
                      disabled={isSubmitting || isCreating}
                      className="bg-primary-600 text-white py-2 hover:bg-blue-700 text-sm px-3 md:px-4 rounded-md w-full min-w-[100px] md:w-auto"
                    >
                      {isSubmitting || isCreating ? (
                        <span className="flex items-center">
                          <SubmitSpinner />
                          <span>Submitting...</span>
                        </span>
                      ) : (
                        <span>Submit</span>
                      )}
                    </button>
                  </div>
                </form>
              </>
            </div>

            {showSuccessModal && (
              <SuccessFailModal
                message={successMessage}
                onClose={handleCloseSuccessModal}
                isError={isError}
              />
            )}
          </div>
        </div>
      )}
    </>
  );
};

export default NewTicket;