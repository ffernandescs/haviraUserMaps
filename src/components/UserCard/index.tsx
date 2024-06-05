import React from "react";

interface UserCardProps {
  name: string;
  email: string;
  imgSrc: string;
}

const UserCard: React.FC<UserCardProps> = ({ name, email }) => {
  return (
    <li className="flex justify-between items-center p-4 bg-white shadow rounded-lg">
      <div className="flex items-center space-x-4">
        {/* <img className="w-16 h-16 rounded-full" src={imgSrc} alt={name} /> */}
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
        </div>
      </div>
      <div className="flex justify-center items-center m-1 font-medium py-1 px-2 bg-gray-100 rounded-full text-gray-700 border border-gray-300 cursor-pointer transition ease-out duration-300 hover:bg-gray-200 hover:text-gray-900">
        <div className="text-xs font-normal leading-none max-w-full flex-initial">Visualizar</div>
      </div>
    </li>
  );
};

export default UserCard;
