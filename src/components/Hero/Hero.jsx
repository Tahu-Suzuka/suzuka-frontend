import React, { useEffect, useState } from "react";
import Button from "../ui/button/Button";
import { FaTruck, FaStore, FaCheckCircle } from "react-icons/fa";

const images = [
  "/images/hero/slider1.png",
  "/images/hero/slider2.png",
  "/images/hero/slider3.png",
  "/images/hero/slider4.png",
  "/images/hero/slider5.png",
  "/images/hero/slider6.png",
  "/images/hero/slider7.png",
];

const Hero = () => {
  const [currentIndex, setCurrentIndex] = useState(0);

  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentIndex((prevIndex) => (prevIndex + 1) % images.length);
    }, 5000);
    return () => clearInterval(timer);
  }, []);

  return (
    <div className="relative w-full h-[450px] pb-[80px] overflow-visible">
      {images.map((image, index) => (
        <img
          key={index}
          src={image}
          alt={`slide-${index}`}
          className={`absolute top-0 left-0 w-full h-full object-cover transition-opacity duration-1000 ${
            index === currentIndex ? "opacity-100" : "opacity-0"
          }`}
        />
      ))}

      <div className="absolute inset-0 bg-black bg-opacity-40" />
      <div className="absolute inset-0 flex items-center px-6 md:px-16 font-montserrat z-10">
        <div className="text-white max-w-xl">
          <h1 className="text-5xl font-bold mb-2">Tahu</h1>
          <h2 className="text-2xl md:text-3xl font-semibold mb-4">
            Cibuntu Suzuka
          </h2>
          <p className="text-sm md:text-base leading-relaxed mb-6">
            Nikmati berbagai varian tahu kami yang dibuat dengan bahan yang
            berkualitas dan proses higienis ciri khas Bandung Cibuntu.
          </p>
          <div className="flex flex-col sm:flex-row gap-3">
            <Button text="Pesan Sekarang" />
            <Button text="Tentang Kami" />
          </div>
        </div>
      </div>

      <div className="lg:p-4 p-6 md:p-10">
        <div className="absolute left-0 right-0 bottom-[-40px] w-full max-w-screen-xl mx-auto bg-primary rounded-2xl shadow-lg px-4 sm:px-6 py-4 sm:py-5 z-20">
          <div className="flex flex-col sm:flex-row justify-around items-center text-white gap-6 sm:gap-4 font-semibold text-center sm:text-left">
            <div className="flex flex-col sm:flex-row items-center gap-2 sm:gap-3">
              <div className="bg-white p-3 rounded-full">
                <FaTruck className="text-red-600 text-2xl" />
              </div>
              <span>Siap Diantar</span>
            </div>

            <div className="flex flex-col sm:flex-row items-center gap-2 sm:gap-3">
              <div className="bg-white p-3 rounded-full">
                <FaStore className="text-red-600 text-2xl" />
              </div>
              <span>Khas Cibuntu</span>
            </div>

            <div className="flex flex-col sm:flex-row items-center gap-2 sm:gap-3">
              <div className="bg-white p-3 rounded-full">
                <FaCheckCircle className="text-red-600 text-2xl" />
              </div>
              <span>Tanpa Pengawet</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Hero;
