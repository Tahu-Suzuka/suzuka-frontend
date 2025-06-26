import React from "react";
import Hero from "../components/organisms/Hero";
import Category from "../components/organisms/home/Category";
import AboutShort from "../components/organisms/home/AboutShort";
import Review from "../components/organisms/home/Review";

const HomePage = () => {
  return (
    <div className="mb-32">
      <Hero />
      <div className="mt-20"></div>
      <Category />
      <div className="lg:mt-20"></div>
      <AboutShort />
      <div className="mt-14 "></div>
      <Review />
    </div>
  );
};

export default HomePage;
