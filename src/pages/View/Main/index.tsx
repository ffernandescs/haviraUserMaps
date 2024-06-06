import React, { useEffect } from "react";
import Logo from "../../../assets/havira_logo.jpeg";
import { useDispatch } from "react-redux";
import { useQuery } from "@tanstack/react-query";
import { IUser } from "../../../interfaces/user";
import { getAllUsers } from "../../../services/users";
import { setUserData } from "../../../redux/userSlice";

interface MainPros {
  children: JSX.Element;
}

const Main: React.FC<MainPros> = ({ children }) => {
  const dispatch = useDispatch();
  const { data, error } = useQuery<IUser[], Error>({
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

  return (
    <div className="flex flex-col min-h-screen">
      <div className="shadow">
        <div className="flex items-center gap-4 justify-center py-4">
          <img src={Logo} width={60} alt="Havira Logo" />
          <h1 className="text-2xl font-extralight">Localização de usuários</h1>
        </div>
      </div>
      <div className="flex-grow h-96">{children}</div>
    </div>
  );
};

export default Main;
