import React from "react";
import { FaBell } from "react-icons/fa";

const NotificationDropdown = ({ isOpen, onToggle }) => {
  return (
    <div className="relative">
      <button
        onClick={onToggle}
        className="p-2 bg-gray-100 rounded-full text-gray-600 hover:bg-gray-200 focus:outline-none"
        aria-label="Notification"
      >
        <FaBell className="w-5 h-5" />
      </button>
      {isOpen && (
        <div className="absolute right-0 top-full mt-2 w-56 bg-white rounded-lg shadow-lg z-50 text-sm">
          <div className="p-4 border-b border-gray-200">
            <p className="font-medium text-gray-800">Notifikasi Baru</p>
            <p className="text-gray-500 text-xs">Anda memiliki 3 notifikasi.</p>
          </div>
        </div>
      )}
    </div>
  );
};

export default NotificationDropdown;
