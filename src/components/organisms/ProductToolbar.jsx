import React, { useState } from "react";
import ProductInfoText from "../atoms/product/ProductInfoText";
import ProductResponsiveBar from "../atoms/product/ProductResponsiveBar";
import Filter from "../atoms/Filter";

const ProductToolbar = () => {
  const [activeView, setActiveView] = useState(0);
  const [filter, setFilter] = useState("all");

  return (
    <div className="flex flex-col md:flex-row justify-between items-center px-6 lg:px-20 pt-4 gap-4">
      <ProductInfoText current={7} total={10} />
      <ProductResponsiveBar active={activeView} setActive={setActiveView} />
      <Filter filter={filter} setFilter={setFilter} />
    </div>
  );
};

export default ProductToolbar;
