import React from "react";

const BarIcon = ({ bars = 3 }) => {
  const barStyles = "w-1 bg-black rounded-sm";
  const heights = {
    2: ["h-5", "h-5"],
    3: ["h-5", "h-5", "h-5"],
  };

  return (
    <div className="flex flex-row gap-1 items-end">
      {heights[bars].map((h, i) => (
        <div key={i} className={`${h} ${barStyles}`} />
      ))}
    </div>
  );
};

const ProductResponsiveBar = ({ active, setActive }) => {
  return (
    <div className="items-center gap-2 hidden lg:flex">
      {[2, 3].map((bars, i) => (
        <button
          key={i}
          onClick={() => setActive(i)}
          className={`p-2 rounded hover:bg-gray-200 ${
            active === i ? "bg-yellow-200 hover:bg-yellow-300" : ""
          }`}
        >
          <BarIcon bars={bars} />
        </button>
      ))}
    </div>
  );
};

export default ProductResponsiveBar;
