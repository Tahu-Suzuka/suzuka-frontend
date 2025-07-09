import React from "react";
import { CgProfile } from "react-icons/cg";
import { LuNotebookText } from "react-icons/lu";
import { RiLockPasswordLine } from "react-icons/ri";
import { useNavigate, useLocation } from "react-router-dom";

const ProfileSidebar = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const currentPath = location.pathname;

  const isActive = (path) =>
    currentPath === path
      ? "text-primary font-bold"
      : "text-gray-700 hover:text-primary";

  return (
    <div className="bg-white rounded-lg shadow-sm p-6 border border-gray-200 w-full h-full lg:h-48">
      <ul className="space-y-5">
        <li
          onClick={() => navigate("/profile")}
          className={`flex items-center gap-2 cursor-pointer transition-colors ${isActive(
            "/profile"
          )}`}
        >
          <CgProfile className="text-xl" />
          Profil Saya
        </li>

        <li
          onClick={() => navigate("/changePassword")}
          className={`flex items-center gap-2 cursor-pointer transition-colors ${isActive(
            "/changePassword"
          )}`}
        >
          <RiLockPasswordLine className="text-xl" />
          Ubah Kata Sandi
        </li>

        <li
          onClick={() => navigate("/order")}
          className={`flex items-center gap-2 cursor-pointer transition-colors ${isActive(
            "/order"
          )}`}
        >
          <LuNotebookText className="text-xl" />
          Pesanan Saya
        </li>
      </ul>
    </div>
  );
};

export default ProfileSidebar;
