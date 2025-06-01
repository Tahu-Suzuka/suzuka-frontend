import React from "react";
import Title from "../ui/Text/Title.jsx";
import CardSlider from "./CardSlider.jsx";
const Category = () => {
  return (
    <div>
      <Title
        subtitle="Produk Kami"
        title="Temukan varian tahu favoritmu di sini!"
      />
      <CardSlider />
    </div>
  );
};

export default Category;
