import React, { useState } from "react";
import Header from "../components/atoms/Header";
import ProductCard from "../components/organisms/ProductCard";
import ProductToolbar from "../components/organisms/ProductToolbar";

const ProductPage = () => {
  const [activeLayout, setActiveLayout] = useState(1);

  const getGridCols = () => {
    switch (activeLayout) {
      case 0:
        return "sm:grid-cols-2";
      case 1:
        return "sm:grid-cols-3";
      case 2:
        return "sm:grid-cols-4";
      default:
        return "sm:grid-cols-3";
    }
  };

  return (
    <div>
      <Header imageSrc="/images/product/header.png" title="Produk" />
      <ProductToolbar active={activeLayout} setActive={setActiveLayout} />
      <div
        className={`p-6 lg:px-20 md:p-12 grid grid-cols-1 ${getGridCols()} gap-10`}
      >
        <ProductCard />
      </div>
    </div>
  );
};

export default ProductPage;
