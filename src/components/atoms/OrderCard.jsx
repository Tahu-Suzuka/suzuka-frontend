import React, { useState, useEffect, useCallback } from "react";
import { useNavigate } from "react-router-dom";
import ReviewModal from "../organisms/ReviewModal";
import { OrderService } from "../../services/OrderService";
import { ReviewService } from "../../services/ReviewService";
import Alert from "../atoms/Alert";

const formatRupiah = (value) =>
  new Intl.NumberFormat("id-ID", {
    style: "currency",
    currency: "IDR",
    minimumFractionDigits: 0,
  }).format(value || 0);

const OrderCard = ({ order, onStatusChange }) => {
  const navigate = useNavigate();
  const {
    id: orderId,
    orderStatus: status,
    items,
    totalPayment: totalAmount,
  } = order;

  const [showModal, setShowModal] = useState(false);
  const [isReviewed, setIsReviewed] = useState(false);
  const [isChecking, setIsChecking] = useState(true);
  const [showCancelAlert, setShowCancelAlert] = useState(false);
  const [showDoneAlert, setShowDoneAlert] = useState(false);
  const [showPaymentAlert, setShowPaymentAlert] = useState(false);

  const checkReviewStatus = useCallback(async () => {
    if (status?.toUpperCase() !== "SELESAI") {
      setIsChecking(false);
      return;
    }

    setIsChecking(true);
    try {
      const reviewChecks = items.map((item) => {
        const productId = item.product?.id || item.variation?.product?.id;
        if (!productId) return { hasReviewed: false };
        return ReviewService.checkReviewStatus(orderId, productId);
      });
      const results = await Promise.all(reviewChecks);
      const allReviewed = results.every((res) => res.hasReviewed);
      setIsReviewed(allReviewed);
    } catch (error) {
      console.error("Gagal memeriksa status review:", error);
      setIsReviewed(false);
    } finally {
      setIsChecking(false);
    }
  }, [orderId, status, items]);

  useEffect(() => {
    checkReviewStatus();
  }, [checkReviewStatus]);

  const handleAfterReviewSubmit = () => {
    setShowModal(false);
    setIsReviewed(true);
  };

  const handleCancelOrder = async () => {
    setShowCancelAlert(false);
    try {
      await OrderService.updateUserStatus(orderId, "Dibatalkan");
      onStatusChange?.(orderId, "DIBATALKAN");
    } catch (err) {
      alert("Gagal membatalkan pesanan.");
    }
  };

  const confirmMarkAsDone = async () => {
    setShowDoneAlert(false);
    try {
      await OrderService.updateUserStatus(orderId, "Selesai");
      onStatusChange?.(orderId, "SELESAI");
    } catch (err) {
      alert("Gagal menyelesaikan pesanan.");
    }
  };

  const handlePay = async () => {
    try {
      const paymentResponse = await OrderService.createPayment(orderId);
      const snapToken = paymentResponse.token;

      if (!snapToken) {
        throw new Error("Token pembayaran tidak diterima dari server.");
      }

      window.snap.pay(snapToken, {
        onSuccess: (result) => {
          setShowPaymentAlert(true);
        },
        onPending: (result) => {
          alert("Menunggu pembayaran Anda.");
        },
        onError: (error) => {
          alert("Pembayaran gagal.");
        },
        onClose: () => {
          console.warn("Popup pembayaran ditutup tanpa penyelesaian.");
        },
      });
    } catch (error) {
      alert(error.message || "Terjadi kesalahan saat mencoba membayar.");
    }
  };

  const renderActionSection = () => {
    const upperStatus = status?.toUpperCase();
    const styleBayar =
      "bg-white text-primary border border-primary hover:bg-primary/10 w-full lg:w-40 mt-2 lg:mt-0 rounded-md";
    const styleBatalkan =
      "bg-primary text-white hover:bg-primary/80 w-full lg:w-40 mt-2 lg:mt-0 rounded-md";

    const statusConfig = {
      "MENUNGGU PEMBAYARAN": {
        statusMessage: "Selesaikan pembayaran untuk memproses pesanan.",
        buttons: [
          {
            text: "Batalkan",
            className: styleBatalkan,
            onClick: () => setShowCancelAlert(true),
          },
          { text: "Bayar", className: styleBayar, onClick: handlePay },
        ],
      },
      DIKIRIM: {
        statusMessage:
          "Silahkan konfirmasi pesanan setelah menerima dan mengecek pesanan",
        buttons: [
          {
            text: "Pesanan Selesai",
            className: styleBayar,
            onClick: () => setShowDoneAlert(true),
          },
        ],
      },
      SELESAI: {
        statusMessage: isReviewed
          ? "Terima kasih telah memberi ulasan!"
          : "Berikan dukungan pada produk kami",
        buttons: isChecking
          ? []
          : isReviewed
          ? [
              {
                text: "Beli Lagi",
                className: styleBatalkan,
                onClick: () => {
                  const firstItem = items?.[0];
                  const productId =
                    firstItem?.product?.id || firstItem?.variation?.product?.id;
                  if (productId) navigate(`/produk/${productId}`);
                },
              },
            ]
          : [
              {
                text: "Nilai Pesanan",
                className: styleBayar,
                onClick: () => setShowModal(true),
              },
            ],
      },
      DIPROSES: { statusMessage: "Pesanan sedang diproses.", buttons: [] },
      DIBATALKAN: {
        statusMessage: "Pesanan telah dibatalkan.",
        buttons: [
          {
            text: "Beli Lagi",
            className: styleBatalkan,
            onClick: () => {
              const firstItem = items?.[0];
              const productId =
                firstItem?.product?.id || firstItem?.variation?.product?.id;
              if (productId) navigate(`/produk/${productId}`);
            },
          },
        ],
      },
    };

    const config = statusConfig[upperStatus] || {
      statusMessage: `Status: ${status}`,
      buttons: [],
    };

    return (
      <div className="flex justify-between pt-4 items-center min-h-[40px]">
        <p className="text-sm text-gray-600">
          {isChecking && upperStatus === "SELESAI"
            ? "Memeriksa ulasan..."
            : config.statusMessage}
        </p>
        <div className="flex items-center gap-3">
          {config.buttons.map((btn, index) => (
            <button
              key={index}
              onClick={btn.onClick}
              className={`px-4 py-2 text-sm font-medium transition-colors ${btn.className}`}
            >
              {btn.text}
            </button>
          ))}
        </div>
      </div>
    );
  };

  return (
    <div className="bg-white rounded-lg p-4 space-y-4 shadow-sm border border-gray-200">
      <div className="flex justify-between items-center">
        <h3 className="font-semibold text-gray-900">
          No. Pesanan{" "}
          <span className="font-normal text-gray-600">
            {orderId?.slice(0, 8)}
          </span>
        </h3>
        <span className="px-3 py-1 rounded-full text-xs font-medium bg-yellow-100 text-yellow-800">
          {status}
        </span>
      </div>
      <hr />
      {items?.map((item, index) => {
        const product = item.product || item.variation?.product;
        if (!product) return null;
        return (
          <div
            key={index}
            className="flex items-start space-x-3 border-b pb-3 last:border-b-0"
          >
            <img
              src={product.mainImage}
              alt={product.product_name}
              className="w-16 h-16 object-cover rounded-lg"
            />
            <div className="flex-1">
              <h4 className="font-medium text-gray-900">
                {product.product_name}
              </h4>
              <p className="text-sm text-gray-500">
                Ukuran: {item.variation?.name}
              </p>
              <p className="text-sm text-gray-500">x{item.quantity}</p>
            </div>
            <p className="text-sm font-semibold text-gray-900">
              {formatRupiah(item.price)}
            </p>
          </div>
        );
      })}
      <div className="flex justify-end items-center">
        <p className="text-sm lg:text-base font-bold text-gray-900">
          Total: {formatRupiah(totalAmount)}
        </p>
      </div>

      {renderActionSection()}

      <ReviewModal
        isOpen={showModal}
        onClose={() => setShowModal(false)}
        onAfterSubmit={handleAfterReviewSubmit}
        items={
          items?.map((item) => ({
            orderId,
            productId: item.product?.id || item.variation?.product?.id,
            name: item.product?.product_name || item.variation?.product?.name,
            image:
              item.product?.mainImage || item.variation?.product?.mainImage,
          })) || []
        }
      />
      {showCancelAlert && (
        <Alert
          message="Yakin ingin membatalkan pesanan ini?"
          onCancel={() => setShowCancelAlert(false)}
          onConfirm={handleCancelOrder}
          confirmText="Ya, Batalkan"
        />
      )}
      {showDoneAlert && (
        <Alert
          message="Yakin ingin menyelesaikan pesanan ini?"
          onCancel={() => setShowDoneAlert(false)}
          onConfirm={confirmMarkAsDone}
          confirmText="Ya, Selesai"
        />
      )}
      {showPaymentAlert && (
        <Alert
          message="Berhasil melakukan pembayaran"
          confirmText="Tutup"
          onConfirm={() => {
            setShowPaymentAlert(false);
            onStatusChange?.(orderId, "DIPROSES");
          }}
        />
      )}
    </div>
  );
};

export default OrderCard;
