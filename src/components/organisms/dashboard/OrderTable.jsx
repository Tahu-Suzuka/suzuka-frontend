import React from "react";
import { useNavigate } from "react-router-dom";
import { IoEyeSharp } from "react-icons/io5";
import Table from "../../atoms/Table";

const OrderTable = ({
  data = [],
  showAction = true,
  showPayment = true,
  onStatusChange,
  currentPage = 1,
  itemsPerPage = 10,
}) => {
  const navigate = useNavigate();

  const statusOptions = [
    "Menunggu Pembayaran",
    "Diproses",
    "Dikirim",
    "Selesai",
    "Dibatalkan",
  ];

  const headers = [
    "No",
    "No. Pesanan",
    "Pelanggan",
    "Total",
    ...(showPayment ? ["Pembayaran"] : []),
    "Status",
    "Pesan",
    ...(showAction ? ["Aksi"] : []),
  ];

  return (
    <Table headers={headers}>
      {data.length === 0 ? (
        <tr>
          <td colSpan={headers.length} className="text-center py-4">
            Tidak ada pesanan.
          </td>
        </tr>
      ) : (
        data.map((order, idx) => (
          <tr key={order.id || idx} className="border-t">
            <td className="py-2 px-4 ">
              {(currentPage - 1) * itemsPerPage + idx + 1}
            </td>
            <td className="py-2 px-4">{`${order.id?.slice(0, 6)}`}</td>
            <td className="py-2 px-4">{order.user.name || "-"}</td>
            <td className="py-2 px-4">
              Rp{order.totalPayment?.toLocaleString("id-ID")}
            </td>
            {showPayment && (
              <td className="py-2 px-4">{order.paymentMethod || "-"}</td>
            )}
            <td className="py-2 px-4">
              <select
                className={`text-xs px-2 py-1 rounded-sm ${
                  order.orderStatus === "Dikirim"
                    ? "bg-blue-100 text-blue-700"
                    : order.orderStatus === "Selesai"
                    ? "bg-green-100 text-green-700"
                    : order.orderStatus === "Dibatalkan"
                    ? "bg-red-100 text-primary"
                    : order.orderStatus === "Menunggu Pembayaran"
                    ? "bg-orange-100 text-orange-700"
                    : "bg-yellow-100 text-yellow-700"
                }`}
                value={order.orderStatus}
                onChange={(e) => onStatusChange(order.id, e.target.value)}
              >
                {statusOptions.map((status) => (
                  <option key={status} value={status}>
                    {status}
                  </option>
                ))}
              </select>
            </td>
            <td className="py-2 px-4">{order.note || "-"}</td>
            {showAction && (
              <td className="py-2 px-4">
                <button
                  className="text-blue-500 hover:text-blue-700"
                  onClick={() => navigate(`/dashboard/order/${order.id}`)}
                >
                  <IoEyeSharp className="w-5 h-5" />
                </button>
              </td>
            )}
          </tr>
        ))
      )}
    </Table>
  );
};

export default OrderTable;
