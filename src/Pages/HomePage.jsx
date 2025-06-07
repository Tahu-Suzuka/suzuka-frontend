import React from "react";
import Hero from "../components/Hero/Hero";
import Category from "../components/home/Category";
import AboutShort from "../components/home/AboutShort";
import Review from "../components/home/Review";

const HomePage = () => {
  return (
    <div>
      <Hero />
      <div className="mt-20"></div>
      <Category />
      <div className="mt-20"></div>
      <AboutShort />
      <div className="mt-14"></div>
      <Review />
    </div>
  );
};

export default HomePage;
