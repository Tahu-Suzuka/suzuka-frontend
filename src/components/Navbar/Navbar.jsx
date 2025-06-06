import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { Menu, X, ShoppingCart } from "lucide-react";
import Button from "../ui/button/Button";

export const NavbarLinks = [
  { name: "Beranda", link: "/" },
  { name: "Tentang Kami", link: "/AboutPage" },
  { name: "Produk", link: "/#Product" },
  { name: "Kontak", link: "/#Contact" },
];

const ResponsiveNavbar = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);

  const toggleMenu = () => {
    setIsOpen(!isOpen);
  };

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 10);
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <nav
      className={`fixed top-0 left-0 w-full z-50 transition-all duration-300 ${
        scrolled
          ? "bg-white bg-opacity-15 backdrop-blur-lg text-black shadow-md"
          : "bg-gradient-to-b from-black/60 via-black/30 to-transparent text-white"
      } px-6 lg:px-20 py-3 flex justify-between items-center`}
    >
      <div className="flex items-center gap-2">
        <Link to="/">
          <img src="/images/logo/logo.png" alt="Logo" className="w-10 h-10" />
        </Link>
      </div>

      <div className="md:hidden" onClick={toggleMenu}>
        {isOpen ? (
          <X className={`w-6 h-6 ${scrolled ? "text-black" : "text-white"}`} />
        ) : (
          <Menu
            className={`w-6 h-6 ${scrolled ? "text-black" : "text-white"}`}
          />
        )}
      </div>

      <ul
        className={`flex-col md:flex md:flex-row md:gap-12 absolute md:static w-full md:w-auto left-0 top-16 md:top-auto transition-all duration-300 ease-in-out ${
          isOpen ? "block" : "hidden md:flex"
        } ${
          isOpen
            ? "bg-white bg-opacity-90 backdrop-blur-md md:bg-transparent"
            : ""
        }`}
      >
        {NavbarLinks.map((link, index) => (
          <li
            key={index}
            className={`p-2 md:p-0 font-montserrat font-semibold hover:text-primary hover:font-bold ${
              scrolled ? "text-black" : "text-white"
            }`}
          >
            <a href={link.link}>{link.name}</a>
          </li>
        ))}
      </ul>

      <div className="flex items-center gap-4">
        <ShoppingCart
          className={`w-6 h-6 cursor-pointer ${
            scrolled ? "text-black" : "text-white"
          }`}
        />
        <Button
          text="Masuk"
          width="w-32"
          py="py-2"
          className={scrolled ? "text-black" : "text-white border-white"}
        />
      </div>
    </nav>
  );
};

export default ResponsiveNavbar;
