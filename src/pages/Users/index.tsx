import React from "react";
import Maps from "../../components/Maps";
import UserCard from "../../components/UserCard";
import { useUserData } from "../../redux/useUserData";
import Pagination from "../../components/Pagination";

const Users: React.FC = () => {
  const userData = useUserData();

  console.log(userData, "userData");
  return (
    <div className="flex h-full">
      <div className="min-w-80 bg-cyan-400 h-full flex flex-col gap-2 px-2 py-2">
        <Pagination />
        {userData?.map((user) => (
          <UserCard key={user.id} imgSrc="" name={user.name} email={user.email} />
        ))}{" "}
      </div>
      <div className="flex-grow h-full">
        <Maps users={[]} />
      </div>
    </div>
  );
};

export default Users;
