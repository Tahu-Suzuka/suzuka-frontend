import React, { useState } from "react";
import Tabs from "../atoms/Tabs";
import SearchBar from "../atoms/SearchBar";
import OrderCard from "../atoms/OrderCard";

const OrderContent = () => {
  const [activeTab, setActiveTab] = useState("Semua");
  const [searchTerm, setSearchTerm] = useState("");

  const sampleOrders = [
    {
      orderId: "202511220001",
      status: "SEDANG DIKEMAS",
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
    {
      orderId: "202511220004",
      status: "DIBATALKAN",
      statusColor: "bg-red-100 text-red-800",
      items: [
        {
          name: "Tahu Kuning",
          size: "Kecil",
          quantity: 4,
          price: 12000,
          image: "/images/hero/slider1.png",
        },
      ],
      totalAmount: 48000,
      deliveryDate: "25-11-2025",
    },
    {
      orderId: "202511220005",
      status: "SEDANG DIKEMAS",
      statusColor: "bg-yellow-100 text-yellow-800",
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
  ];

  const filteredOrders = sampleOrders.filter((order) => {
    const matchesTab =
      activeTab === "Semua" ||
      order.status.toLowerCase() === activeTab.toLowerCase();

    const matchesSearch =
      order.orderId.toLowerCase().includes(searchTerm.toLowerCase()) ||
      order.items.some((item) =>
        item.name.toLowerCase().includes(searchTerm.toLowerCase())
      );

    return matchesTab && matchesSearch;
  });

  return (
    <div className="space-y-4">
      {/* Tabs */}
      <div className="bg-white p-4 rounded-lg shadow-sm border border-gray-200">
        <Tabs activeTab={activeTab} setActiveTab={setActiveTab} />
      </div>

      {/* Search */}
      <div className="bg-white rounded-lg shadow-sm border border-gray-200">
        <SearchBar searchTerm={searchTerm} setSearchTerm={setSearchTerm} />
      </div>

      {/* Card Pesanan */}
      <div className="space-y-4">
        {filteredOrders.length > 0 ? (
          filteredOrders.map((order) => (
            <OrderCard key={order.orderId} order={order} />
          ))
        ) : (
          <div className="bg-white p-4 rounded-lg shadow-sm text-center text-gray-500 text-sm border border-gray-200">
            Tidak ada pesanan untuk <strong>{activeTab}</strong>
            {searchTerm && (
              <>
                {" "}
                dengan kata kunci "<strong>{searchTerm}</strong>"
              </>
            )}
            .
          </div>
        )}
      </div>
    </div>
  );
};

export default OrderContent;
