import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { Menu, X, ShoppingCart } from "lucide-react";
import { RiArrowDropDownLine, RiArrowDropUpLine } from "react-icons/ri";
import { CgProfile } from "react-icons/cg";
import { LuNotebookText } from "react-icons/lu";
import { TbLogout } from "react-icons/tb";
import Button from "../atoms/Button";
import NavbarLinks from "../atoms/NavbarLink";
import CartSidebar from "../organisms/sidebar/CartSidebar";
import Avatar from "../atoms/Avatar";

const Navbar = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [user, setUser] = useState(null);
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const [isCartOpen, setIsCartOpen] = useState(false);

  const toggleMenu = () => setIsOpen(!isOpen);

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 10);
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  useEffect(() => {
    const storedUser = localStorage.getItem("user");
    if (storedUser) {
      setUser(JSON.parse(storedUser));
      setIsLoggedIn(true);
    } else {
      setUser(null);
      setIsLoggedIn(false);
    }
  }, []);

  const mobileActive = isOpen && window.innerWidth < 768;

  return (
    <>
      <nav
        className={`fixed top-0 left-0 w-full z-50 transition-all duration-300 flex justify-between items-center px-6 lg:px-20 py-3
        ${
          mobileActive
            ? "bg-white text-black"
            : scrolled
            ? "bg-white bg-opacity-15 backdrop-blur-lg text-black shadow-md"
            : "bg-gradient-to-b from-black/60 via-black/30 to-transparent text-white"
        }`}
      >
        {/* Logo */}
        <div className="flex items-center gap-2 z-50 w-32">
          <Link to="/">
            <img src="/images/logo/logo.png" alt="Logo" className="w-10 h-10" />
          </Link>
        </div>

        {/* Avatar & Menu Toggle (Mobile only) */}
        <div className="absolute right-4 top-4 md:hidden flex items-center gap-2 z-50">
          {isLoggedIn && (
            <div className="relative">
              <img
                src={user?.image || "/images/default-profile.png"}
                alt="Avatar"
                className="w-10 h-10 rounded-full border-2 bg-white p-0.5"
                onClick={() => setIsDropdownOpen((prev) => !prev)}
              />
              {isDropdownOpen && (
                <div className="absolute right-0 mt-2 w-52 bg-white text-black rounded shadow-md z-50">
                  <div className="px-4 py-2 border-b border-gray-300">
                    <p className="text-sm font-bold text-center">{user.name}</p>
                  </div>
                  <ul className="py-1">
                    <li>
                      <Link
                        to="/ProfileContent"
                        className="flex items-center gap-2 px-4 py-2 hover:bg-primary hover:bg-opacity-10 cursor-pointer"
                      >
                        <CgProfile className="text-lg" />
                        <span className="text-sm hover:font-bold">
                          Profil Saya
                        </span>
                      </Link>
                    </li>
                    <li>
                      <Link
                        to="/OrderContent"
                        className="flex items-center gap-2 px-4 py-2 hover:bg-primary hover:bg-opacity-10 cursor-pointer"
                      >
                        <LuNotebookText className="text-lg" />
                        <span className="text-sm hover:font-bold">
                          Pesanan Saya
                        </span>
                      </Link>
                    </li>
                    <li
                      className="flex items-center gap-2 px-4 py-2 hover:bg-primary hover:bg-opacity-10 cursor-pointer text-primary hover:font-bold"
                      onClick={() => {
                        localStorage.removeItem("user");
                        window.location.reload();
                      }}
                    >
                      <TbLogout className="text-lg" />
                      <span className="text-sm">Keluar</span>
                    </li>
                  </ul>
                </div>
              )}
            </div>
          )}

          {/* Menu Icon */}
          <div onClick={toggleMenu}>
            {isOpen ? (
              <X className="w-6 h-6 text-black cursor-pointer" />
            ) : (
              <Menu
                className={`w-6 h-6 cursor-pointer ${
                  scrolled ? "text-black" : "text-white"
                }`}
              />
            )}
          </div>
        </div>

        {/* Links + Button */}
        <div className="flex-1 flex justify-center">
          <div
            className={`md:flex md:flex-row md:gap-12 absolute md:static w-full md:w-auto left-0 top-0 md:top-auto transition-all duration-300 ease-in-out ${
              isOpen
                ? "flex flex-col pt-24 bg-white min-h-screen md:bg-transparent"
                : "hidden md:flex"
            }`}
          >
            <ul className="flex flex-col md:flex-row md:gap-12">
              {NavbarLinks.map((link, index) => (
                <li
                  key={index}
                  className={`p-4 md:p-0 font-montserrat font-semibold hover:text-primary hover:font-bold ${
                    mobileActive || scrolled ? "text-black" : "text-white"
                  }`}
                >
                  <a href={link.link}>{link.name}</a>
                </li>
              ))}
            </ul>

            {!isLoggedIn && isOpen && (
              <div className="flex justify-start px-4 pt-4 md:hidden">
                <Button
                  to={"/login"}
                  text="Masuk"
                  width="w-32"
                  className="rounded-full shadow-md py-2"
                />
              </div>
            )}
          </div>
        </div>

        {/* Cart & Avatar */}
        <div className="hidden md:flex items-center gap-4 z-50 w-32 justify-end relative">
          <ShoppingCart
            className={`w-7 h-7 cursor-pointer ${
              scrolled ? "text-black" : "text-white"
            }`}
            onClick={() => setIsCartOpen(true)}
          />
          {!isLoggedIn ? (
            <Button
              to={"/login"}
              text="Masuk"
              width="w-32"
              className={
                scrolled
                  ? "text-black py-2 border-white rounded-full shadow-md"
                  : "py-2 text-white border-white rounded-full shadow-md "
              }
            />
          ) : (
            <div className="relative">
              <div
                onClick={() => setIsDropdownOpen((prev) => !prev)}
                className="flex items-center cursor-pointer"
              >
                <Avatar src={user?.image || "/images/default-profile.png"} />
                {isDropdownOpen ? (
                  <RiArrowDropUpLine className="h-9 w-9" />
                ) : (
                  <RiArrowDropDownLine className="h-9 w-9" />
                )}
              </div>
              {isDropdownOpen && (
                <div className="absolute right-0 mt-2 w-52 bg-white text-black rounded shadow-md z-50">
                  <div className="px-4 py-2 border-b border-gray-300">
                    <p className="text-sm font-bold text-center">
                      {user?.name}
                    </p>
                  </div>
                  <ul className="py-1">
                    <li className="flex items-center gap-2 px-4 py-2 hover:bg-primary hover:bg-opacity-10 cursor-pointer">
                      <CgProfile className="text-lg" />
                      <span className="text-sm hover:font-bold">
                        Profil Saya
                      </span>
                    </li>
                    <li className="flex items-center gap-2 px-4 py-2 hover:bg-primary hover:bg-opacity-10 cursor-pointer">
                      <LuNotebookText className="text-lg" />
                      <span className="text-sm hover:font-bold">
                        Pesanan Saya
                      </span>
                    </li>
                    <li
                      className="flex items-center gap-2 px-4 py-2 hover:bg-primary hover:bg-opacity-10 cursor-pointer text-primary hover:font-bold"
                      onClick={() => {
                        localStorage.removeItem("user");
                        window.location.reload();
                      }}
                    >
                      <TbLogout className="text-lg" />
                      <span className="text-sm">Keluar</span>
                    </li>
                  </ul>
                </div>
              )}
            </div>
          )}
        </div>
      </nav>

      {isCartOpen && <CartSidebar onClose={() => setIsCartOpen(false)} />}
    </>
  );
};

export default Navbar;
