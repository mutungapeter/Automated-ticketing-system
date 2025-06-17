"use client";
import PageLoadingSpinner from "@/components/common/spinners/pageLoadingSpinner";

import { RegisterFormData, registerSchema } from "@/schemas/auth/register";
import {
  useCreateAccountMutation
} from "@/store/services/auth/authService";
import { zodResolver } from "@hookform/resolvers/zod";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useState } from "react";
import { useForm } from "react-hook-form";
import { BsChevronDown } from "react-icons/bs";
import { IoLockClosedOutline } from "react-icons/io5";
import { toast } from "react-toastify";
import SubmitSpinner from "../common/spinners/submitSpinner";

const Register = () => {
  const [showPassword, setShowPassword] = useState<boolean>(() => false);
  const [isRedirecting, setIsRedirecting] = useState<boolean>(false);
  const router = useRouter();
  const [createAccount, { isLoading }] = useCreateAccountMutation();

  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm({
    resolver: zodResolver(registerSchema),
  });
  
  const onSubmit = async (data: RegisterFormData) => {
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    const { confirmPassword: _confirmPassword, ...userData } = data;
    try {
      const response = await createAccount(userData).unwrap();
      console.log("response", response);
      const successMessage =
        response?.message || "Account created successfully";
      toast.success(successMessage);
      reset();
      setIsRedirecting(true);
      router.push("/login");
    } catch (error: unknown) {
      setIsRedirecting(false);
      console.log("error", error);
      if (
        error &&
        typeof error === "object" &&
        "data" in error &&
        "error" in (error as { data: { error: string } }).data
      ) {
        const errorMessage = (error as { data: { error: string } }).data
          .error;
        console.log("Error Message:", errorMessage);
        toast.error(errorMessage);
      } else {
        toast.error("Failed to CreateAccount. Please try again.");
      }
    }
  };

  return (
    <>
      {isRedirecting ? (
        <>
          <PageLoadingSpinner />
        </>
      ) : (
        <div className="bg-[#F4F7FA] min-h-screen flex items-center w-full justify-center py-2 mx-auto font-nunito">
          <div className="bg-white rounded-sm shadow-lg w-full md:max-w-c-400 overflow-hidden flex flex-col md:flex-row">
            <div className="p-4 w-full">
              <div className="flex items-center md:items-start justify-center mb-3">
                <Link href="/" className="cursor-pointer"></Link>
                <div className="flex flex-col text-center">
                  <h2 className="text-lg md:text-xl font-bold tracking-tight text-primary uppercase">
                    Ticketfy
                  </h2>
                </div>
              </div>

              <div>
                <div className="flex items-center mt-2">
                  <hr className="flex-grow border-gray-300" />
                  <h3 className="px-3 text-lg font-medium text-center">
                    Create Account
                  </h3>
                  <hr className="flex-grow border-gray-300" />
                </div>

                <form
                  onSubmit={handleSubmit(onSubmit)}
                  className="flex flex-col gap-3 mt-3"
                >
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                    <div>
                      <label
                        htmlFor="username"
                        className="text-xs mb-1 block font-medium text-gray-700"
                      >
                        Username
                      </label>
                      <div className="relative">
                        <input
                          id="username"
                          className="w-full px-2 py-1.5 border border-gray-300 focus:outline-none focus:border-blue-300 focus:bg-white text-xs text-gray-900 rounded-md"
                          type="text"
                          {...register("username")}
                          placeholder="e.g John"
                        />
                      </div>
                      {errors.username && (
                        <p className="text-red-500 text-xs mt-0.5">
                          {String(errors.username.message)}
                        </p>
                      )}
                    </div>
                    
                    <div>
                      <label
                        htmlFor="first_name"
                        className="text-xs mb-1 block font-medium text-gray-700"
                      >
                        First name
                      </label>
                      <div className="relative">
                        <input
                          id="first_name"
                          className="w-full px-2 py-1.5 border border-gray-300 focus:outline-none focus:border-blue-300 focus:bg-white text-xs text-gray-900 rounded-md"
                          type="text"
                          {...register("first_name")}
                          placeholder="e.g John"
                        />
                      </div>
                      {errors.first_name && (
                        <p className="text-red-500 text-xs mt-0.5">
                          {String(errors.first_name.message)}
                        </p>
                      )}
                    </div>
                    
                    <div>
                      <label
                        htmlFor="last_name"
                        className="text-xs mb-1 block font-medium text-gray-700"
                      >
                        Last name
                      </label>
                      <div className="relative">
                        <input
                          id="last_name"
                          className="w-full px-2 py-1.5 border text-xs border-gray-300 focus:outline-none focus:border-blue-300 focus:bg-white text-gray-900 rounded-md"
                          type="text"
                          {...register("last_name")}
                          placeholder="e.g Mwango"
                        />
                      </div>
                      {errors.last_name && (
                        <p className="text-red-500 text-xs mt-0.5">
                          {String(errors.last_name.message)}
                        </p>
                      )}
                    </div>

                    <div>
                      <label
                        htmlFor="email"
                        className="text-xs mb-1 block font-medium text-gray-700"
                      >
                        Email
                      </label>
                      <div className="relative">
                        <input
                          id="email"
                          type="email"
                          className="w-full placeholder px-2 py-1.5 border border-gray-300 focus:outline-none focus:border-blue-300 focus:bg-white text-xs text-gray-900 rounded-md"
                          {...register("email")}
                          placeholder="e.g johnmwango@gmail.com"
                        />
                      </div>
                      {errors.email && (
                        <p className="text-red-500 text-xs mt-0.5">
                          {String(errors.email.message)}
                        </p>
                      )}
                    </div>
                    
                    <div>
                      <label
                        htmlFor="gender"
                        className="block text-xs mb-1 font-medium leading-6 text-gray-900"
                      >
                        Gender
                      </label>
                      <div className="relative">
                        <select
                          id="gender"
                          {...register("gender")}
                          className="w-full text-xs appearance-none cursor-pointer px-2 py-1.5 border border-gray-300 focus:outline-none focus:ring-1 focus:ring-blue-300 rounded-md text-gray-800 bg-white"
                        >
                          <option value="">Select gender</option>
                          <option value="Male">Male</option>
                          <option value="Female">Female</option>
                        </select>
                        <BsChevronDown
                          size={12}
                          className="absolute top-1/2 right-3 transform -translate-y-1/2 text-gray-600 pointer-events-none"
                        />
                      </div>
                      {errors.gender && (
                        <p className="text-red-500 text-xs mt-0.5">{errors.gender.message}</p>
                      )}
                    </div>
                    
                    <div>
                      <label
                        htmlFor="phone_number"
                        className="text-xs mb-1 block font-medium text-gray-700"
                      >
                        Phone Number
                      </label>
                      <div className="relative">
                        <input
                          id="phone_number"
                          type="text"
                          className="w-full px-2 py-1.5 border border-gray-300 focus:outline-none focus:border-blue-300 focus:bg-white text-xs text-gray-900 rounded-md"
                          {...register("phone_number")}
                          placeholder="e.g +2547"
                        />
                      </div>
                      {errors.phone_number && (
                        <p className="text-red-500 text-xs mt-0.5">
                          {String(errors.phone_number.message)}
                        </p>
                      )}
                    </div>
                  </div>

                  <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                    <div>
                      <label className="text-xs mb-1 block font-medium text-gray-700">
                        Password
                      </label>
                      <div className="relative">
                        <input
                          className="w-full px-2 text-gray-500 py-1.5 border border-gray-300 focus:border-blue-300 focus:outline-none focus:bg-white text-xs rounded-md"
                          type={showPassword ? "text" : "password"}
                          {...register("password")}
                          placeholder="Enter password"
                        />
                      </div>
                      {errors.password && (
                        <p className="text-red-500 text-xs mt-0.5">
                          {String(errors.password.message)}
                        </p>
                      )}
                    </div>
                    
                    <div>
                      <label className="text-xs mb-1 block font-medium text-gray-700">
                        Confirm Password
                      </label>
                      <div className="relative">
                        <input
                          className="w-full px-2 text-gray-500 py-1.5 border border-gray-300 focus:border-blue-300 focus:outline-none focus:bg-white text-xs rounded-md"
                          type={showPassword ? "text" : "password"}
                          {...register("confirmPassword")}
                          placeholder="Confirm your password"
                        />
                      </div>
                      {errors.confirmPassword && (
                        <p className="text-red-500 text-xs mt-0.5">
                          {String(errors.confirmPassword.message)}
                        </p>
                      )}
                    </div>
                  </div>

                  <div className="flex items-center justify-between py-1">
                    <div className="flex items-center space-x-2">
                      <input
                        type="checkbox"
                        className="w-3 h-3"
                        onChange={() => setShowPassword(!showPassword)}
                      />
                      <span className="text-gray-700 text-xs">
                        Show Password
                      </span>
                    </div>
                    <Link
                      href="/forgot-password"
                      className="text-primary cursor-pointer text-xs"
                    >
                      <span>Forgot password?</span>
                    </Link>
                  </div>

                  <button
                    type="submit"
                    className={`${
                      isLoading ? "bg-primary border" : "bg-primary"
                    } text-sm font-medium py-1.5 rounded-lg w-full flex items-center cursor-pointer justify-center opacity-90 hover:opacity-100 transition-opacity mt-2`}
                  >
                    {isLoading ? (
                      <div className="flex justify-center items-center space-x-2">
                        <SubmitSpinner />
                        <span className="text-white text-sm">Creating..</span>
                      </div>
                    ) : (
                      <div className="flex items-center">
                        <IoLockClosedOutline
                          size={16}
                          className="text-white mr-2"
                        />
                        <span className="text-sm text-white font-medium">
                          Register
                        </span>
                      </div>
                    )}
                  </button>
                </form>
              </div>

              <div className="mt-3 flex items-center justify-center space-x-3">
                <p className="text-gray-600 text-xs">Already have an account?</p>
                <Link
                  href="/"
                  className="text-primary cursor-pointer font-semibold text-xs"
                >
                  Login
                </Link>
              </div>
            </div>
          </div>
        </div>
      )}
    </>
  );
};

export default Register;