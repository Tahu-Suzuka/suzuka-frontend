import React, { useState } from "react";
import Tabs from "../atoms/Tabs";
import SearchBar from "../atoms/SearchBar";
import OrderCard from "../atoms/OrderCard";

const OrderContent = () => {
  const [activeTab, setActiveTab] = useState("Semua");

  const sampleOrders = [
    {
      orderId: "202511220005",
      status: "MENUNGGU PEMBAYARAN",
      statusColor: "bg-orange-100 orange-800",
      items: [
        {
          name: "Tahu Putih",
          size: "Besar",
          quantity: 1,
          price: 10000,
          image: "/images/hero/slider2.png",
        },
      ],
      totalAmount: 10000,
      deliveryDate: "26-11-2025",
    },
    {
      orderId: "202511220001",
      status: "DIPROSES",
      statusColor: "bg-yellow-100 text-yellow-800",
      items: [
        {
          name: "Tahu Kuning",
          size: "Sedang",
          quantity: 5,
          price: 12000,
          image: "/images/hero/slider1.png",
        },
      ],
      totalAmount: 60000,
      deliveryDate: "22-11-2025",
    },
    {
      orderId: "202511220002",
      status: "DIKIRIM",
      statusColor: "bg-blue-100 text-blue-800",
      items: [
        {
          name: "Kerupuk Tahu",
          size: "Kecil",
          quantity: 3,
          price: 10000,
          image: "/images/hero/slider2.png",
        },
      ],
      totalAmount: 30000,
      deliveryDate: "23-11-2025",
    },
    {
      orderId: "202511220003",
      status: "SELESAI",
      statusColor: "bg-green-100 text-green-800",
      items: [
        {
          name: "Tahu Hijau",
          size: "Besar",
          quantity: 2,
          price: 15000,
          image: "/images/hero/slider3.png",
        },
      ],
      totalAmount: 30000,
      deliveryDate: "24-11-2025",
    },
    // {
    //   orderId: "202511220004",
    //   status: "DIBATALKAN",
    //   statusColor: "bg-red-100 text-red-800",
    //   items: [
    //     {
    //       name: "Tahu Kuning",
    //       size: "Kecil",
    //       quantity: 4,
    //       price: 12000,
    //       image: "/images/hero/slider1.png",
    //     },
    //   ],
    //   totalAmount: 48000,
    //   deliveryDate: "25-11-2025",
    // },
  ];

  const filteredOrders = sampleOrders.filter((order) => {
    if (activeTab === "Semua") return true;
    return order.status.toLowerCase() === activeTab.toLowerCase();
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
      <div className="bg-white p-4 rounded-lg  shadow-sm border border-gray-200">
        <Tabs activeTab={activeTab} setActiveTab={setActiveTab} />
      </div>
      <div className="space-y-4">
        {filteredOrders.length > 0 ? (
          filteredOrders.map((order) => (
            <OrderCard key={order.orderId} order={order} />
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
