import React, { useState } from "react";
import Pagination from "../../../components/Pagination";
import UserCard from "../../../components/UserCard";
import Maps from "../../../components/Maps";
import { useUserData, useUserUnique } from "../../../redux/useUserData";
import { useDispatch } from "react-redux";
import { UserSummary } from "../../../interfaces/user";
import { deleteUser, setSelectUser } from "../../../redux/userSlice";
import { Tooltip, useDisclosure } from "@chakra-ui/react";
import ComponentButton from "../../../components/ComponentButton";
import CreateUser from "../../Create/User";
import { ArrowDownIcon, ArrowUpIcon, DeleteIcon, EditIcon } from "@chakra-ui/icons";
import EditUser from "../../Edit/User";
import ComponentDialog from "../../../components/ComponentDialog";
import { useToast } from "../../../toast";

const Users: React.FC = () => {
  const dispatch = useDispatch();
  const { showToastMessage } = useToast();
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
  const { isOpen: isOpenDelete, onOpen: onOpenDelete, onClose: onCloseDelete } = useDisclosure();
  const [user, setUser] = useState<UserSummary | null>(null);
  const [openList, setOpenList] = useState(false);

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

  const handleDeleteUser = () => {
    dispatch(deleteUser(user?.id as number));
    showToastMessage("success", "Operação concluída", "Usuário excluído com sucesso!");
  };

  const filteredUsers = userData?.filter((user) =>
    user.name.toLowerCase().includes(search.toLowerCase())
  );

  return (
    <>
      <CreateUser open={isOpen} onClose={onClose} />
      <EditUser row={user as UserSummary} open={isOpenEdit} onClose={onCloseEdit} />
      <ComponentDialog
        open={isOpenDelete}
        onClose={onCloseDelete}
        onClick={handleDeleteUser}
        title="Apagar usuário"
      />
      <div className="flex relative h-full ">
        <div
          className={`min-w-full md:min-w-80 fixed z-50 md:relative bottom-[0px] left-0 md:h-full bg-gray-600  md:bg-white bg-opacity-20 md:bg-opacity-100 overflow-hidden md:overflow-auto flex flex-col justify-between gap-2 px-2 py-4 ${
            openList ? "h-[4%]" : "h-[40%]"
          } transition-height ease-out duration-300`}
        >
          <div className="text-center visible md:hidden">
            <button
              className="bg-white rounded-full w-12 h-1w-12 "
              onClick={() => setOpenList(!openList)}
            >
              {openList ? <ArrowUpIcon /> : <ArrowDownIcon />}
            </button>
          </div>
          <div className="flex flex-col gap-2 overflow-auto px-2">
            <Pagination
              currentPage={currentPage}
              totalPages={totalPages}
              onPrev={handlePrevClick}
              onNext={handleNextClick}
            />

            <ul className="flex flex-col gap-2">
              {userData?.slice(startIndex, endIndex).map((user) => (
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
                      <div
                        className="flex justify-center items-center m-1 font-medium py-1 px-2   text-gray-700 transition ease-out duration-300 hover:bg-gray-200 hover:text-gray-900"
                        onClick={(e) => {
                          e.stopPropagation();
                          onOpenEdit();
                          setUser(user);
                        }}
                      >
                        <EditIcon color="blue" />
                      </div>
                    </Tooltip>

                    <Tooltip label="Apagar">
                      <div
                        className="flex justify-center items-center m-1 font-medium py-1 px-2   text-gray-700 transition ease-out duration-300 hover:bg-gray-200 hover:text-gray-900"
                        onClick={(e) => {
                          e.stopPropagation();
                          onOpenDelete();
                          setUser(user);
                        }}
                      >
                        <DeleteIcon color="red" />
                      </div>
                    </Tooltip>
                  </div>
                </UserCard>
              ))}
            </ul>

            <ComponentButton title="Ver todos" onClick={handleShowAllUsers} />
            <ComponentButton variant="outline" title="Adicionar novo usuário" onClick={onOpen} />
          </div>
          <div className="flex flex-col gap-2"></div>
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
