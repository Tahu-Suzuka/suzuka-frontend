import React from "react";
import Header from "../components/atoms/Header";
import ProductCard from "../components/organisms/ProductCard";
import ProductToolbar from "../components/organisms/ProductToolbar";

const ProductPage = () => {
  return (
    <div>
      <Header imageSrc="/images/product/header.png" title="Produk" />
      <ProductToolbar />
      <div className="p-6 lg:px-20 md:p-12 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-10">
        <ProductCard />
      </div>
    </div>
  );
};

export default ProductPage;
