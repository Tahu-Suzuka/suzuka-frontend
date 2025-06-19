import React from "react";

const tabs = ["Semua", "Sedang Dikemas", "Dikirim", "Selesai", "Dibatalkan"];

const Tabs = ({ activeTab, setActiveTab }) => {
  return (
    <div className="flex flex-wrap gap-24  border-gray-200 text-sm font-medium justify-center ">
      {tabs.map((tab) => (
        <button
          key={tab}
          onClick={() => setActiveTab(tab)}
          className={`pb-2 border-b-2 ${
            activeTab === tab
              ? "border-red-500 text-red-500 font-semibold"
              : "border-transparent text-gray-600 hover:text-red-500"
          }`}
        >
          {tab}
        </button>
      ))}
    </div>
  );
};

export default Tabs;
