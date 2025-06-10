import React from "react";
import Slider from "react-slick";
import { FaStar } from "react-icons/fa";
import Title from "../ui/Text/Title";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";

const reviews = [
  {
    image: "/images/footer/footer.png",
    name: "Andi Setiawan",
    testimonial:
      "Tahu Suzuka rasanya enak dan gurih banget, cocok untuk semua usia! Rasanya selalu konsisten dan teksturnya lembut.",
    rating: 5,
  },
  {
    image: "/images/footer/footer.png",
    name: "Siti Rahma",
    testimonial:
      "Saya selalu pesan tahu dari sini, kualitasnya konsisten dan pengirimannya cepat. Cocok untuk lauk sehari-hari.",
    rating: 4,
  },
  {
    image: "/images/footer/footer.png",
    name: "Budi Santoso",
    testimonial:
      "Pelayanannya cepat, tahu datang masih hangat! Anak-anak saya pun sangat menyukainya.",
    rating: 5,
  },
  {
    image: "/images/footer/footer.png",
    name: "Maria Lestari",
    testimonial:
      "Kualitas tahu yang sangat baik dan rasa autentik. Cocok disantap kapan saja, baik digoreng maupun dikukus.",
    rating: 5,
  },
];

const Review = () => {
  const settings = {
    dots: false,
    infinite: true,
    autoplay: true,
    autoplaySpeed: 2000,
    slidesToShow: 4,
    slidesToScroll: 1,
    responsive: [
      {
        breakpoint: 1280,
        settings: { slidesToShow: 3 },
      },
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

  return (
    <div className="px-16 pb-16">
      <Title subtitle="Ulasan" title="Apa Kata Pelanggan Kami" />
      <div>
        <Slider {...settings}>
          {reviews.map((review, index) => (
            <div key={index} className="px-2 pt-12">
              <div className="relative bg-white border shadow-md rounded-xl p-6 pt-16 text-center min-h-[280px]">
                {/* Gambar */}
                <div className="absolute -top-10 left-1/2 -translate-x-1/2">
                  <img
                    src={review.image}
                    alt={review.name}
                    className="w-24 h-24 rounded-full border-4 border-white object-cover shadow-lg bg-white"
                  />
                </div>
                {/* Isi card */}
                <h3 className="mt-2 text-lg font-semibold">{review.name}</h3>
                <p className="text-sm text-gray-600 mt-2 leading-relaxed">
                  {review.testimonial}
                </p>
                {/* rating */}
                <div className="flex justify-center mt-4 text-yellow-400">
                  {Array(review.rating)
                    .fill()
                    .map((_, i) => (
                      <FaStar key={i} />
                    ))}
                </div>
              </div>
            </div>
          ))}
        </Slider>
      </div>
    </div>
  );
};

export default Review;
