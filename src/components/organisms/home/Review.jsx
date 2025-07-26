import React, { useEffect, useState } from "react";
import Slider from "react-slick";
import { FaStar } from "react-icons/fa";
import { ReviewService } from "../../../services/ReviewService";
import { API_URL } from "../../../services/API";
import Title from "../../atoms/Title";
import { LazyLoadImage } from "react-lazy-load-image-component";
import "react-lazy-load-image-component/src/effects/blur.css";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";

const Review = () => {
  const [reviews, setReviews] = useState([]);
  const [loading, setLoading] = useState(true);
  const fetchAndShuffleReviews = async () => {
    try {
      const response = await ReviewService.getReviewByProduct(null);
      const allReviews = response.data || [];
      const shuffled = allReviews.sort(() => 0.5 - Math.random());
      setReviews(shuffled);
    } catch (error) {
      console.error("Gagal mengambil ulasan:", error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchAndShuffleReviews();
    const handleVisibilityChange = () => {
      if (document.visibilityState === "visible") {
        fetchAndShuffleReviews();
      }
    };
    document.addEventListener("visibilitychange", handleVisibilityChange);
    return () => {
      document.removeEventListener("visibilitychange", handleVisibilityChange);
    };
  }, []);

  const getFullImageUrl = (path) => {
    if (!path) return "/images/default-profile.png";
    if (path.startsWith("http")) return path;
    return `${API_URL}${path}`;
  };

  const settings = {
    dots: false,
    infinite: reviews.length > 3,
    autoplay: true,
    autoplaySpeed: 3000,
    slidesToShow: 4,
    slidesToScroll: 1,
    responsive: [
      { breakpoint: 1280, settings: { slidesToShow: 3 } },
      { breakpoint: 1024, settings: { slidesToShow: 2 } },
      { breakpoint: 640, settings: { slidesToShow: 1 } },
    ],
  };

  if (loading) {
    return (
      <div className="px-6 lg:px-16 pb-16">
        <Title subtitle="Ulasan" title="Apa Kata Pelanggan Kami" />
        <p className="text-center text-gray-500">Memuat ulasan...</p>
      </div>
    );
  }

  return (
    <div className="px-6 lg:px-20 pb-32">
      <Title subtitle="Ulasan" title="Apa Kata Pelanggan Kami" />
      {reviews.length > 0 ? (
        <Slider {...settings}>
          {reviews.map((review) => (
            <div key={review.id} className="px-2 pt-12">
              <div className="relative bg-white border shadow rounded-xl p-6 pt-16 text-center lg:h-[250px] flex flex-col justify-between">
                <div>
                  <div className="absolute -top-10 left-1/2 -translate-x-1/2">
                    <LazyLoadImage
                      src={getFullImageUrl(review.user?.image)}
                      alt={review.user?.name}
                      className="w-24 h-24 rounded-full border-2 object-cover shadow-lg bg-white"
                      effect="blur"
                    />
                  </div>
                  <h3 className="mt-2 text-lg font-semibold">
                    {review.user?.name}
                  </h3>
                  <p className="text-sm text-gray-600 mt-2 leading-relaxed line-clamp-4">
                    "{review.comment}"
                  </p>
                </div>

                <div className="flex justify-center mt-4 text-secondary">
                  {Array.from({ length: 5 }).map((_, i) => (
                    <FaStar
                      key={i}
                      className={
                        i < review.rating ? "text-secondary" : "text-gray-300"
                      }
                    />
                  ))}
                </div>
              </div>
            </div>
          ))}
        </Slider>
      ) : (
        <p className="text-center text-gray-500">Belum ada ulasan.</p>
      )}
    </div>
  );
};

export default Review;
