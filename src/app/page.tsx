"use client";

import UserCardList from "@/Components/UserCardList";
import { setUsers, userState } from "@/features/user/userSlice";
import axiosBackendInstance from "@/utils/axios";
import { AxiosError } from "axios";
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import toast from "react-hot-toast";
import LoadingSVG from "@/Components/UI/LoadingSVG";

export default function Home() {
  const dispatch = useDispatch();
  const [isLoading, setIsLoading] = useState(true);
  const { users } = useSelector(userState);

  const getUsers = async () => {
    try {
      const response = await axiosBackendInstance.get("/users");
      dispatch(setUsers(response.data.data));
    } catch (error) {
      console.log(error);
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

  // Fetch All Users When The Page Loads
  useEffect(() => {
    getUsers();

    return () => {
      // Set Loading State Back To False
      setIsLoading(false)
    }
  }, []);

  return (
    <main className="">
      <div className="w-full flex flex-row justify-center">
        {isLoading ? (
          <div className="mt-4 flex flex-col items-center">
            <LoadingSVG className="w-20 h-20 animate-spin" />
            <h1 className="mt-2 text-2xl">Fetching Users</h1>
          </div>
        ) : (
          // Show Users
          <UserCardList
            users={users}
            className="w-4/5 md:w-1/2 lg:w-1/3 2xl:w-1/4 flex flex-col justify-center"
          />
        )}
      </div>
    </main>
  );
}
