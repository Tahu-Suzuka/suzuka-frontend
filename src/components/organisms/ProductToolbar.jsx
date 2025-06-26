import React, { useState } from "react";
import ProductResponsiveBar from "../atoms/ProductResponsiveBar";
import Filter from "../atoms/Filter";

const ProductToolbar = ({ active, setActive }) => {
  const [sortBy, setSortBy] = useState("");

  const sortOptions = [
    { value: "termurah", label: "Termurah" },
    { value: "termahal", label: "Termahal" },
  ];
  return (
    <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between gap-4 px-6 lg:px-20 py-4">
      {/* ProductInfoText */}
      <p className="text-sm text-gray-600">
        Menampilkan {1} dari {10} produk
      </p>

      {/* ProductResponsiveBar */}
      <ProductResponsiveBar active={active} setActive={setActive} />

      {/* ProductFilter */}
      <Filter value={sortBy} onChange={setSortBy} options={sortOptions} />
    </div>
  );
};

export default ProductToolbar;
