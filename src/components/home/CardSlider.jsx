import React from "react";
import Slider from "react-slick";
import { FaArrowLeft, FaArrowRight } from "react-icons/fa";

const products = [
  {
    id: 1,
    name: "Tahu Kuning",
    image: "/images/hero/slider1.png",
  },
  {
    id: 2,
    name: "Tahu Kuning Stik",
    image: "/images/hero/slider2.png",
  },
  {
    id: 3,
    name: "Tahu Putih",
    image: "/images/hero/slider3.png",
  },
  {
    id: 4,
    name: "Tahu Putih Stik",
    image: "/images/hero/slider4.png",
  },
  {
    id: 5,
    name: "Tahu Hijau",
    image: "/images/hero/slider5.png",
  },
  {
    id: 6,
    name: "Tahu Pedas",
    image: "/images/hero/slider6.png",
  },
];

const PrevArrow = ({ onClick }) => (
  <button
    className="absolute left-0 top-1/2 -translate-y-1/2 z-10 bg-white p-2 rounded-full shadow-md"
    onClick={onClick}
  >
    <FaArrowLeft className="text-primary" />
  </button>
);

const NextArrow = ({ onClick }) => (
  <button
    className="absolute right-0 top-1/2 -translate-y-1/2 z-10 bg-white p-2 rounded-full shadow-md"
    onClick={onClick}
  >
    <FaArrowRight className="text-primary" />
  </button>
);

const CardSlider = () => {
  const settings = {
    dots: false,
    infinite: true,
    speed: 500,
    slidesToShow: 4,
    slidesToScroll: 1,
    prevArrow: <PrevArrow />,
    nextArrow: <NextArrow />,
    responsive: [
      {
        breakpoint: 1024,
        settings: {
          slidesToShow: 3,
        },
      },
      {
        breakpoint: 768,
        settings: {
          slidesToShow: 2,
        },
      },
      {
        breakpoint: 480,
        settings: {
          slidesToShow: 1,
        },
      },
    ],
  };

  return (
    <div className="relative px-4 lg:px-16">
      <Slider {...settings}>
        {products.map((product) => (
          <div key={product.id} className="px-2">
            <div className="bg-white rounded-[20px] shadow-lg overflow-hidden">
              <img
                src={product.image}
                alt={product.name}
                className="w-full h-40 object-cover rounded-t-[20px]"
              />
              <div className="p-4">
                <h3 className="text-center text-black font-bold text-sm lg:text-base">
                  {product.name}
                </h3>
              </div>
            </div>
          </div>
        ))}
      </Slider>
    </div>
  );
};

export default CardSlider;
