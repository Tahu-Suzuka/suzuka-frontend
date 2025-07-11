import React, { useState, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import { Menu, X, ShoppingCart } from "lucide-react";
import { RiArrowDropDownLine, RiArrowDropUpLine } from "react-icons/ri";
import { CgProfile } from "react-icons/cg";
import { LuNotebookText } from "react-icons/lu";
import { TbLogout } from "react-icons/tb";
import CartSidebar from "../organisms/sidebar/CartSidebar";
import Avatar from "../atoms/Avatar";
import { LazyLoadImage } from "react-lazy-load-image-component";
import "react-lazy-load-image-component/src/effects/blur.css";

const NavbarLinks = [
  { name: "Beranda", link: "/" },
  { name: "Tentang Kami", link: "/about" },
  { name: "Produk", link: "/product" },
  { name: "Kontak", link: "/contact" },
];

const Navbar = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [user, setUser] = useState(null);
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const [isCartOpen, setIsCartOpen] = useState(false);

  const navigate = useNavigate();

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 10);
    window.addEventListener("scroll", handleScroll);

    const token = localStorage.getItem("token");
    if (token) {
      const storedUser = localStorage.getItem("user");
      setUser(storedUser ? JSON.parse(storedUser) : null);
      setIsLoggedIn(true);
    }

    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const handleLogout = () => {
    localStorage.removeItem("token");
    localStorage.removeItem("user");
    setIsLoggedIn(false);
    setUser(null);
    setIsDropdownOpen(false);
    navigate("/");
  };

  const mobileActive =
    isOpen && typeof window !== "undefined" && window.innerWidth < 768;

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
        <div className="flex items-center gap-2 z-50">
          <Link to="/">
            <LazyLoadImage
              src="/images/logo/logo.png"
              alt="Logo"
              className="w-10 h-10 "
              effect="blur"
            />
          </Link>
        </div>

        <div className="hidden md:flex flex-1 justify-center">
          <ul className="flex flex-row gap-12">
            {NavbarLinks.map((link) => (
              <li
                key={link.name}
                className={`font-semibold hover:text-primary transition-colors ${
                  scrolled ? "text-black" : "text-white"
                }`}
              >
                <Link to={link.link}>{link.name}</Link>
              </li>
            ))}
          </ul>
        </div>

        <div className="flex items-center gap-4 z-50">
          {isLoggedIn && (
            <div
              className="relative cursor-pointer"
              onClick={() => setIsCartOpen(true)}
            >
              <ShoppingCart
                className={`w-7 h-7 ${
                  scrolled || mobileActive ? "text-black" : "text-white"
                }`}
              />
            </div>
          )}

          <div className="hidden md:block">
            {!isLoggedIn ? (
              <Link
                to="/login"
                className={`px-6 py-2 text-sm font-semibold rounded-md transition-colors ${
                  scrolled
                    ? "bg-primary text-white"
                    : "border border-white text-white hover:bg-white hover:text-primary"
                }`}
              >
                Masuk
              </Link>
            ) : (
              <div className="relative">
                <div
                  onClick={() => setIsDropdownOpen((prev) => !prev)}
                  className="flex items-center cursor-pointer"
                >
                  <Avatar src={user?.image || "/images/default-profile.png"} />
                  {isDropdownOpen ? (
                    <RiArrowDropUpLine
                      className={`h-9 w-9 ${
                        scrolled ? "text-black" : "text-white"
                      }`}
                    />
                  ) : (
                    <RiArrowDropDownLine
                      className={`h-9 w-9 ${
                        scrolled ? "text-black" : "text-white"
                      }`}
                    />
                  )}
                </div>
                {isDropdownOpen && (
                  <div className="absolute right-0 mt-4 w-52 bg-white text-black rounded shadow-lg z-50 border">
                    <div className="px-4 py-3 border-b">
                      <p className="text-sm font-bold truncate">{user?.name}</p>
                    </div>
                    <ul className="py-1">
                      <li>
                        <Link
                          to="/profile"
                          onClick={() => setIsDropdownOpen(false)}
                          className="flex items-center gap-3 px-4 py-2 hover:bg-gray-100"
                        >
                          <CgProfile className="text-lg" />
                          <span className="text-sm">Profil Saya</span>
                        </Link>
                      </li>
                      <li>
                        <Link
                          to="/profile"
                          onClick={() => {
                            setIsDropdownOpen(false);
                            navigate("/profile", {
                              state: { initialMenu: "pesanan" },
                            });
                          }}
                          className="flex items-center gap-3 px-4 py-2 hover:bg-gray-100"
                        >
                          <LuNotebookText className="text-lg" />
                          <span className="text-sm">Pesanan Saya</span>
                        </Link>
                      </li>
                      <li
                        onClick={handleLogout}
                        className="flex items-center gap-3 px-4 py-2 hover:bg-gray-100 cursor-pointer text-primary"
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

          <div className="md:hidden" onClick={() => setIsOpen(!isOpen)}>
            {isOpen ? (
              <X className="text-black" />
            ) : (
              <Menu
                className={`${
                  scrolled || mobileActive ? "text-black" : "text-white"
                }`}
              />
            )}
          </div>
        </div>

        {isOpen && (
          <div className="absolute top-0 left-0 w-full bg-white min-h-screen pt-24 px-6 flex flex-col md:hidden">
            <ul className="flex flex-col gap-6">
              {NavbarLinks.map((link) => (
                <li
                  key={link.name}
                  className="text-black font-semibold text-lg"
                  onClick={() => setIsOpen(false)}
                >
                  <Link to={link.link}>{link.name}</Link>
                </li>
              ))}
            </ul>
            <div className="mt-8 border-t pt-6">
              {!isLoggedIn ? (
                <Link
                  to="/login"
                  onClick={() => setIsOpen(false)}
                  className="w-full text-center block bg-primary text-white py-3 rounded-md font-semibold"
                >
                  Masuk
                </Link>
              ) : (
                <div className="space-y-4">
                  <Link
                    to="/profile"
                    onClick={() => setIsOpen(false)}
                    className="flex items-center gap-3 text-black font-semibold"
                  >
                    <CgProfile className="text-xl" /> Profil Saya
                  </Link>
                  <Link
                    to="/profile"
                    onClick={() => {
                      setIsOpen(false);
                      navigate("/profile", {
                        state: { initialMenu: "pesanan" },
                      });
                    }}
                    className="flex items-center gap-3 text-black font-semibold"
                  >
                    <LuNotebookText className="text-xl" /> Pesanan Saya
                  </Link>
                  <div
                    onClick={handleLogout}
                    className="flex items-center gap-3 text-primary font-semibold cursor-pointer"
                  >
                    <TbLogout className="text-xl" /> Keluar
                  </div>
                </div>
              )}
            </div>
          </div>
        )}
      </nav>

      {isCartOpen && <CartSidebar onClose={() => setIsCartOpen(false)} />}
    </>
  );
};

export default Navbar;
