import { EmptyUser } from "@/Constants/emptyUser";
import { RootState } from "@/app/store";
import { createSlice } from "@reduxjs/toolkit";

export interface UserState {
  users: User[];
  currentUser: User;
}

const initialState: UserState = {
  users: [],
  currentUser: EmptyUser,
};

export const userSlice = createSlice({
  name: "user",
  initialState,
  reducers: {
    setUsers: (state, action) => {
      state.users = action.payload;
    },
    setCurrentUser: (state, action) => {
      state.currentUser = action.payload;
    },
  },
});

// Action creators are generated for each case reducer function
export const { setUsers, setCurrentUser } = userSlice.actions;
export const userState = (state: RootState) => state.user;

export default userSlice.reducer;
