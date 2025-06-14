import React from "react";

const Filter = ({ filter, setFilter }) => {
  return (
    <div className="flex items-center gap-2">
      <span className="text-sm text-gray-700 font-medium">Filter:</span>
      <select
        value={filter}
        onChange={(e) => setFilter(e.target.value)}
        className="border border-gray-300 rounded-md px-3 py-1 text-sm"
      >
        <option value="all">Semua</option>
        <option value="terbaru">Terbaru</option>
        <option value="termurah">Termurah</option>
        <option value="termahal">Termahal</option>
      </select>
    </div>
  );
};

export default Filter;
