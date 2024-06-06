import React from "react";
import Logo from "../../assets/logo.jpeg";

const Preload: React.FC = () => {
  return (
    <div className="bg-indigo-500 w-full h-full flex flex-col gap-2 items-center justify-center">
      <div className="relative">
        <div className="rounded-md overflow-hidden animate-pulse">
          <img src={Logo} width={80} alt="" className="w-20 h-20" />
        </div>

        <div className="h-full bg-neutral-400 rounded absolute top-0 left-0 w-full h-full animate-pulse"></div>
      </div>
      <h2 className="text-white text-3xl font-bold">Havira Location</h2>
    </div>
  );
};

export default Preload;
