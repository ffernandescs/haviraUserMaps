import React from "react";

const Users: React.FC = () => {
  return (
    <div className="flex h-full">
      <div className="min-w-80 bg-cyan-400 h-full">
        <div>Usuarios</div>
      </div>
      <div className="flex-grow h-full">Mapas</div>
    </div>
  );
};

export default Users;
