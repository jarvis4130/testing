// Header.js
import React from "react";
import { useNavigate } from "react-router-dom";

const Header = () => {
  const navigate = useNavigate();
  return (
    <header className="bg-blue-500 text-white py-4 px-20 flex flex-row justify-between">
      <div className="container mx-auto">
        <h1
          className="text-xl font-semibold cursor-pointer"
          onClick={() => {
            navigate("/");
          }}
        >
          Cab Booking App.
        </h1>
      </div>
      <div>
        <div
          className="text-xl font-semibold cursor-pointer"
          onClick={() => navigate("/user-details")}
        >
          User
        </div>
      </div>
    </header>
  );
};

export default Header;
