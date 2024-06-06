import React, { useState } from "react";
import Pagination from "../../../components/Pagination";
import UserCard from "../../../components/UserCard";
import Maps from "../../../components/Maps";
import { useUserData, useUserUnique } from "../../../redux/useUserData";
import { useDispatch } from "react-redux";
import { UserSummary } from "../../../interfaces/user";
import { setSelectUser } from "../../../redux/userSlice";
import { useDisclosure } from "@chakra-ui/react";
import ComponentButton from "../../../components/ComponentButton";
import CreateUser from "../../Create/User";

const Users: React.FC = () => {
  const dispatch = useDispatch();
  const userData = useUserData();
  const selectedUser = useUserUnique();

  const totalUsers = userData?.length || 0;
  const usersPerPage = 5;
  const totalPages = Math.ceil(totalUsers / usersPerPage);
  const [currentPage, setCurrentPage] = useState(1);

  const startIndex = (currentPage - 1) * usersPerPage;
  const endIndex = Math.min(startIndex + usersPerPage, totalUsers);
  const [selectedUserId, setSelectedUserId] = useState<number | null>(null);
  const { isOpen, onOpen, onClose } = useDisclosure();

  const handlePrevClick = () => {
    setCurrentPage((prevPage) => Math.max(prevPage - 1, 1));
  };

  const handleNextClick = () => {
    setCurrentPage((prevPage) => Math.min(prevPage + 1, totalPages));
  };

  const handleUserSelect = (user: UserSummary | null) => {
    dispatch(setSelectUser(user));
    setSelectedUserId(user ? user.id ?? null : null);
  };

  const handleShowAllUsers = () => {
    handleUserSelect(null);
    setSelectedUserId(null);
  };

  return (
    <>
      <CreateUser open={isOpen} onClose={onClose} />
      <div className="flex h-full">
        <div className="min-w-80 bg-cyan-400 h-full flex flex-col gap-2 px-2 py-2">
          <Pagination
            currentPage={currentPage}
            totalPages={totalPages}
            onPrev={handlePrevClick}
            onNext={handleNextClick}
          />

          {userData?.slice(startIndex, endIndex).map((user) => (
            <UserCard
              key={user.id}
              name={user.name}
              email={user.email}
              phone={user.phone}
              selected={user.id === selectedUserId}
              onClick={() => {
                handleUserSelect(user);
              }}
            />
          ))}

          <ComponentButton title="Ver todos" onClick={handleShowAllUsers} />
          <ComponentButton variant="outline" title="Adicionar novo usuário" onClick={onOpen} />
        </div>
        <div className="flex-grow h-full">
          <Maps
            zoom={selectedUser ? 5 : 3}
            users={selectedUser ? [selectedUser] : userData ? userData : []}
          />
        </div>
      </div>
    </>
  );
};

export default Users;
