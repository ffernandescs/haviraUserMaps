import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { IUser, UserSummary } from "../interfaces/user";

interface UserDataProps {
  userData: UserSummary[] | null;
  selectedUser: UserSummary | null;
}

const initialState: UserDataProps = {
  userData: null,
  selectedUser: null,
};

const userSlice = createSlice({
  name: "user",
  initialState,
  reducers: {
    setUserData: (state, action: PayloadAction<IUser[] | null>) => {
      state.userData = action.payload
        ? action.payload.map((user) => ({
            id: user.id,
            name: user.name,
            email: user.email,
            phone: user.phone,
            city: user.address.city,
            lat: parseFloat(user.address.geo.lat),
            lng: parseFloat(user.address.geo.lng),
          }))
        : null;
    },
    setSelectUser: (state, action: PayloadAction<UserSummary | null>) => {
      state.selectedUser = action.payload;
    },
    createUser: (state, action: PayloadAction<UserSummary>) => {
      const nextId = state.userData
        ? Math.max(...state.userData.map((user) => user.id || 0)) + 1
        : 1;
      const newUser = {
        ...action.payload,
        id: nextId,
      };
      if (state.userData) {
        state.userData.unshift(newUser);
      } else {
        state.userData = [newUser];
      }
    },

    deleteUser: (state, action: PayloadAction<number>) => {
      if (state.userData) {
        state.userData = state.userData.filter((user) => user.id !== action.payload);
      }
      if (state.selectedUser?.id === action.payload) {
        state.selectedUser = null;
      }
    },
  },
});

export const { setUserData, setSelectUser, createUser, deleteUser } = userSlice.actions;

export default userSlice.reducer;
