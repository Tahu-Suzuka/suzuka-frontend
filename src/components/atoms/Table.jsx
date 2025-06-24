import React from "react";

const Table = ({ headers = [], children }) => {
  return (
    <div className="overflow-x-auto w-full bg-white rounded-xl">
      <table className="min-w-full text-sm text-left border border-gray-200 ">
        <thead className="bg-white text-gray-700 ">
          <tr>
            {headers.map((header, idx) => (
              <th key={idx} className="py-2 px-4 border-b">
                {header}
              </th>
            ))}
          </tr>
        </thead>
        <tbody>{children}</tbody>
      </table>
    </div>
  );
};

export default Table;
