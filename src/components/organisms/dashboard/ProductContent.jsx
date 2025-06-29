import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { FaPlus } from "react-icons/fa";
import Button from "../../atoms/Button";
import { FiEdit } from "react-icons/fi";
import { MdDelete } from "react-icons/md";
import Table from "../../atoms/Table";
import Pagination from "../../atoms/Pagination";
import Filter from "../../atoms/Filter";

const ProductContent = () => {
  const navigate = useNavigate();
  const [sortBy, setSortBy] = useState("");

  const sortOptions = [
    { value: "menungguPembayaran", label: "Menunggu Pembayaran" },
    { value: "diproses", label: "Diproses" },
    { value: "dikirim", label: "Dikirim" },
    { value: "selesai", label: "Selesai" },
    { value: "dibatalkan", label: "Dibatalkan" },
  ];

  const orders = [
    {
      produk: {
        nama: "Tahu Kuning Normal",
        gambar: "/images/product/header.png",
      },
      harga: "Rp12.000",
      kategori: "Tahu Kuning",
      deskripsi:
        "lorem ipsum dolor sit amet, consectetur adipiscing elit.  Sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.",
    },
  ];

  const headers = ["No", "Produk", "Kategori", "Harga", "Deskripsi", "Aksi"];

  return (
    <div className="space-y-6 bg-white p-6 rounded-lg shadow">
      {/* Toolbar */}
      <div className="flex w-full justify-between items-center">
        <h1 className="text-xl font-bold text-gray-800">Daftar Produk</h1>
        <div className="flex flex-auto justify-end gap-4">
          <Filter value={sortBy} onChange={setSortBy} options={sortOptions} />
          <Button
            width="w-52"
            className="rounded-md flex items-center justify-center gap-2 py-2"
            onClick={() => navigate("/dashboard/add-product")}
          >
            <FaPlus className="text-sm" />
            Tambah Produk
          </Button>
        </div>
      </div>

      <Table headers={headers}>
        {orders.map((order, idx) => (
          <tr key={idx} className="border-t">
            <td className="py-2 px-4">{idx + 1}</td>
            <td className="py-2 px-4">
              <div className="flex items-center gap-3">
                <img
                  src={order.produk.gambar}
                  alt={order.produk.nama}
                  className="w-10 h-10 object-cover rounded"
                />
                <span className="text-sm font-medium text-gray-800">
                  {order.produk.nama}
                </span>
              </div>
            </td>
            <td className="py-2 px-4">{order.kategori}</td>
            <td className="py-2 px-4">{order.harga}</td>
            <td className="py-2 px-4 max-w-xs">
              <p
                className="truncate text-sm text-gray-700"
                title={order.deskripsi}
              >
                {order.deskripsi}
              </p>
            </td>
            <td className="py-2 px-4 flex gap-3">
              <button className="text-green-500 hover:text-green-700">
                <FiEdit className="w-5 h-5" />
              </button>
              <button className="text-primary hover:text-red-800">
                <MdDelete className="w-5 h-5" />
              </button>
            </td>
          </tr>
        ))}
      </Table>

      {/* Pagination */}
      <Pagination />
    </div>
  );
};

export default ProductContent;
