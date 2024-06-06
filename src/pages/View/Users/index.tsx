import React, { useState } from "react";
import Pagination from "../../../components/Pagination";
import UserCard from "../../../components/UserCard";
import Maps from "../../../components/Maps";
import { useUserData, useUserUnique } from "../../../redux/useUserData";
import { useDispatch } from "react-redux";
import { UserSummary } from "../../../interfaces/user";
import { setSelectUser } from "../../../redux/userSlice";
import { Tooltip, useDisclosure } from "@chakra-ui/react";
import ComponentButton from "../../../components/ComponentButton";
import CreateUser from "../../Create/User";
import { DeleteIcon, EditIcon } from "@chakra-ui/icons";
import EditUser from "../../Edit/User";

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
  const [search, setSearch] = useState("");
  const { isOpen, onOpen, onClose } = useDisclosure();
  const { isOpen: isOpenEdit, onOpen: onOpenEdit, onClose: onCloseEdit } = useDisclosure();
  const [id, setId] = useState<number | null>(null);
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

  const filteredUsers = userData?.filter((user) =>
    user.name.toLowerCase().includes(search.toLowerCase())
  );

  return (
    <>
      <CreateUser open={isOpen} onClose={onClose} />
      <EditUser id={id as number} open={isOpenEdit} onClose={onCloseEdit} />
      <div className="flex h-full">
        <div className="min-w-80 bg-cyan-400 h-full flex flex-col gap-2 px-2 py-2">
          <Pagination
            currentPage={currentPage}
            totalPages={totalPages}
            onPrev={handlePrevClick}
            onNext={handleNextClick}
          />

          {userData?.slice(startIndex, endIndex).map((user) => (
            <ul>
              <UserCard
                key={user.id}
                name={user.name}
                email={user.email}
                phone={user.phone}
                onClick={() => handleUserSelect(user)}
                selected={user.id === selectedUserId}
              >
                <div className="flex items-center">
                  <Tooltip label="Editar">
                    <div className="flex justify-center items-center m-1 font-medium py-1 px-2   text-gray-700 transition ease-out duration-300 hover:bg-gray-200 hover:text-gray-900"
                     onClick={(e) => {
                      e.pro
                      onOpenEdit()
                      setId(user.id)
                    }}>
                      <EditIcon color="blue" />
                    </div>
                  </Tooltip>

                  <Tooltip label="Apagar">
                    <div
                      className="flex justify-center items-center m-1 font-medium py-1 px-2   text-gray-700 transition ease-out duration-300 hover:bg-gray-200 hover:text-gray-900"
                      onClick={() => handleUserSelect(user)}
                    >
                      <DeleteIcon color="red" />
                    </div>
                  </Tooltip>
                </div>
              </UserCard>
            </ul>
          ))}

          <ComponentButton title="Ver todos" onClick={handleShowAllUsers} />
          <ComponentButton variant="outline" title="Adicionar novo usuário" onClick={onOpen} />
        </div>
        <div className="flex-grow h-full">
          <Maps
            setSearchValeu={(e) => setSearch(e)}
            users={selectedUser ? [selectedUser] : userData ? filteredUsers : []}
          />
        </div>
      </div>
    </>
  );
};

export default Users;
