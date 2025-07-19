import { useState, useEffect } from "react";
import Avatar from "../../atoms/Avatar";
import { IoHomeOutline, IoLogOutOutline } from "react-icons/io5";
import { FaChevronDown } from "react-icons/fa";
import { useNavigate } from "react-router-dom";

const Header = () => {
  const [open, setOpen] = useState(false);
  const [user, setUser] = useState(null);
  const navigate = useNavigate();

  useEffect(() => {
    const userData = localStorage.getItem("user");
    if (userData) {
      try {
        const parsedUser = JSON.parse(userData);
        setUser(parsedUser);
      } catch (err) {
        console.error("Gagal parse data user dari localStorage:", err);
      }
    }
  }, []);

  const handleLogout = () => {
    localStorage.removeItem("token");
    localStorage.removeItem("user");
    navigate("/login");
  };

  return (
    <header className="relative z-30 flex h-16 items-center justify-between border-b bg-white px-6 shadow">
      <div className="ml-20 text-base font-semibold text-gray-800">
        {user ? `Hello, ${user.name}!` : "..."}
      </div>

      <div className="relative">
        <button
          onClick={() => setOpen(!open)}
          className="flex items-center gap-2 focus:outline-none"
        >
          <Avatar src={user?.image || "/images/default-profile.png"} />
          <FaChevronDown className="text-sm text-gray-500" />
        </button>
        {open && user && (
          <div className="absolute right-0 z-50 mt-2 w-56 rounded-md bg-white text-sm shadow-md">
            <div className="border-b p-4">
              <p className="font-medium text-gray-800">{user?.name}</p>
            </div>
            <button
              onClick={() => navigate("/")}
              className="flex w-full items-center rounded px-3 py-2 text-gray-700 hover:bg-gray-100"
            >
              <IoHomeOutline className="mr-2" /> Beranda
            </button>
            <button
              onClick={handleLogout}
              className="mt-1 flex w-full items-center rounded px-3 py-2 text-primary hover:bg-red-50"
            >
              <IoLogOutOutline className="mr-2" /> Keluar
            </button>
          </div>
        )}
      </div>
    </header>
  );
};

export default Header;
