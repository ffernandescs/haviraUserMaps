// userSlice.ts
import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { IUser } from "../interfaces/user";

// Definição do tipo de estado
interface UserSummary {
  id: string;
  name: string;
  email: string;
  city: string;
  lat: number;
  lng: number;
}

interface UserDataProps {
  userData: UserSummary[] | null;
}

const initialState: UserDataProps = {
  userData: null,
};

// Criando o slice do reducer
const userSlice = createSlice({
  name: "user",
  initialState,
  reducers: {
    setUserData: (state, action: PayloadAction<IUser[] | null>) => {
      state.userData = action.payload
        ? action.payload.map((user) => ({
            id: user.id.toString(),
            name: user.name,
            email: user.email,
            city: user.address.city,
            lat: parseFloat(user.address.geo.lat),
            lng: parseFloat(user.address.geo.lng),
          }))
        : null;
    },
  },
});

export const { setUserData } = userSlice.actions;

export default userSlice.reducer;
