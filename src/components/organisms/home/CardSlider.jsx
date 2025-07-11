import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import Slider from "react-slick";
import { FaArrowLeft, FaArrowRight } from "react-icons/fa";
import { CategoryService } from "../../../services/CategoryService";
import { API_URL } from "../../../services/API";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";

const PrevArrow = (props) => {
  const { className, style, onClick } = props;
  return (
    <button
      onClick={onClick}
      className={`${className} custom-arrow prev-arrow`}
      style={{ ...style, display: "block", left: "-25px" }}
    >
      <FaArrowLeft className="text-primary text-xl" />
    </button>
  );
};

const NextArrow = (props) => {
  const { className, style, onClick } = props;
  return (
    <button
      onClick={onClick}
      className={`${className} custom-arrow next-arrow`}
      style={{ ...style, display: "block", right: "-25px" }}
    >
      <FaArrowRight className="text-primary text-xl" />
    </button>
  );
};

const CardSlider = () => {
  const [categories, setCategories] = useState([]);
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchCategories = async () => {
      try {
        const res = await CategoryService.getAllCategories();
        setCategories(res.data || []);
      } catch (error) {
        console.error("Gagal mengambil kategori:", error);
      } finally {
        setLoading(false);
      }
    };
    fetchCategories();
  }, []);

  const getFullImageUrl = (path) => {
    if (!path) return "/images/default-category.png";
    if (path.startsWith("http")) return path;
    return `${API_URL}${path}`;
  };

  const handleCategoryClick = (categoryId) => {
    navigate("/product", { state: { categoryId: categoryId } });
  };

  const settings = {
    dots: false,
    infinite: categories.length > 4,
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
        breakpoint: 640,
        settings: {
          slidesToShow: 1,
        },
      },
    ],
  };

  if (loading) {
    return <div className="text-center py-10">Memuat kategori...</div>;
  }

  return (
    <div className="relative px-4 lg:px-16">
      <Slider {...settings}>
        {categories.map((category) => (
          <div
            key={category.id}
            className="px-2"
            onClick={() => handleCategoryClick(category.id)}
          >
            <div className="bg-white rounded-[20px] shadow-lg overflow-hidden cursor-pointer group">
              <img
                src={getFullImageUrl(category.image)}
                alt={category.category_name}
                className="w-full h-40 object-cover rounded-t-[20px] group-hover:scale-110 transition-transform duration-300"
              />
              <div className="p-4">
                <h3 className="text-center text-black font-bold text-sm lg:text-base">
                  {category.category_name}
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
