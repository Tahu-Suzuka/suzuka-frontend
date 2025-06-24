import React from "react";
import { FaPlus } from "react-icons/fa";
import Button from "../../atoms/Button";
import { FiEdit } from "react-icons/fi";
import { MdDelete } from "react-icons/md";
import Table from "../../atoms/Table";

const ProductContent = () => {
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

  const headers = ["Produk", "Kategori", "Harga", "Deskripsi", "Aksi"];

  return (
    <div className="space-y-6 bg-white p-6 rounded-lg shadow">
      {/* Toolbar */}
      <div className="flex w-full justify-between items-center">
        <h1 className="text-xl font-bold text-gray-800">Daftar Produk</h1>
        <div className="flex flex-wrap justify-end gap-4">
          <select className="border border-gray-300 text-sm px-2 rounded-md">
            <option>Semua Kategori</option>
            <option>Tahu Kuning</option>
            <option>Tahu Putih</option>
            <option>Tahu Stik</option>
            <option>Tahu Varian Rasa</option>
            <option>Tahu Olahan</option>
          </select>
          <Button
            width="w-52"
            py="py-2"
            className="rounded-md flex items-center justify-center gap-2"
          >
            <FaPlus className="text-sm" />
            <span>Tambah Produk</span>
          </Button>
        </div>
      </div>

      <Table headers={headers}>
        {orders.map((order, idx) => (
          <tr key={idx} className="border-t">
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
    </div>
  );
};

export default ProductContent;
