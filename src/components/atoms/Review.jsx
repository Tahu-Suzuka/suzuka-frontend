import React, { useState, useEffect } from "react";
import { FaStar } from "react-icons/fa";
import { ReviewService } from "../../services/ReviewService";
import { API_URL } from "../../services/API";

const Review = ({ productId }) => {
  const [reviews, setReviews] = useState([]);
  const [loading, setLoading] = useState(true);
  const [selectedImage, setSelectedImage] = useState({});

  useEffect(() => {
    const fetchReviews = async () => {
      setLoading(true);
      try {
        const response = await ReviewService.getReviewByProduct(productId);
        setReviews(response.data || []);
      } catch (error) {
        console.error("Gagal mengambil data ulasan:", error);
        setReviews([]);
      } finally {
        setLoading(false);
      }
    };

    fetchReviews();
  }, [productId]);

  const handleImageClick = (reviewId, image) => {
    setSelectedImage((prev) => ({
      ...prev,
      [reviewId]: prev[reviewId] === image ? null : image,
    }));
  };

  const getFullImageUrl = (path) => {
    if (!path) return "/images/default-profile.png";
    if (path.startsWith("http")) return path;
    return `${API_URL}${path}`;
  };

  if (loading) {
    return (
      <div className="max-w-6xl mx-auto bg-white rounded-md p-6 col-span-2 text-center">
        <p>Memuat ulasan...</p>
      </div>
    );
  }

  if (reviews.length === 0) {
    return (
      <div className="max-w-6xl mx-auto bg-white rounded-md p-6 col-span-2">
        <h1 className="text-2xl font-bold mb-6 text-center">Ulasan</h1>
        <p className="text-center text-gray-500">
          Belum ada ulasan untuk produk ini.
        </p>
      </div>
    );
  }

  const averageRating =
    reviews.reduce((acc, review) => acc + review.rating, 0) / reviews.length;

  return (
    <div className="max-w-6xl mx-auto bg-white rounded-md p-6 col-span-2">
      <h1 className="text-2xl font-bold mb-2 text-center">Ulasan Pelanggan</h1>
      <div className="flex items-center justify-center gap-2 mb-6">
        <FaStar className="text-primary text-xl" />
        <span className="font-bold text-lg">{averageRating.toFixed(1)}</span>
        <span className="text-gray-500 text-sm">({reviews.length} ulasan)</span>
      </div>

      <div className="space-y-6">
        {reviews.map((review) => (
          <div
            key={review.id}
            className="bg-white rounded-md shadow-md p-6 space-y-3"
          >
            <div className="flex items-center gap-4">
              <img
                src={getFullImageUrl(review.user?.image)}
                alt={review.user?.name || "User"}
                className="w-14 h-14 rounded-full object-cover"
              />
              <div>
                <h2 className="font-semibold text-gray-800">
                  {review.user?.name}
                </h2>
                <div className="flex text-primary">
                  {[...Array(5)].map((_, i) => (
                    <FaStar
                      key={i}
                      className={`${
                        i < review.rating ? "text-primary" : "text-gray-300"
                      }`}
                    />
                  ))}
                </div>
              </div>
            </div>
            <p className="text-gray-700 leading-relaxed text-sm">
              {review.comment}
            </p>
            <div className="flex gap-2">
              {[review.image1, review.image2].filter(Boolean).map((img, i) => (
                <img
                  key={i}
                  src={getFullImageUrl(img)}
                  alt={`Ulasan ${i + 1}`}
                  onClick={() => handleImageClick(review.id, img)}
                  className={`w-20 h-20 object-cover rounded-md cursor-pointer border-2 ${
                    selectedImage[review.id] === img
                      ? "border-primary"
                      : "border-transparent"
                  }`}
                />
              ))}
            </div>
            {selectedImage[review.id] && (
              <img
                src={getFullImageUrl(selectedImage[review.id])}
                alt="Preview"
                className="mt-4 w-full max-w-md rounded-md object-cover"
              />
            )}
          </div>
        ))}
      </div>
    </div>
  );
};

export default Review;
