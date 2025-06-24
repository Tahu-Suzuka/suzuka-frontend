import React from "react";
import { FiEdit } from "react-icons/fi";
import { IoEyeSharp } from "react-icons/io5";
import Table from "../../atoms/Table";

const OrderTable = ({ showAction = true, showDate = true }) => {
  const orders = [
    {
      no: "#202501",
      tanggal: "11 Jun 2024",
      pelanggan: "Ahmad",
      total: "Rp120.000",
      status: "Dikirim",
    },
    {
      no: "#202502",
      tanggal: "11 Jun 2024",
      pelanggan: "Siti",
      total: "Rp85.000",
      status: "Selesai",
    },
    {
      no: "#202503",
      tanggal: "11 Jun 2024",
      pelanggan: "Rudi",
      total: "Rp200.000",
      status: "Dibatalkan",
    },
    {
      no: "#202504",
      tanggal: "11 Jun 2024",
      pelanggan: "Nina",
      total: "Rp55.000",
      status: "Diproses",
    },
    {
      no: "#202505",
      tanggal: "11 Jun 2024",
      pelanggan: "Fajar",
      total: "Rp99.000",
      status: "Dikirim",
    },
  ];

  const headers = ["No. Pesanan"];
  if (showDate) headers.push("Tanggal");
  headers.push("Pelanggan", "Total", "Status");
  if (showAction) headers.push("Aksi");

  return (
    <Table headers={headers}>
      {orders.map((order, idx) => (
        <tr key={idx} className="border-t">
          <td className="py-2 px-4">{order.no}</td>
          {showDate && <td className="py-2 px-4">{order.tanggal}</td>}
          <td className="py-2 px-4">{order.pelanggan}</td>
          <td className="py-2 px-4">{order.total}</td>
          <td className="py-2 px-4">
            <span
              className={`px-2 py-1 text-xs font-medium rounded-sm ${
                order.status === "Dikirim"
                  ? "bg-blue-100 text-blue-700"
                  : order.status === "Selesai"
                  ? "bg-green-100 text-green-700"
                  : order.status === "Dibatalkan"
                  ? "bg-red-100 text-red-700"
                  : "bg-yellow-100 text-yellow-700"
              }`}
            >
              {order.status}
            </span>
          </td>
          {showAction && (
            <td className="py-2 px-4 flex gap-3">
              <button className="text-blue-500 hover:text-blue-700">
                <IoEyeSharp className="w-5 h-5" />
              </button>
              <button className="text-green-500 hover:text-green-700">
                <FiEdit className="w-5 h-5" />
              </button>
            </td>
          )}
        </tr>
      ))}
    </Table>
  );
};

export default OrderTable;
