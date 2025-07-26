import React, { useEffect } from "react";
import Hero from "../components/organisms/Hero";
import Category from "../components/organisms/home/Category";
import AboutShort from "../components/organisms/home/AboutShort";
import Review from "../components/organisms/home/Review";
import Title from "../components/atoms/Title";
import { LazyLoadImage } from "react-lazy-load-image-component";
import "react-lazy-load-image-component/src/effects/blur.css";
import AOS from "aos";
import "aos/dist/aos.css";

const HomePage = () => {
  useEffect(() => {
    AOS.init({
      duration: 1000,
      once: true,
    });
  }, []);

  return (
    <div className="mb-32">
      <Hero />
      <div className="mt-20" data-aos="fade-up"></div>
      <Category />
      <div className="mt-20 bg-gray-100 p-6 hidden lg:block" data-aos="fade-up">
        <div className="max-w-6xl mx-auto relative">
          <Title
            subtitle="Bahan Yang Kami Gunakan"
            title="Bahan Baku Tahu Kuning"
          />
          <div className="relative flex justify-center items-center min-h-96">
            <div className="absolute -top-28 -left-12" data-aos="fade-right">
              <LazyLoadImage
                src="/images/home/tahu-putih.png"
                alt="Tahu Putih"
                className="w-44 h-40"
                effect="blur"
              />
              <div className="left-52 absolute">
                <div className="bg-[#19B32B] text-white px-16 py-2 rounded-full text-sm font-medium">
                  Air
                </div>
              </div>
            </div>
            <div className="absolute -top-20 -right-10" data-aos="fade-left">
              <LazyLoadImage
                src="/images/home/tahu-kuning.png"
                alt="Tahu Kuning"
                className="w-44 h-40"
                effect="blur"
              />
            </div>
            <div className="top-10 right-40 absolute" data-aos="fade-up">
              <div className="bg-[#18D22E] text-white px-10 py-2 rounded-full text-sm font-medium">
                Kacang Kedelai
              </div>
            </div>
            <div className="relative" data-aos="zoom-in">
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
                  alt="Tahu Kuning"
                  className="w-68 h-60 "
                  effect="blur"
                />
              </div>
              <div className="top-52 -left-56 absolute" data-aos="fade-up">
                <div className="bg-primary text-white px-14 py-2 rounded-full text-sm font-medium">
                  Kunyit
                </div>
              </div>
            </div>
            <div className="top-72 right-40 absolute" data-aos="fade-up">
              <div className="bg-[#FFB900] text-white px-14 py-2 rounded-full text-sm font-medium">
                Garam
              </div>
            </div>
            <div className="absolute -bottom-20 -left-20" data-aos="fade-right">
              <LazyLoadImage
                src="/images/home/tahu-pedas.png"
                alt="Bahan"
                className="w-44 h-40"
                effect="blur"
              />
            </div>
            <div className="absolute -bottom-20 -right-14" data-aos="fade-left">
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

      <div className="lg:mt-20" data-aos="fade-up"></div>
      <AboutShort />

      <div className="px-4 md:px-12 lg:px-20 mt-10 lg:mt-20">
        <div className="relative w-full">
          <img
            src="/images/home/banner-voucher.png"
            alt="Voucher Banner"
            className="w-full h-auto object-cover rounded-2xl"
          />
          <div className="absolute inset-0 flex flex-col justify-center px-4 pl-48 md:pl-48 lg:pl-[420px] xl:pl-[500px]">
            <h1 className="text-sm md:text-2xl lg:text-3xl font-bold mb-2 lg:mb-4 text-white">
              VOUCHER DISKON
            </h1>
            <div className="mb-3 lg:mb-6">
              <p className="text-[9px] md:text-base lg:text-lg leading-relaxed text-white">
                Minimal Pembelian <span className="font-bold">Rp30.000</span>{" "}
                Diskon Hingga{" "}
                <span className="font-bold text-white md:text-lg lg:text-xl">
                  Rp5.000
                </span>
              </p>
            </div>
            <div className="bg-white rounded-md sm:rounded-lg overflow-hidden max-w-full">
              <div className="flex text-xs md:text-base">
                <div className="bg-gray-200 px-4 md:px-4 py-2 md:py-3 text-gray-700 font-medium whitespace-nowrap">
                  <span className="block sm:hidden text-[10px]">Kode</span>
                  <span className="hidden sm:block">Gunakan Kode</span>
                </div>
                <div className="bg-gray-800 flex-1 px-1 md:px-4 py-2 md:py-3 text-white flex items-center justify-center min-w-0">
                  <p className="font-bold text-[10px] md:text-base lg:tracking-wider truncate">
                    GRANDOPENINGSUZUKA
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      <div className="mt-14" data-aos="fade-up"></div>
      <Review />
    </div>
  );
};

export default HomePage;
