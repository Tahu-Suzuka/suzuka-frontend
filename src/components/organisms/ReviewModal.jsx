import React, { useState, useEffect } from "react";
import { FaStar, FaRegStar, FaCamera } from "react-icons/fa";
import { ReviewService } from "../../services/ReviewService";
import Alert from "../../components/atoms/Alert";
import { LazyLoadImage } from "react-lazy-load-image-component";
import "react-lazy-load-image-component/src/effects/blur.css";

const ReviewModal = ({ isOpen, onClose, items, onAfterSubmit }) => {
  const [reviews, setReviews] = useState([]);
  const [loading, setLoading] = useState(false);
  const [errorMessage, setErrorMessage] = useState("");
  const [showSuccessAlert, setShowSuccessAlert] = useState(false);

  useEffect(() => {
    if (isOpen && Array.isArray(items)) {
      const initialData = items.map((item) => ({
        productId: item.productId,
        orderId: item.orderId,
        image: item.image,
        name: item.name,
        rating: 0,
        comment: "",
        photo: null,
      }));
      setReviews(initialData);
    }
  }, [isOpen, items]);

  const handleChange = (index, field, value) => {
    setReviews((prev) => {
      const updated = [...prev];
      updated[index][field] = value;
      return updated;
    });
  };

  const handleSubmit = async () => {
    const invalid = reviews.find((r) => !r.rating || !r.comment.trim());
    if (invalid) {
      setErrorMessage("Semua rating dan komentar wajib diisi!");
      return;
    }

    setErrorMessage("");
    setLoading(true);

    try {
      await Promise.all(
        reviews.map((r) =>
          ReviewService.postReview({
            orderId: r.orderId,
            productId: r.productId,
            rating: r.rating,
            comment: r.comment,
            image: r.photo,
          })
        )
      );
      setShowSuccessAlert(true);
    } catch (err) {
      console.error("Gagal kirim review:", err.response?.data || err.message);
      alert("Gagal mengirim ulasan.");
    } finally {
      setLoading(false);
    }
  };

  const handleCloseAlert = () => {
    setShowSuccessAlert(false);
    onAfterSubmit?.();
    onClose();
  };

  if (!isOpen) return null;

  const ratingTexts = ["Sangat Buruk", "Buruk", "Biasa", "Baik", "Sangat Baik"];

  return (
    <div className="fixed -inset-7 z-50 bg-black bg-opacity-60 flex items-center justify-center px-4">
      <div className="bg-white rounded-md w-full max-w-3xl max-h-[90vh] overflow-y-auto shadow-lg">
        <div className="p-6 space-y-6">
          <h2 className="text-xl font-semibold">Nilai Produk</h2>

          {reviews.map((r, index) => (
            <div key={r.productId || index} className="border-t pt-4 space-y-3">
              <div className="flex items-start gap-3">
                <LazyLoadImage
                  src={r.image}
                  alt={r.name}
                  className="w-14 h-14 rounded object-cover flex-shrink-0"
                  effect="blur"
                />
                <h3 className="font-semibold text-sm sm:text-base pt-1">
                  {r.name}
                </h3>
              </div>

              <div className="flex items-center flex-wrap gap-2 sm:gap-3">
                <span className="font-medium text-sm">Kualitas Produk</span>
                {[...Array(5)].map((_, i) => (
                  <button
                    key={i}
                    type="button"
                    onClick={() => handleChange(index, "rating", i + 1)}
                    className="focus:outline-none"
                  >
                    {i < r.rating ? (
                      <FaStar className="text-primary" />
                    ) : (
                      <FaRegStar className="text-red-300" />
                    )}
                  </button>
                ))}
                {r.rating > 0 && (
                  <span className="text-sm text-gray-700 font-medium">
                    {ratingTexts[r.rating - 1]}
                  </span>
                )}
              </div>

              <textarea
                placeholder="Berikan Komentar :"
                className="w-full border border-red-300 rounded-md p-3 text-sm min-h-[100px] focus:outline-none resize-none"
                value={r.comment}
                onChange={(e) => handleChange(index, "comment", e.target.value)}
              />

              <label className="cursor-pointer w-full sm:w-max flex items-center gap-2 border border-red-400 text-primary text-sm px-3 py-2 rounded-md hover:bg-red-50">
                <FaCamera /> Tambahkan Foto
                <input
                  type="file"
                  accept="image/*"
                  onChange={(e) =>
                    handleChange(index, "photo", e.target.files[0])
                  }
                  className="hidden"
                />
              </label>
            </div>
          ))}

          {errorMessage && (
            <p className="text-sm text-primary">{errorMessage}</p>
          )}

          <div className="flex flex-col sm:flex-row justify-end gap-3 pt-4">
            <button
              onClick={onClose}
              className="w-full sm:w-auto border border-red-400 text-primary px-4 py-2 rounded-md hover:bg-red-50"
              disabled={loading}
            >
              Nanti Saja
            </button>
            <button
              className="w-full sm:w-auto bg-primary text-white px-6 py-2 rounded-md hover:bg-primary"
              onClick={handleSubmit}
              disabled={loading}
            >
              {loading ? "Mengirim..." : "Kirim"}
            </button>
          </div>
        </div>
      </div>

      {showSuccessAlert && (
        <Alert
          message="Ulasan berhasil dikirim!"
          confirmText="Tutup"
          onConfirm={handleCloseAlert}
        />
      )}
    </div>
  );
};

export default ReviewModal;
