import React from "react";
import useHorizontalScroll from "../../hooks/useHorizontalScroll";

const tabs = [
  "Semua",
  "Menunggu Pembayaran",
  "Diproses",
  "Dikirim",
  "Selesai",
  "Dibatalkan",
];

const Tabs = ({ activeTab, setActiveTab }) => {
  const scrollRef = useHorizontalScroll();

  return (
    <div
      ref={scrollRef}
      className="overflow-x-auto scroll-hide flex gap-6 lg:gap-[60px] px-4 border-b border-gray-200 text-sm cursor-grab select-none whitespace-nowrap"
    >
      {tabs.map((tab) => (
        <button
          key={tab}
          onClick={() => setActiveTab(tab)}
          className={`pb-2 transition-colors ${
            activeTab === tab
              ? "border-b-2 border-red-500 text-red-500 font-semibold"
              : "border-b-2 border-transparent text-gray-600 hover:text-red-500"
          }`}
        >
          {tab}
        </button>
      ))}
    </div>
  );
};

export default Tabs;
