import React from "react";

const Pagination = () => {
  return (
    <div>
      <div className="flex justify-end mt-4 space-x-1">
        <button className="px-3 py-1 border rounded-md text-sm">&lt;</button>
        <button className="px-3 py-1 border rounded-md text-sm bg-primary text-white">
          1
        </button>
        <button className="px-3 py-1 border rounded-md text-sm">2</button>
        <button className="px-3 py-1 border rounded-md text-sm">3</button>
        <button className="px-3 py-1 border rounded-md text-sm">&gt;</button>
      </div>
    </div>
  );
};

export default Pagination;
