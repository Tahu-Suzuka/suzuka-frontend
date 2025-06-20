import React, { useState } from "react";
import { FaStar, FaRegStar, FaCamera } from "react-icons/fa";

const ReviewModal = ({ isOpen, onClose, item }) => {
  const [rating, setRating] = useState(0);

  if (!isOpen) return null;

  const ratingTexts = ["Sangat Buruk", "Buruk", "Biasa", "Baik", "Sangat Baik"];

  return (
    <div className="fixed -inset-7 z-50 bg-black bg-opacity-60 flex items-center justify-center">
      <div className="bg-white rounded-xl w-full max-w-xl max-h-[90vh] overflow-y-auto">
        <div className="p-6 space-y-4">
          <h2 className="text-xl font-semibold">Nilai Produk</h2>

          {/* Produk */}
          <div className="flex items-center gap-3">
            <img
              src={item?.image}
              alt={item?.name}
              className="w-16 h-16 rounded object-cover"
            />
            <h3 className="font-semibold">{item?.name}</h3>
          </div>

          {/* Rating */}
          <div className="flex items-center space-x-2">
            <span className="font-medium">Kualitas Produk</span>
            {[...Array(5)].map((_, i) => (
              <button
                key={i}
                type="button"
                onClick={() => setRating(i + 1)}
                className="focus:outline-none"
              >
                {i < rating ? (
                  <FaStar className="text-red-500" />
                ) : (
                  <FaRegStar className="text-red-300" />
                )}
              </button>
            ))}
            {rating > 0 && (
              <span className="text-sm text-gray-700 font-medium">
                {ratingTexts[rating - 1]}
              </span>
            )}
          </div>

          {/* Komentar */}
          <textarea
            placeholder="Berikan Komentar : "
            className="w-full border border-red-300 rounded-md p-3 text-sm min-h-[100px] focus:outline-none resize-none"
          />

          {/* Tambah Foto */}
          <button className="flex items-center gap-2 border border-red-400 text-red-500 text-sm px-3 py-2 rounded-md hover:bg-red-50">
            <FaCamera /> Tambahkan Foto
          </button>

          {/* Aksi */}
          <div className="flex justify-end gap-3 pt-2">
            <button
              onClick={onClose}
              className="border border-red-400 text-red-500 px-4 py-2 rounded-md hover:bg-red-50"
            >
              Nanti Saja
            </button>
            <button className="bg-red-500 text-white px-6 py-2 rounded-md hover:bg-red-600">
              OK
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ReviewModal;
