import { Api } from "./api";

export const getAllUsers = async () => {
  const response = await Api.get("/users");
  return response.data;
};
