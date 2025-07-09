import React from "react";
import ProductResponsiveBar from "../atoms/ProductResponsiveBar";
import Filter from "../atoms/Filter";
import SearchBar from "../atoms/SearchBar";

const ProductToolbar = ({
  active,
  setActive,
  searchTerm,
  setSearchTerm,
  sortBy,
  setSortBy,
  productCount,
  totalCount,
}) => {
  const sortOptions = [
    { value: "semua", label: "Semua" },
    { value: "termurah", label: "Termurah" },
    { value: "termahal", label: "Termahal" },
  ];

  return (
    <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between gap-4 px-6 lg:px-20 py-4">
      <p className="text-sm text-gray-600">
        Menampilkan {productCount} dari {totalCount} produk
      </p>
      <ProductResponsiveBar active={active} setActive={setActive} />
      <div className="flex gap-4">
        <div className="w-full">
          <SearchBar
            searchTerm={searchTerm}
            setSearchTerm={setSearchTerm}
            placeholder="Cari Produk..."
          />
        </div>
        <Filter value={sortBy} onChange={setSortBy} options={sortOptions} />
      </div>
    </div>
  );
};

export default ProductToolbar;
