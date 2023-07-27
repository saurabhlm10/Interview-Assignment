"use client";

import Button from "@/Components/UI/Button";
import userFormSchema from "@/Models/UserFormSchema";
import axiosBackendInstance from "@/utils/axios";
import { zodResolver } from "@hookform/resolvers/zod";
import { AxiosError } from "axios";
import { useRouter } from "next/navigation";
import { FC, useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import toast from "react-hot-toast/headless";

interface pageProps {}

const Page: FC<pageProps> = ({}) => {
  const router = useRouter();
  const [isLoading, setIsLoading] = useState<boolean>(false);

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<UserFormData>({
    resolver: zodResolver(userFormSchema),
  });

  const createUser = async (data: UserFormData) => {
    setIsLoading(true);

    try {
      // Request To Create User
      const response = await axiosBackendInstance.post("/user/create", data);
      toast.success(response.data.message);

      // Send User to Home Page if successful
      router.push("/");
    } catch (error) {
      // If Error, Show Error Message In Toast
      if (error instanceof AxiosError) {
        toast.error(error.response?.data.message);
      }
      if (error instanceof Error) {
        toast.error(error.message);
      }
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    return () => {
      // Set Loading State Back To False
      setIsLoading(false);
    };
  }, []);

  return (
    <>
      <h1 className="text-center text-5xl mt-4">Create User</h1>
      <div className="w-full flex justify-center items-center">
        <form
          className="w-11/12 md:w-1/2 2xl:w-1/3 bg-white dark:bg-neutral-700 rounded mt-8 py-4 px-4 text-xl"
          onSubmit={handleSubmit(createUser)}
        >
          {/* Input Fields */}
          <div className=" flex flex-col lg:flex-row justify-between  mb-2">
            <h5 className="md:w-full xl:w-1/3 text-neutral-800 dark:text-neutral-50 mb-4 flex flex-row ">
              First Name:
            </h5>
            <div></div>
            <div className="flex-1 flex flex-col lg:items-end">
              <input
                {...register("firstName")}
                type="text"
                className="p-0.5 2xl:w-full h-4/5  bg-white text-black rounded-lg focus:outline-none"
              />
              <div
                className={`text-red-300 text-xs
          ${errors.firstName ? "block" : "invisible"}
          `}
              >
                <div>
                  {errors.firstName ? errors.firstName.message : "default"}
                </div>
              </div>
            </div>
          </div>
          <div className=" flex flex-col lg:flex-row justify-between  mb-2">
            <h5 className="md:w-full xl:w-1/3 text-neutral-800 dark:text-neutral-50 mb-4 flex flex-row">
              Last Name:
            </h5>
            <div className="flex-1 flex flex-col lg:items-end">
              <input
                {...register("lastName")}
                type="text"
                className="p-0.5 2xl:w-full h-4/5  bg-white text-black rounded-lg focus:outline-none"
              />
              <div
                className={`text-red-300 text-xs
          ${errors.lastName ? "block" : "invisible"}
          `}
              >
                <div>
                  {errors.lastName ? errors.lastName.message : "default"}
                </div>
              </div>
            </div>
          </div>
          <div className=" flex flex-col lg:flex-row justify-between  mb-2">
            <h5 className="md:w-full xl:w-1/3 text-neutral-800 dark:text-neutral-50 mb-4 flex flex-row">
              Age:
            </h5>
            <div className="flex-1 flex flex-col lg:items-end ">
              <input
                {...register("age", {
                  valueAsNumber: true,
                })}
                type="number"
                className="p-0.5 2xl:w-full h-4/5  bg-white text-black rounded-lg focus:outline-none"
              />
              <div
                className={`text-red-300 text-xs
          ${errors.age ? "block" : "invisible"}
          `}
              >
                <div>{errors.age ? errors.age.message : "default"}</div>
              </div>
            </div>
          </div>
          <div className="flex flex-col lg:flex-row justify-between  mb-2">
            <h5 className="md:w-full xl:w-1/3 text-neutral-800 dark:text-neutral-50 mb-4 flex flex-row ">
              Phone Number:
            </h5>
            <div className="flex-1 flex flex-col lg:items-end ">
              <input
                {...register("phoneNumber")}
                type="text"
                className="p-0.5 2xl:w-full h-4/5  bg-white text-black rounded-lg focus:outline-none"
              />
              <div
                className={`text-red-300 text-xs
          ${errors.phoneNumber ? "block" : "invisible"}
          `}
              >
                <div>
                  {errors.phoneNumber ? errors.phoneNumber.message : "default"}
                </div>
              </div>
            </div>
          </div>

          <div className="mt-4 text-end">
            <Button
              isLoading={isLoading}
              type="submit"
              className="inline-block rounded bg-green-500 px-6 pb-2 pt-2.5 text-xs font-medium uppercase leading-normal text-white shadow-[0_4px_9px_-4px_#3b71ca] transition duration-150 ease-in-out hover:bg-primary-600 hover:shadow-[0_8px_9px_-4px_rgba(59,113,202,0.3),0_4px_18px_0_rgba(59,113,202,0.2)] focus:bg-primary-600 focus:shadow-[0_8px_9px_-4px_rgba(59,113,202,0.3),0_4px_18px_0_rgba(59,113,202,0.2)] focus:outline-none focus:ring-0 active:bg-primary-700 active:shadow-[0_8px_9px_-4px_rgba(59,113,202,0.3),0_4px_18px_0_rgba(59,113,202,0.2)] dark:shadow-[0_4px_9px_-4px_rgba(59,113,202,0.5)] dark:hover:shadow-[0_8px_9px_-4px_rgba(59,113,202,0.2),0_4px_18px_0_rgba(59,113,202,0.1)] dark:focus:shadow-[0_8px_9px_-4px_rgba(59,113,202,0.2),0_4px_18px_0_rgba(59,113,202,0.1)] dark:active:shadow-[0_8px_9px_-4px_rgba(59,113,202,0.2),0_4px_18px_0_rgba(59,113,202,0.1)]"
              text="Create"
            />
          </div>
        </form>
      </div>
    </>
  );
};

export default Page;
