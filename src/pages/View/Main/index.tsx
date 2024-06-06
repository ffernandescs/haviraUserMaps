import React, { useEffect } from "react";
import Logo from "../../../assets/logo.jpeg";
import { useDispatch } from "react-redux";
import { useQuery } from "@tanstack/react-query";
import { IUser } from "../../../interfaces/user";
import { getAllUsers } from "../../../services/users";
import { setUserData } from "../../../redux/userSlice";
import Preload from "../../../components/Preload";

interface MainPros {
  children: JSX.Element;
}

const Main: React.FC<MainPros> = ({ children }) => {
  const dispatch = useDispatch();
  const { data, isLoading, error } = useQuery<IUser[], Error>({
    queryKey: ["getUsers"],
    queryFn: () => getAllUsers(),
  });

  useEffect(() => {
    if (data) {
      dispatch(setUserData(data));
    }
  }, [data, dispatch]);

  if (error) {
    return <div>Error: {error.message}</div>;
  }

  if (isLoading) {
    return (
      <div className="w-full h-screen">
        <Preload />
      </div>
    );
  }

  return (
    <div className="flex flex-col min-h-screen overflow-y-hidden">
      <div className="shadow border-b">
        <div className="flex items-center gap-4 justify-center py-2">
          <img src={Logo} width={40} alt="Havira Logo" />
          <h1 className="text-2xl font-bold">Localização de usuários</h1>
        </div>
      </div>
      <div className="flex-grow h-96">{children}</div>
    </div>
  );
};

export default Main;
