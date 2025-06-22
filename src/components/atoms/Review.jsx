import React, { useState } from "react";
import { FaStar } from "react-icons/fa";

const customerReviews = [
  {
    name: "Wildan Fauzan",
    comment:
      "Teksturnya padat tapi tetap empuk saat digoreng, dan warna kuningnya alami banget! Enak banget buat dibacem atau sekadar goreng pakai sambal kecap. Suka banget sama kualitas tahunya.",
    images: ["/images/hero/slider1.png", "/images/hero/slider2.png"],
    rating: 5,
  },
  {
    name: "M Lutfi Amin Ghifarullah",
    comment:
      "Tahu kuningnya mantap! Ukurannya juga pas, saya beli yang ukuran besar buat stok jualan di warung. Fresh banget, kirimannya juga aman.",
    images: ["/images/hero/slider3.png"],
    rating: 5,
  },
];

const Review = () => {
  const [selectedImage, setSelectedImage] = useState({});

  const handleImageClick = (idx, img) => {
    setSelectedImage((prev) => ({
      ...prev,
      [idx]: prev[idx] === img ? null : img,
    }));
  };

  return (
    <div className="max-w-6xl mx-auto bg-white rounded-md p-6  col-span-2">
      <h1 className="text-2xl font-bold mb-6 text-center">Ulasan</h1>

      {/* Sorting rating */}
      <div className="space-y-3 mb-6">
        {[5, 4, 3, 2, 1].map((rating) => {
          const totalReviews = customerReviews.filter(
            (review) => review.rating === rating
          ).length;

          return (
            <div
              key={rating}
              className="flex items-center justify-center gap-4"
            >
              <div className="flex gap-1">
                {[...Array(5)].map((_, i) => (
                  <FaStar
                    key={i}
                    className={`text-lg ${
                      i < rating ? "text-primary" : "text-gray-300"
                    }`}
                  />
                ))}
              </div>
              <div className="flex items-center gap-2">
                <div className="w-32 h-[3px] bg-gray-300 relative rounded-full overflow-hidden">
                  <div
                    className="h-full bg-primary"
                    style={{
                      width: `${
                        (totalReviews / customerReviews.length) * 100
                      }%`,
                    }}
                  ></div>
                </div>
                <span className="text-sm text-gray-700">{totalReviews}</span>
              </div>
            </div>
          );
        })}
      </div>

      {/* Ulasan Pelanggan */}
      <div className="space-y-6">
        {customerReviews.map((review, idx) => (
          <div
            key={idx}
            className="bg-white rounded-md shadow-md p-6 space-y-3"
          >
            <div className="flex items-center gap-4">
              <img
                src="/images/default-profile.png"
                alt="Avatar"
                className="w-14 h-14 rounded-full object-cover"
              />
              <div>
                <h2 className="font-semibold text-gray-800">{review.name}</h2>
                <div className="flex text-red-500">
                  {[...Array(5)].map((_, i) => (
                    <FaStar
                      key={i}
                      className={`${i < review.rating ? "" : "text-gray-300"}`}
                    />
                  ))}
                </div>
              </div>
            </div>

            <p className="text-gray-700 leading-relaxed text-sm">
              {review.comment}
            </p>

            {/* Thumbnails */}
            <div className="flex gap-2">
              {review.images.map((img, i) => (
                <img
                  key={i}
                  src={img}
                  alt="ulasan"
                  onClick={() => handleImageClick(idx, img)}
                  className={`w-20 h-20 object-cover rounded-md cursor-pointer border-2 ${
                    selectedImage[idx] === img
                      ? "border-red-500"
                      : "border-transparent"
                  }`}
                />
              ))}
            </div>

            {/* Gambar Besar */}
            {selectedImage[idx] && (
              <img
                src={selectedImage[idx]}
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
