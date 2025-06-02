import React from "react";
import Slider from "react-slick";
import { FaStar } from "react-icons/fa";
import Title from "../ui/Text/Title";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";

const testimonials = [
  {
    id: 1,
    name: "Budi Santoso",
    avatar: "/images/logo/logo.png",
    rating: 5,
    comment: "Tahu Suzuka rasanya gurih dan sangat fresh. Saya suka sekali!",
  },
  {
    id: 2,
    name: "Sari Dewi",
    avatar: "/images/logo/logo.png",
    rating: 4,
    comment: "Pelayanan cepat dan tahu kuningnya enak banget!",
  },
  {
    id: 3,
    name: "Andi Wijaya",
    avatar: "/images/logo/logo.png",
    rating: 5,
    comment: "Saya pelanggan setia. Tidak pernah kecewa dengan kualitasnya.",
  },
  {
    id: 4,
    name: "Rina Hartati",
    avatar: "/images/logo/logo.png",
    rating: 5,
    comment: "Tahu putihnya lembut dan enak. Harga juga terjangkau!",
  },
];

const settings = {
  dots: true,
  infinite: true,
  speed: 500,
  autoplay: true,
  autoplaySpeed: 3000,
  slidesToShow: 3,
  slidesToScroll: 1,
  responsive: [
    {
      breakpoint: 1024,
      settings: { slidesToShow: 2 },
    },
    {
      breakpoint: 640,
      settings: { slidesToShow: 1 },
    },
  ],
};

const Review = () => {
  return (
    <div className="max-w-6xl mx-auto px-6 py-10">
      <Title subtitle="Ulasan" title="Apa Kata Pelanggan Kami" />
      <Slider {...settings}>
        {testimonials.map((item, index) => {
          const isEven = index % 2 === 0;
          const bgColor = isEven
            ? "bg-secondary text-white"
            : "bg-white text-black";
          const starColor = isEven ? "text-red-500" : "text-yellow-300";

          return (
            <div key={item.id} className="p-4">
              <div
                className={`rounded-xl shadow-lg border border-gray-200 p-6 h-full flex flex-col justify-between ${bgColor}`}
              >
                <div className="flex items-center gap-4 mb-4">
                  <img
                    src={item.avatar}
                    alt={item.name}
                    className="w-12 h-12 rounded-full object-cover border-1"
                  />
                  <div>
                    <h4 className="font-semibold text-lg">{item.name}</h4>
                    <div className={`flex ${starColor}`}>
                      {Array.from({ length: item.rating }).map((_, i) => (
                        <FaStar key={i} />
                      ))}
                    </div>
                  </div>
                </div>
                <p className="text-sm mt-2 leading-relaxed">{`"${item.comment}"`}</p>
              </div>
            </div>
          );
        })}
      </Slider>
    </div>
  );
};

export default Review;
