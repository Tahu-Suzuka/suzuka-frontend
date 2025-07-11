import React, { useState, useEffect } from "react";
import Tabs from "../atoms/Tabs";
import OrderCard from "../atoms/OrderCard";
import { OrderService } from "../../services/OrderService";
import { LazyLoadImage } from "react-lazy-load-image-component";
import "react-lazy-load-image-component/src/effects/blur.css";

const OrderContent = ({ initialTab }) => {
  const [activeTab, setActiveTab] = useState(initialTab || "Semua");
  const [orders, setOrders] = useState([]);
  const [loading, setLoading] = useState(true);

  const normalize = (str) => str?.toLowerCase().replace(/\s+/g, "") || "";

  useEffect(() => {
    const fetchOrders = async () => {
      setLoading(true);
      try {
        const response = await OrderService.getByCustomer();
        const fetchedOrders = Array.isArray(response.data) ? response.data : [];
        fetchedOrders.sort(
          (a, b) => new Date(b.orderDate) - new Date(a.orderDate)
        );
        setOrders(fetchedOrders);
      } catch (error) {
        console.error("Gagal mengambil data pesanan:", error.message);
        setOrders([]);
      } finally {
        setLoading(false);
      }
    };
    fetchOrders();
  }, []);

  const handleStatusChange = (orderId, newStatus) => {
    setOrders((prevOrders) =>
      prevOrders.map((o) =>
        o.id === orderId ? { ...o, orderStatus: newStatus } : o
      )
    );
  };

  const filteredOrders = orders.filter((order) => {
    if (activeTab === "Semua") return true;
    return normalize(order.orderStatus) === normalize(activeTab);
  });

  const emptyMessages = {
    menunggupembayaran: "Belum ada pesanan menunggu pembayaran.",
    diproses: "Belum ada pesanan yang sedang diproses.",
    dikirim: "Belum ada pesanan yang sedang dikirim.",
    selesai: "Kamu belum menyelesaikan pesanan apapun.",
    dibatalkan: "Tidak ada pesanan yang dibatalkan.",
    semua: "Belum ada pesanan apapun saat ini.",
  };

  return (
    <div className="space-y-4">
      <div className="bg-white p-4 rounded-lg shadow-sm border border-gray-200">
        <Tabs activeTab={activeTab} setActiveTab={setActiveTab} />
      </div>
      <div className="space-y-4">
        {loading ? (
          <p className="text-center text-gray-500 py-10">Memuat pesanan...</p>
        ) : filteredOrders.length > 0 ? (
          filteredOrders.map((order) => (
            <OrderCard
              key={order.id}
              order={order}
              onStatusChange={handleStatusChange}
            />
          ))
        ) : (
          <div className="bg-white p-6 rounded-lg shadow-sm text-center text-gray-500 border border-gray-200 flex flex-col items-center space-y-4">
            <LazyLoadImage
              src="/images/no-order.png"
              alt="No Orders"
              className="w-40 h-40 object-contain"
              effect="blur"
            />
            <p className="text-sm font-normal text-gray-700">
              {emptyMessages[normalize(activeTab)] || "Tidak Ada Pesanan"}
            </p>
          </div>
        )}
      </div>
    </div>
  );
};

export default OrderContent;
