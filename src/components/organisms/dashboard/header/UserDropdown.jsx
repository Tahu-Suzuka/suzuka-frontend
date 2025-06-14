import React from "react";
import { FaUserCircle, FaChevronDown } from "react-icons/fa";
import { IoHomeOutline, IoLogOutOutline } from "react-icons/io5";

const UserDropdown = ({ isOpen, onToggle }) => {
  return (
    <div className="relative">
      <button
        onClick={onToggle}
        className="flex items-center space-x-2 p-2 rounded-full text-gray-600 hover:bg-gray-100 focus:outline-none"
      >
        <FaUserCircle className="w-8 h-8" />
        <span className="hidden sm:block text-gray-700 font-medium">
          Nama Lengkap
        </span>
        <FaChevronDown className="w-4 h-4 text-gray-500" />
      </button>

      {isOpen && (
        <div className="absolute right-0 top-full mt-2 w-56 bg-white rounded-lg shadow-lg z-50 text-sm">
          <div className="p-4 border-b border-gray-200">
            <p className="font-medium text-gray-800">Nama Lengkap</p>
            <p className="text-gray-500 text-xs">email@example.com</p>
          </div>
          <div className="p-2 space-y-1 border-b border-gray-200">
            <button className="flex items-center w-full px-3 py-2 text-gray-700 hover:bg-gray-100 rounded">
              <IoHomeOutline className="mr-2" />
              Beranda
            </button>
          </div>
          <div className="p-2">
            <button className="flex items-center w-full px-3 py-2 text-red-600 hover:bg-red-50 rounded">
              <IoLogOutOutline className="mr-2" />
              Keluar
            </button>
          </div>
        </div>
      )}
    </div>
  );
};

export default UserDropdown;
