"use client";

import Button from "@/Components/UI/Button";
import LoadingSVG from "@/Components/UI/LoadingSVG";
import { EmptyUser } from "@/Constants/emptyUser";
import { compareObjects } from "@/Helpers/compareObjects";
import userFormSchema from "@/Models/UserFormSchema";
import { setCurrentUser, userState } from "@/features/user/userSlice";
import axiosBackendInstance from "@/utils/axios";
import { zodResolver } from "@hookform/resolvers/zod";
import { AxiosError } from "axios";
import { useRouter } from "next/navigation";
import { FC, useEffect, useReducer } from "react";
import { useForm } from "react-hook-form";
import toast from "react-hot-toast";
import { useDispatch, useSelector } from "react-redux";

interface pageProps {
  params: {
    id: string;
  };
}

interface SelectorProps {
  currentUser: User;
}

interface InitialStateType {
  updateLoading: boolean;
  deleteLoading: boolean;
  getUserLoading: boolean;
}

const initialState: InitialStateType = {
  updateLoading: false,
  deleteLoading: false,
  getUserLoading: false,
};

type Action =
  | { type: "SET_UPDATE_LOADING"; payload: boolean }
  | { type: "SET_DELETE_LOADING"; payload: boolean }
  | { type: "SET_GETUSER_LOADING"; payload: boolean };

// reducer function
const reducer = (state: InitialStateType, action: Action) => {
  switch (action.type) {
    case "SET_GETUSER_LOADING":
      return { ...state, updateLoading: action.payload };
    case "SET_UPDATE_LOADING":
      return { ...state, updateLoading: action.payload };
    case "SET_DELETE_LOADING":
      return { ...state, deleteLoading: action.payload };
    default:
      return state;
  }
};

