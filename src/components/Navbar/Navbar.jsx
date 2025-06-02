import React, { useState } from "react";
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

  const toggleMenu = () => {
    setIsOpen(!isOpen);
  };

  return (
    <nav className="bg-white text-black px-6 lg:px-16 py-3 flex justify-between items-center shadow-md relative">
      <div className="flex items-center gap-2">
        <Link to="/">
          <img src="/images/logo/logo.png" alt="Logo" className="w-10 h-10" />
        </Link>
      </div>

      <div className="md:hidden" onClick={toggleMenu}>
        {isOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
      </div>

      <ul
        className={`flex-col md:flex md:flex-row md:gap-12 absolute md:static bg-white w-full md:w-auto left-0 top-16 md:top-auto transition-all duration-300 ease-in-out ${
          isOpen ? "block" : "hidden md:flex"
        }`}
      >
        {NavbarLinks.map((link, index) => (
          <li
            key={index}
            className="p-2 md:p-0 font-montserrat font-semibold hover:text-primary hover:font-bold"
          >
            <a href={link.link}>{link.name}</a>
          </li>
        ))}
      </ul>

      <div className="flex items-center gap-4">
        <ShoppingCart className="w-6 h-6 cursor-pointer" />
        <Button text="Masuk" width="w-32" py="py-2" />
      </div>
    </nav>
  );
};

export default ResponsiveNavbar;
