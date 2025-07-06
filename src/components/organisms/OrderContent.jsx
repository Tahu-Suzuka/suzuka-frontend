import React, { useState, useEffect } from "react";
import Tabs from "../atoms/Tabs";
import OrderCard from "../atoms/OrderCard";
import { OrderService } from "../../services/OrderService";

const OrderContent = () => {
  const [activeTab, setActiveTab] = useState("Semua");
  const [orders, setOrders] = useState([]);
  const [loading, setLoading] = useState(true);

  const fetchOrders = async () => {
    try {
      setLoading(true);
      const response = await OrderService.getByCustomer();
      setOrders(Array.isArray(response.data) ? response.data : []);
    } catch (error) {
      console.error("Gagal mengambil data pesanan:", error.message);
      setOrders([]);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchOrders();
  }, []);

  const filteredOrders = orders.filter((order) => {
    if (activeTab === "Semua") return true;
    return order.status?.toLowerCase() === activeTab.toLowerCase();
  });

  const emptyMessages = {
    MenungguPembayaran: "Belum ada pesanan",
    Diproses: "Belum ada pesanan yang sedang diproses.",
    Dikirim: "Belum ada pesanan yang sedang dikirim.",
    Selesai: "Kamu belum menyelesaikan pesanan apapun.",
    Dibatalkan: "Tidak ada pesanan yang dibatalkan.",
    Semua: "Belum ada pesanan apapun saat ini.",
  };

  return (
    <div className="space-y-4">
      <div className="bg-white p-4 rounded-lg shadow-sm border border-gray-200">
        <Tabs activeTab={activeTab} setActiveTab={setActiveTab} />
      </div>
      <div className="space-y-4">
        {loading ? (
          <p className="text-center text-gray-500">Memuat pesanan...</p>
        ) : filteredOrders.length > 0 ? (
          filteredOrders.map((order) => (
            <OrderCard key={order.id} order={order} refresh={fetchOrders} />
          ))
        ) : (
          <div className="bg-white p-6 rounded-lg shadow-sm text-center text-gray-500 text-sm border border-gray-200 flex flex-col items-center space-y-4">
            <img
              src="/images/no-order.png"
              alt="No Orders"
              className="w-40 h-40 object-contain"
            />
            <p className="text-sm font-normal text-gray-700">
              {emptyMessages[activeTab] || "Tidak Ada Pesanan"}
            </p>
          </div>
        )}
      </div>
    </div>
  );
};

export default OrderContent;
