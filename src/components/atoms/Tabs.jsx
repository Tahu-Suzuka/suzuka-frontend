import React from "react";

const tabs = ["Semua", "Sedang Dikemas", "Dikirim", "Selesai", "Dibatalkan"];

const Tabs = ({ activeTab, setActiveTab }) => {
  return (
    <div className="overflow-x-auto">
      <div className="flex gap-4 sm:gap-8 md:gap-12 lg:gap-24 px-2 sm:px-4 whitespace-nowrap border-b border-gray-200 text-sm font-medium">
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
    </div>
  );
};

export default Tabs;
