import React from "react";
import Hero from "../components/Hero/Hero";
import Category from "../components/category/Category";

const HomePage = () => {
  return (
    <div>
      <Hero />
      <div className="mt-20 md:mt-28"></div>
      <Category />
    </div>
  );
};

export default HomePage;
