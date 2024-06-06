// useUserData.ts
import { useSelector } from "react-redux";
import { RootState } from "./rootReducer";

export const useUserData = () => {
  return useSelector((state: RootState) => state.user.userData);
};

export const useUserUnique = () => {
  return useSelector((state: RootState) => state.user.selectedUser);
};
