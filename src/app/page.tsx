"use client";

import UserCardList from "@/Components/UserCardList";
import { setUsers, userState } from "@/features/user/userSlice";
import axiosBackendInstance from "@/utils/axios";
import { AxiosError } from "axios";
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import toast from "react-hot-toast";
import LoadingSVG from "@/Components/UI/LoadingSVG";

interface SelectorBody {
  users: User[];
}

export default function Home() {
  const dispatch = useDispatch();
  const [isLoading, setIsLoading] = useState(true);
  const { users }: SelectorBody = useSelector(userState);

  const getUsers = async () => {
    try {
      const response = await axiosBackendInstance.get("/users");
      dispatch(setUsers(response.data.data as User[]));
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
      setIsLoading(false);
    };
  }, []);

  console.log(users);

  // if (!users || !users.length) return <div>No Users To Show</div>;

  return (
    <main className="">
      <div className="w-full flex flex-row justify-center">
        {isLoading ? (
          <div className="mt-4 flex flex-col items-center">
            <LoadingSVG className="w-20 h-20 animate-spin" />
            <h1 className="mt-2 text-2xl">Fetching Users</h1>
          </div>
        ) : users && users.length ? (
          // Show Users
          <UserCardList
            users={users}
            className="w-4/5 md:w-1/2 lg:w-1/3 2xl:w-1/4 flex flex-col justify-center"
          />
        ) : (
          <div className="text-center flex flex-col items-center mt-4">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
              stroke-width="1.5"
              stroke="currentColor"
              className="w-40 h-40"
            >
              <path
                stroke-linecap="round"
                stroke-linejoin="round"
                d="M15.182 16.318A4.486 4.486 0 0012.016 15a4.486 4.486 0 00-3.198 1.318M21 12a9 9 0 11-18 0 9 9 0 0118 0zM9.75 9.75c0 .414-.168.75-.375.75S9 10.164 9 9.75 9.168 9 9.375 9s.375.336.375.75zm-.375 0h.008v.015h-.008V9.75zm5.625 0c0 .414-.168.75-.375.75s-.375-.336-.375-.75.168-.75.375-.75.375.336.375.75zm-.375 0h.008v.015h-.008V9.75z"
              />
            </svg>
            <h1 className="mt-2 text-2xl">No Users To Show</h1>
          </div>
        )}
      </div>
    </main>
  );
}
