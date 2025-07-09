import React, { useEffect, useState } from "react";
import { useLocation } from "react-router-dom";
import Alert from "../components/atoms/Alert";
import OrderContent from "../components/organisms/OrderContent";

const OrdersPage = () => {
  const location = useLocation();
  const [showSuccess, setShowSuccess] = useState(false);

  useEffect(() => {
    const urlParams = new URLSearchParams(location.search);
    if (urlParams.get("payment") === "success") {
      setShowSuccess(true);
    }
  }, [location.search]);

  return (
    <div className="max-w-4xl mx-auto px-4 py-6 space-y-4">
      <h1 className="text-xl font-semibold text-gray-800">Pesanan Saya</h1>

      {showSuccess && (
        <Alert
          type="success"
          message="Pembayaran berhasil! Pesanan Anda sedang diproses."
        />
      )}

      <OrderContent />
    </div>
  );
};

export default OrdersPage;