const Page: FC<pageProps> = ({ params }) => {
  const router = useRouter();
  const dispatch = useDispatch();

  const [state, reducerDispatch] = useReducer(reducer, initialState);

  const { currentUser }: SelectorProps = useSelector(userState);

  const getUserById = async (id: string) => {
    reducerDispatch({ type: "SET_GETUSER_LOADING", payload: true });

    try {
      const response = await axiosBackendInstance.get(`/user/${id}`);

      dispatch(setCurrentUser(response.data.data));

      reset({
        firstName: response.data.data.firstName,
        lastName: response.data.data.lastName,
        age: response.data.data.age,
        phoneNumber: response.data.data.phoneNumber,
      });
    } catch (error) {
      // console.log(error.response?.data.message);
      if (error instanceof AxiosError) {
        toast.error(error.response?.data.message);
      }
      if (error instanceof Error) {
        toast.error(error.message);
      }
    } finally {
      reducerDispatch({ type: "SET_GETUSER_LOADING", payload: false });
    }
  };

  const updateUser = async (data: UserFormData) => {
    reducerDispatch({ type: "SET_UPDATE_LOADING", payload: true });

    // Compare Objects to see if updation API request is necessary or not
    const objectComparison = compareObjects(data, currentUser);
    if (objectComparison) {
      reducerDispatch({ type: "SET_UPDATE_LOADING", payload: false });
      return;
    }

    try {
      const response = await axiosBackendInstance.patch(
        `/user/${currentUser._id}`,
        data
      );

      dispatch(setCurrentUser(response.data.data));

      toast.success(response.data.message);
    } catch (error) {
      if (error instanceof AxiosError) {
        toast.error(error.response?.data.message);
      }
      if (error instanceof Error) {
        toast.error(error.message);
      }
    } finally {
      reducerDispatch({ type: "SET_UPDATE_LOADING", payload: false });
    }
  };

  const deleteUser = async () => {
    reducerDispatch({ type: "SET_DELETE_LOADING", payload: true });

    try {
      const response = await axiosBackendInstance.delete(
        `/user/${currentUser._id}`
      );

      dispatch(setCurrentUser(EmptyUser));

      toast.success(response.data.message);

      router.push("/");
    } catch (error) {
      if (error instanceof AxiosError) {
        toast.error(error.response?.data.message);
      }
      if (error instanceof Error) {
        toast.error(error.message);
      }
    } finally {
      reducerDispatch({ type: "SET_DELETE_LOADING", payload: false });
    }
  };

  // Fetch User On Page Load
  useEffect(() => {
    getUserById(params.id);

    return () => {
      // Set User Back To Empty User On Component Unmount
      dispatch(setCurrentUser(EmptyUser));

      // Set Loading States Back To False
      reducerDispatch({ type: "SET_GETUSER_LOADING", payload: false });
      reducerDispatch({ type: "SET_UPDATE_LOADING", payload: false });
      reducerDispatch({ type: "SET_DELETE_LOADING", payload: false });
    };
  }, [params.id]);

  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm<UserFormData>({
    resolver: zodResolver(userFormSchema),
  });

  return (
    <div className="w-full flex justify-center items-center">
      {state.getUserLoading ? (
        <div className="mt-4 flex flex-col items-center">
          <LoadingSVG className="w-20 h-20 animate-spin" />
          <h1 className="mt-2 text-2xl">Fetching Users</h1>
        </div>
      ) : (
        <form
          className="w-1/4 bg-white dark:bg-neutral-700 rounded mt-8 py-4 px-4 text-xl"
          onSubmit={handleSubmit(updateUser)}
        >
          {/* Input Fields Container */}
          <div className="flex flex-row justify-between mb-2">
            <h5 className="text-neutral-800 dark:text-neutral-50 mb-4 flex flex-row gap-4">
              First Name:
            </h5>
            <div>
              <input
                {...register("firstName")}
                type="text"
                className="p-0.5 bg-white text-black rounded-lg focus:outline-none"
                defaultValue={currentUser.firstName}
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
          <div className="flex flex-row justify-between  mb-2">
            <h5 className="text-neutral-800 dark:text-neutral-50 mb-4 flex flex-row gap-4">
              Last Name:
            </h5>
            <div>
              <input
                {...register("lastName")}
                type="text"
                className="p-0.5 bg-white text-black rounded-lg focus:outline-none"
                defaultValue={currentUser.lastName}
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
          <div className="flex flex-row justify-between  mb-2">
            <h5 className="text-neutral-800 dark:text-neutral-50 mb-4 flex flex-row gap-4">
              Age:
            </h5>
            <div>
              <input
                {...register("age", {
                  valueAsNumber: true,
                })}
                type="number"
                className="p-0.5 bg-white text-black rounded-lg focus:outline-none"
                defaultValue={currentUser.age}
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
          <div className="flex flex-row justify-between  mb-2">
            <h5 className="text-neutral-800 dark:text-neutral-50 mb-4 flex flex-row gap-4">
              Phone Number:
            </h5>
            <div>
              <input
                {...register("phoneNumber")}
                type="text"
                className="p-0.5 bg-white text-black rounded-lg focus:outline-none"
                defaultValue={currentUser.phoneNumber}
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

          <div className="mt-4 flex flex-row gap-2 justify-end">
            <Button
              isLoading={state.updateLoading}
              type="submit"
              className="inline-block rounded bg-blue-500 px-6 pb-2 pt-2.5 text-xs font-medium uppercase leading-normal text-white shadow-[0_4px_9px_-4px_#3b71ca] transition duration-150 ease-in-out hover:bg-primary-600 hover:shadow-[0_8px_9px_-4px_rgba(59,113,202,0.3),0_4px_18px_0_rgba(59,113,202,0.2)] focus:bg-primary-600 focus:shadow-[0_8px_9px_-4px_rgba(59,113,202,0.3),0_4px_18px_0_rgba(59,113,202,0.2)] focus:outline-none focus:ring-0 active:bg-primary-700 active:shadow-[0_8px_9px_-4px_rgba(59,113,202,0.3),0_4px_18px_0_rgba(59,113,202,0.2)] dark:shadow-[0_4px_9px_-4px_rgba(59,113,202,0.5)] dark:hover:shadow-[0_8px_9px_-4px_rgba(59,113,202,0.2),0_4px_18px_0_rgba(59,113,202,0.1)] dark:focus:shadow-[0_8px_9px_-4px_rgba(59,113,202,0.2),0_4px_18px_0_rgba(59,113,202,0.1)] dark:active:shadow-[0_8px_9px_-4px_rgba(59,113,202,0.2),0_4px_18px_0_rgba(59,113,202,0.1)]"
              text="Update"
            />
            <Button
              isLoading={state.deleteLoading}
              type="button"
              className="inline-block rounded bg-red-500 px-6 pb-2 pt-2.5 text-xs font-medium uppercase leading-normal text-white shadow-[0_4px_9px_-4px_#3b71ca] transition duration-150 ease-in-out hover:bg-primary-600 hover:shadow-[0_8px_9px_-4px_rgba(59,113,202,0.3),0_4px_18px_0_rgba(59,113,202,0.2)] focus:bg-primary-600 focus:shadow-[0_8px_9px_-4px_rgba(59,113,202,0.3),0_4px_18px_0_rgba(59,113,202,0.2)] focus:outline-none focus:ring-0 active:bg-primary-700 active:shadow-[0_8px_9px_-4px_rgba(59,113,202,0.3),0_4px_18px_0_rgba(59,113,202,0.2)] dark:shadow-[0_4px_9px_-4px_rgba(59,113,202,0.5)] dark:hover:shadow-[0_8px_9px_-4px_rgba(59,113,202,0.2),0_4px_18px_0_rgba(59,113,202,0.1)] dark:focus:shadow-[0_8px_9px_-4px_rgba(59,113,202,0.2),0_4px_18px_0_rgba(59,113,202,0.1)] dark:active:shadow-[0_8px_9px_-4px_rgba(59,113,202,0.2),0_4px_18px_0_rgba(59,113,202,0.1)]"
              onClick={deleteUser}
              text="Delete"
            />
          </div>
        </form>
      )}
    </div>
  );
};

export default Page;
