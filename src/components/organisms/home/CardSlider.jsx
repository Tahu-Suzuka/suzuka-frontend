import React, { useEffect, useState } from "react";
import Slider from "react-slick";
import { FaArrowLeft, FaArrowRight } from "react-icons/fa";
import { CategoryService } from "../../../services/CategoryService";

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
  const [categories, setCategories] = useState([]);

  useEffect(() => {
    const fetchCategories = async () => {
      try {
        const res = await CategoryService.getAllCategories();
        setCategories(res.data);
      } catch (error) {
        console.error("Gagal mengambil kategori:", error);
      }
    };
    fetchCategories();
  }, []);

  const settings = {
    dots: false,
    infinite: true,
    speed: 600,
    slidesToShow: 4,
    slidesToScroll: 1,
    // prevArrow: <PrevArrow />,
    // nextArrow: <NextArrow />,
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
        {categories.map((category) => {
          const imageUrl = category.image?.startsWith("http")
            ? category.image
            : `${import.meta.env.VITE_API_URL || "http://34.101.147.220:8080"}${
                category.image
              }`;

          return (
            <div key={category.id} className="px-2">
              <div className="bg-white rounded-[20px] shadow-lg overflow-hidden">
                <img
                  src={imageUrl}
                  alt={category.category_name}
                  className="w-full h-40 object-cover rounded-t-[20px]"
                />
                <div className="p-4">
                  <h3 className="text-center text-black font-bold text-sm lg:text-base">
                    {category.category_name}
                  </h3>
                </div>
              </div>
            </div>
          );
        })}
      </Slider>
    </div>
  );
};

export default CardSlider;
