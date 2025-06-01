import React from "react";
import Hero from "../components/Hero/Hero";
import Category from "../components/home/Category";
import AboutShort from "../components/home/AboutShort";

const HomePage = () => {
  return (
    <div>
      <Hero />
      <div className="mt-20"></div>
      <Category />
      <div className="mt-20"></div>
      <AboutShort />
    </div>
  );
};

export default HomePage;
