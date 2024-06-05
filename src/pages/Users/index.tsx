import React from "react";
import Maps from "../../components/Maps";

const Users: React.FC = () => {
  return (
    <div className="flex h-full">
      <div className="min-w-80 bg-cyan-400 h-full">
        <div>Usuarios</div>
      </div>
      <div className="flex-grow h-full">
        <Maps users={[]} />
      </div>
    </div>
  );
};

export default Users;
