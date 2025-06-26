import React from "react";
import { CiSearch } from "react-icons/ci";

const SearchBar = ({ searchTerm, setSearchTerm, placeholder }) => {
  return (
    <div className="relative">
      <input
        type="text"
        value={searchTerm}
        onChange={(e) => setSearchTerm(e.target.value)}
        placeholder={placeholder || "Cari..."}
        className="w-full p-4 py-2 pl-10 border border-gray-300 rounded text-sm focus:outline-none focus:ring-1 focus:ring-primary"
      />
      <CiSearch className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-500 text-lg" />
    </div>
  );
};

export default SearchBar;
