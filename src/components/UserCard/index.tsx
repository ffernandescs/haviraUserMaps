import React from "react";

interface UserCardProps {
  name: string;
  email: string;
  phone: string;
  onClick: () => void;
  selected: boolean;
  children?: React.ReactNode;
}

const UserCard: React.FC<UserCardProps> = ({ name, email, phone, onClick, selected, children }) => {
  return (
    <li
      onClick={onClick}
      className={`cursor-pointer hover:bg-cyan-50  flex justify-between items-center p-4 bg-white shadow rounded-lg transition ease-out duration-300 ${
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
          <p className="text-sm text-gray-500">{phone}</p>
        </div>
      </div>
      <div>{children}</div>
    </li>
  );
};

export default UserCard;
