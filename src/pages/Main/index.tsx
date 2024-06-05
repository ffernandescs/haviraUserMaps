import React from "react";
import Logo from "../../assets/havira_logo.jpeg";

interface MainPros {
  children: JSX.Element;
}

const Main: React.FC<MainPros> = ({ children }) => {
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
