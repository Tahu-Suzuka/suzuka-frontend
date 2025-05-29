import React, { useState } from "react";
import { FaBars } from "react-icons/fa";
import NotificationDropdown from "./NotificationDropdown";
import UserDropdown from "./UserDropdown";

const Header = ({ open, onToggleSidebar }) => {
  const [activeDropdown, setActiveDropdown] = useState(null);

  const toggleDropdown = (type) => {
    setActiveDropdown((prev) => (prev === type ? null : type));
  };

  return (
    <header
      className={`fixed top-0 w-full flex items-center justify-between bg-white shadow px-4 py-2 transition-all duration-300 z-30 ${
        open ? "lg:pl-64" : "lg:pl-16"
      }`}
    >
      {/* Left  */}
      <div className="flex items-center space-x-4 transition-all duration-300 ">
        {/* <button
          onClick={() => {
            console.log("Tombol FaBars diklik");
            onToggleSidebar();
          }}
          className="ml-4 p-2 border border-gray-300 rounded-md text-gray-600 hover:bg-gray-100 focus:outline-none"
        >
          <FaBars className="w-5 h-5" />
        </button> */}

        <span className="text-gray-700 font-semibold text-lg select-none font-montserrat">
          Hello, Admin
        </span>
      </div>

      {/* Right  */}
      <div className="flex items-center space-x-3">
        <NotificationDropdown
          isOpen={activeDropdown === "notification"}
          onToggle={() => toggleDropdown("notification")}
        />
        <UserDropdown
          isOpen={activeDropdown === "user"}
          onToggle={() => toggleDropdown("user")}
        />
      </div>
    </header>
  );
};

export default Header;
