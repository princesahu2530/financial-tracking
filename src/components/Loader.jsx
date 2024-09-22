import React from "react";

function Loader() {
  return (
    <div className="bg-white fixed w-screen h-[90vh] flex justify-center items-center">
      <div className="relative w-20 h-20">
        <div className="absolute border-4 border-theme opacity-100 rounded-full animate-ripple"></div>
        <div className="absolute border-4 border-theme opacity-100 rounded-full animate-ripple animation-delay-500"></div>
      </div>
    </div>
  );
}

export default Loader;
