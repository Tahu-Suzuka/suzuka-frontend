import { useState } from "react";
import Avatar from "../../atoms/Avatar";
import { IoHomeOutline, IoLogOutOutline } from "react-icons/io5";
import { FaChevronDown } from "react-icons/fa";

const Header = () => {
  const [open, setOpen] = useState(false);

  return (
    <header className="h-16 bg-white border-b flex items-center justify-between px-6 shadow z-30 relative">
      <div className="ml-20 text-base font-semibold text-gray-800">
        Hello, Admin!
      </div>

      <div className="relative">
        <button
          onClick={() => setOpen(!open)}
          className="flex items-center gap-2 focus:outline-none"
        >
          <Avatar src="/images/default-profile.png" />
          <FaChevronDown className="text-gray-500 text-sm" />
        </button>

        {open && (
          <div className="absolute right-0 mt-2 w-56 bg-white rounded-md shadow-md text-sm z-50">
            <div className="p-4 border-b">
              <p className="font-medium text-gray-800">Nama Lengkap</p>
            </div>
            <button className="flex items-center w-full px-3 py-2 text-gray-700 hover:bg-gray-100 rounded">
              <IoHomeOutline className="mr-2" /> Beranda
            </button>
            <button className="flex items-center w-full px-3 py-2 text-red-600 hover:bg-red-50 rounded mt-1">
              <IoLogOutOutline className="mr-2" /> Keluar
            </button>
          </div>
        )}
      </div>
    </header>
  );
};

export default Header;
