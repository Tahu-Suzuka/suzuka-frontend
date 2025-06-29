import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { IoEyeSharp } from "react-icons/io5";
import Table from "../../atoms/Table";

const OrderTable = ({ showAction = true, showPayment = true }) => {
  const navigate = useNavigate();
  const [orders, setOrders] = useState([
    {
      no: "202501",
      pelanggan: "Ahmad",
      total: "Rp120.000",
      Pembayaran: "QRIS",
      status: "Dikirim",
    },
    {
      no: "202502",
      pelanggan: "Ahmad",
      total: "Rp120.000",
      Pembayaran: "Cash",
      status: "Diproses",
    },
    {
      no: "202503",
      pelanggan: "Ahmad",
      total: "Rp120.000",
      Pembayaran: "Bank Transfer",
      status: "Selesai",
    },
    {
      no: "202504",
      pelanggan: "Ahmad",
      total: "Rp120.000",
      Pembayaran: "E-Wallet",
      status: "Dibatalkan",
    },
    {
      no: "202505",
      pelanggan: "Ahmad",
      total: "Rp120.000",
      Pembayaran: "E-Wallet",
      status: "Menunggu Pembayaran",
    },
  ]);

  const statusOptions = [
    "Diproses",
    "Dikirim",
    "Selesai",
    "Dibatalkan",
    "Menunggu Pembayaran",
  ];

  const handleStatusChange = (index, newStatus) => {
    const updatedOrders = [...orders];
    updatedOrders[index].status = newStatus;
    setOrders(updatedOrders);
    // Di sini kamu bisa tambahkan API call untuk simpan ke backend
  };

  const headers = ["No. Pesanan", "Pelanggan", "Total"];
  if (showPayment) headers.push("Pembayaran");
  headers.push("Status");
  if (showAction) headers.push("Aksi");

  return (
    <Table headers={headers}>
      {orders.map((order, idx) => (
        <tr key={idx} className="border-t">
          <td className="py-2 px-4">{order.no}</td>
          <td className="py-2 px-4">{order.pelanggan}</td>
          <td className="py-2 px-4">{order.total}</td>
          {showPayment && <td className="py-2 px-4">{order.Pembayaran}</td>}

          <td className="py-2 px-4">
            <select
              className={`text-xs px-2 py-1 rounded-sm
  ${
    order.status === "Dikirim"
      ? "bg-blue-100 text-blue-700"
      : order.status === "Selesai"
      ? "bg-green-100 text-green-700"
      : order.status === "Dibatalkan"
      ? "bg-red-100 text-red-700"
      : order.status === "Menunggu Pembayaran"
      ? "bg-orange-100 text-orange-700"
      : "bg-yellow-100 text-yellow-700"
  }`}
              value={order.status}
              onChange={(e) => handleStatusChange(idx, e.target.value)}
            >
              {statusOptions.map((status) => (
                <option key={status} value={status}>
                  {status}
                </option>
              ))}
            </select>
          </td>

          {showAction && (
            <td className="py-2 px-4 flex gap-3">
              <button
                className="text-blue-500 hover:text-blue-700"
                onClick={() =>
                  navigate(`/dashboard/order/${order.no.replace("#", "")}`)
                }
              >
                <IoEyeSharp className="w-5 h-5" />
              </button>
            </td>
          )}
        </tr>
      ))}
    </Table>
  );
};

export default OrderTable;
