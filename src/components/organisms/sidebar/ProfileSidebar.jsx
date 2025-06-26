import React from "react";
import { CgProfile } from "react-icons/cg";
import { LuNotebookText } from "react-icons/lu";
import { RiLockPasswordLine } from "react-icons/ri";
import { useNavigate, useLocation } from "react-router-dom";

const ProfileSidebar = ({ activeMenu, setActiveMenu }) => {
  const navigate = useNavigate();
  const location = useLocation();

  const currentPath = location.pathname;

  return (
    <div className="bg-white rounded-lg shadow-sm p-6 border border-gray-200 w-full h-full lg:h-48">
      <ul className="space-y-5">
        <li
          onClick={() => setActiveMenu("profil")}
          className={`flex items-center gap-2  cursor-pointer transition-colors ${
            activeMenu === "profil"
              ? "text-primary font-bold"
              : "text-gray-700 hover:text-primary"
          }`}
        >
          <CgProfile className="text-xl" />
          Profil Saya
        </li>

        <li
          onClick={() => navigate("/security-check")}
          className={`flex items-center gap-2  cursor-pointer transition-colors ${
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
          onClick={() => setActiveMenu("pesanan")}
          className={`flex items-center gap-2 cursor-pointer transition-colors ${
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

export default ProfileSidebar;
