import React from "react";
import ProductInfoText from "../atoms/product/ProductInfoText";
import ProductResponsiveBar from "../atoms/product/ProductResponsiveBar";
import ProductFilter from "../atoms/Filter";

const ProductToolbar = ({ active, setActive }) => {
  return (
    <div className="flex items-center justify-between px-6 lg:px-20 py-4">
      <ProductInfoText current={1} total={10} />
      <ProductResponsiveBar active={active} setActive={setActive} />
      <ProductFilter />
    </div>
  );
};

export default ProductToolbar;
