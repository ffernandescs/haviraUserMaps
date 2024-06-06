import React from "react";

interface UserCardProps {
  name: string;
  email: string;
  phone: string;
  onClick: () => void;
  selected: boolean;
}

const UserCard: React.FC<UserCardProps> = ({ name, email, phone, onClick, selected }) => {
  return (
    <li
      className={`flex justify-between items-center p-4 bg-white shadow rounded-lg transition ease-out duration-300 ${
        selected ? "bg-cyan-50" : ""
      }`}
    >
      <div className="flex items-center space-x-4">
        <div>
          <p className="text-lg font-semibold">
            <a href="#">
              <span className="sr-only">{name}</span>
              {name}
            </a>
          </p>
          <p className="text-sm text-gray-500">
            <a href={`mailto:${email}`} className="hover:underline">
              {email}
            </a>
          </p>
          <p className="text-sm text-gray-500">
            <a href={`mailto:${phone}`} className="hover:underline">
              {phone}
            </a>
          </p>
        </div>
      </div>
      <div
        className="flex justify-center items-center m-1 font-medium py-1 px-2 bg-gray-100 rounded-full text-gray-700 border border-gray-300 cursor-pointer transition ease-out duration-300 hover:bg-gray-200 hover:text-gray-900"
        onClick={onClick}
      >
        <div className="text-xs font-normal leading-none max-w-full flex-initial">Visualizar</div>
      </div>
    </li>
  );
};

export default UserCard;
