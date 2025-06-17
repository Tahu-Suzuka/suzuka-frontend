import React from "react";
import { CgProfile } from "react-icons/cg";
import { LuNotebookText } from "react-icons/lu";
import { RiLockPasswordLine } from "react-icons/ri";
import { useNavigate, useLocation } from "react-router-dom";

const Sidebar = () => {
  const navigate = useNavigate();
  const location = useLocation();

  const currentPath = location.pathname;

  return (
    <div className="bg-white rounded-md shadow-md p-6 col-span-1">
      <ul className="space-y-6">
        <li
          onClick={() => navigate("/profil")}
          className={`flex items-center gap-2 font-semibold cursor-pointer transition-colors ${
            currentPath === "/profil"
              ? "text-primary font-bold"
              : "text-gray-700 hover:text-primary"
          }`}
        >
          <CgProfile className="text-xl" />
          Profil Saya
        </li>

        <li
          onClick={() => navigate("/security-check")}
          className={`flex items-center gap-2 font-semibold cursor-pointer transition-colors ${
            [
              "/security-check",
              "/security-password",
              "/change-password",
            ].includes(currentPath)
              ? "text-primary font-bold"
              : "text-gray-700 hover:text-primary"
          }`}
        >
          <RiLockPasswordLine className="text-xl" />
          Ubah Kata Sandi
        </li>

        <li
          onClick={() => navigate("/pesanan")}
          className={`flex items-center gap-2 font-semibold cursor-pointer transition-colors ${
            currentPath === "/pesanan"
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
