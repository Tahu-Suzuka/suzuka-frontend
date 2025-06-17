import React from "react";
import { CgProfile } from "react-icons/cg";
import { LuNotebookText } from "react-icons/lu";
import { RiLockPasswordLine } from "react-icons/ri";

const Sidebar = ({ activeMenu, setActiveMenu }) => {
  return (
    <div className="bg-white rounded-md shadow-md p-6 col-span-1">
      <ul className="space-y-4">
        <li
          onClick={() => setActiveMenu("profil")}
          className={`flex items-center gap-2 font-semibold cursor-pointer transition-colors ${
            activeMenu === "profil"
              ? "text-primary font-bold"
              : "text-gray-700 hover:text-primary"
          }`}
        >
          <CgProfile className="text-xl" />
          Profil Saya
        </li>
        <li
          onClick={() => setActiveMenu("Ubah Kata Sandi")}
          className={`flex items-center gap-2 font-semibold cursor-pointer transition-colors ${
            activeMenu === "Ubah Kata Sandi"
              ? "text-primary font-bold"
              : "text-gray-700 hover:text-primary"
          }`}
        >
          <RiLockPasswordLine className="text-xl" />
          Ubah Kata Sandi
        </li>
        <li
          onClick={() => setActiveMenu("pesanan")}
          className={`flex items-center gap-2 font-semibold cursor-pointer transition-colors ${
            activeMenu === "pesanan"
              ? "text-primary font-bold"
              : "text-gray-700 hover:text-primary"
          }`}
        >
          <LuNotebookText className="text-xl" />
          Pesanan Saya
        </li>
      </ul>
    </div>
  );
};

export default Sidebar;
