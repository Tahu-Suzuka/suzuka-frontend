import React, { useState } from "react";
import ReviewModal from "../organisms/ReviewModal";

const OrderCard = ({ order }) => {
  const {
    orderId,
    status,
    items,
    totalAmount,
    deliveryDate,
    statusColor = "bg-yellow-100 text-yellow-800",
  } = order;

  const [showModal, setShowModal] = useState(false);

  const statusConfig = {
    "SEDANG DIKEMAS": {
      buttonText: "Batalkan Pesanan",
      buttonClass: "bg-white border border-2 hover:bg-red-600",
      statusMessage: `Pesanan akan dikirim pada tanggal ${deliveryDate}`,
      showButton: true,
    },
    DIKIRIM: {
      buttonText: "Pesanan Selesai",
      buttonClass: "bg-secondary text-white hover:bg-secondary/80",
      statusMessage:
        "Silahkan konfirmasi pesanan setelah menerima dan mengecek pesanan",
      showButton: true,
    },
    SELESAI: {
      buttonText: "Nilai Pesanan",
      buttonClass: "bg-secondary text-white hover:bg-secondary/80",
      statusMessage: "Berikan dukungan pada produk kami",
      showButton: true,
    },
    DIBATALKAN: {
      buttonText: "",
      buttonClass: "",
      statusMessage: "Dibatalkan oleh Anda",
      showButton: false,
    },
  };

  const {
    buttonText = "",
    buttonClass = "",
    statusMessage = "",
    showButton = false,
  } = statusConfig[status] || {};

  return (
    <div className="bg-white rounded-lg p-4 space-y-4 shadow-sm border border-gray-200">
      {/* Header */}
      <div className="flex justify-between items-center">
        <h3 className="font-semibold text-gray-900">Order ID #{orderId}</h3>
        <span
          className={`px-3 py-1 rounded-full text-xs font-medium ${statusColor}`}
        >
          {status}
        </span>
      </div>

      <hr className="border-gray-300" />

      <div className="space-y-3">
        {items.map((item, index) => (
          <div key={index}>
            <div className="flex items-start space-x-3">
              <img
                src={item.image}
                alt={item.name}
                className="w-16 h-16 object-cover rounded-lg"
              />
              <div className="flex-1">
                <h4 className="font-medium text-gray-900">{item.name}</h4>
                <p className="text-sm text-gray-500">Ukuran: {item.size}</p>
                <p className="text-sm text-gray-500">x{item.quantity}</p>
              </div>
              <div className="text-right">
                <p className="font-semibold text-gray-900">
                  Rp{item.price.toLocaleString()}
                </p>
              </div>
            </div>
            {index < items.length - 1 && (
              <hr className="my-2 border-gray-200" />
            )}
          </div>
        ))}
      </div>

      <hr className="border-gray-300" />

      {/* Total */}
      <div className="flex justify-end items-center">
        <div className="text-right">
          <p className="text-sm text-gray-600">Total Pesanan:</p>
          <p className="text-lg font-bold text-gray-900">
            Rp{totalAmount.toLocaleString()}
          </p>
        </div>
      </div>

      {/* Footer - Message & Button */}
      <div className="flex justify-between pt-4 items-center">
        <div className="text-sm text-gray-600">
          <p>{statusMessage}</p>
        </div>

        {showButton && (
          <button
            className={`px-4 py-2 text-sm font-medium rounded-lg transition-colors ${buttonClass}`}
            onClick={() => {
              if (buttonText === "Nilai Pesanan") {
                setShowModal(true);
              } else {
                console.log("Tombol diklik:", buttonText, "untuk ID", orderId);
              }
            }}
          >
            {buttonText}
          </button>
        )}
      </div>

      <ReviewModal
        isOpen={showModal}
        onClose={() => setShowModal(false)}
        item={items[0]}
      />
    </div>
  );
};

export default OrderCard;
