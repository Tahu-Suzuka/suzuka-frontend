import React from "react";
import Hero from "../components/organisms/Hero";
import Category from "../components/organisms/home/Category";
import AboutShort from "../components/organisms/home/AboutShort";
import Review from "../components/organisms/home/Review";
import Title from "../components/atoms/Title";
import { LazyLoadImage } from "react-lazy-load-image-component";
import "react-lazy-load-image-component/src/effects/blur.css";

const HomePage = () => {
  return (
    <div className="mb-32">
      <Hero />
      <div className="mt-20"></div>
      <Category />

      <div className="mt-20 bg-gray-100 p-6 hidden lg:block">
        <div className="max-w-6xl mx-auto relative">
          <Title
            subtitle="Bahan Yang Kami Gunakan"
            title="Bahan Baku Tahu Kuning"
          />
          <div className="relative flex justify-center items-center min-h-96">
            <div className="absolute -top-28 -left-12">
              <LazyLoadImage
                src="/images/home/tahu-putih.png"
                alt="Air"
                className="w-44 h-40"
                effect="blur"
              />
              <div className="left-52 absolute">
                <div className="bg-[#19B32B] text-white px-16 py-2 rounded-full text-sm font-medium">
                  Air
                </div>
              </div>
            </div>
            <div className="absolute -top-20 -right-10">
              <LazyLoadImage
                src="/images/home/tahu-kuning.png"
                alt="Tahu Kuning"
                className="w-44 h-40"
                effect="blur"
              />
            </div>
            <div className="top-10 right-40 absolute">
              <div className="bg-[#18D22E] text-white px-10 py-2 rounded-full text-sm font-medium">
                Kacang Kedelai
              </div>
            </div>
            <div className="relative">
              <div className="absolute inset-0  w-[720px] h-auto -left-32 -top-20">
                <LazyLoadImage
                  src="/images/home/bg-tahu-1.png"
                  alt="Tahu"
                  className=""
                  effect="blur"
                />
              </div>
              <div className="relative z-10">
                <LazyLoadImage
                  src="images/home/tahu.png"
                  alt="Tahu"
                  className="w-68 h-60 "
                  effect="blur"
                />
              </div>
              <div className="top-52 -left-56 absolute">
                <div className="bg-primary text-white px-14 py-2 rounded-full text-sm font-medium">
                  Kunyit
                </div>
              </div>
            </div>

            <div className="top-72 right-40 absolute">
              <div className="bg-[#FFB900] text-white px-14 py-2 rounded-full text-sm font-medium">
                Garam
              </div>
            </div>

            <div className="absolute -bottom-20 -left-20">
              <LazyLoadImage
                src="/images/home/tahu-pedas.png"
                alt="Bahan"
                className="w-44 h-40"
                effect="blur"
              />
            </div>

            <div className="absolute -bottom-20 -right-14">
              <LazyLoadImage
                src="/images/home/tahu-hijau.png"
                alt="Bahan"
                className="w-44 h-40"
                effect="blur"
              />
            </div>
          </div>
        </div>
      </div>
      <div className="lg:mt-20"></div>
      <AboutShort />
      <div className="mt-14 "></div>
      <Review />
    </div>
  );
};

export default HomePage;
