import React, { useState } from "react";
import { FaPlus } from "react-icons/fa";
import Button from "../../atoms/Button";
import { FiEdit } from "react-icons/fi";
import { MdDelete } from "react-icons/md";
import Table from "../../atoms/Table";
import SearchBar from "../../atoms/SearchBar";
import Pagination from "../../atoms/Pagination";

const CustomerContent = () => {
  const [searchTerm, setSearchTerm] = useState("");
  const customers = [
    {
      customer: {
        nama: "Jeon Jungkook",
        gambar: "/images/default-profile.png",
      },

      email: "jek@suzuka.com",
      telepon: "08123456789",
      jumlah: 5,
    },
  ];

  const headers = ["Nama", "Email", "No. Telepon", "Jumlah Pesanan", "Aksi"];

  return (
    <div className="space-y-6 bg-white p-6 rounded-lg shadow">
      {/* Toolbar */}
      <div className="flex w-full justify-between items-center">
        <h1 className="text-xl font-bold text-gray-800">Daftar Pelanggan</h1>

        <div className="flex flex-wrap justify-end gap-4">
          <div className="w-40">
            <SearchBar
              searchTerm={searchTerm}
              setSearchTerm={setSearchTerm}
              placeholder="Cari pelanggan..."
            />
          </div>
          <Button
            width="w-44"
            py="py-2"
            className="rounded-md flex items-center justify-center gap-2"
          >
            <FaPlus className="text-sm" />
            <span>Tambah Pelanggan</span>
          </Button>
        </div>
      </div>

      <Table headers={headers}>
        {customers.map((customer, idx) => (
          <tr key={idx} className="border-t">
            <td className="py-2 px-4">
              <div className="flex items-center gap-3">
                <img
                  src={customer.customer.gambar}
                  alt={customer.customer.nama}
                  className="w-10 h-10 object-cover rounded"
                />
                <span className="text-sm font-medium text-gray-800">
                  {customer.customer.nama}
                </span>
              </div>
            </td>
            <td className="py-2 px-4">{customer.email}</td>
            <td className="py-2 px-4">{customer.telepon}</td>
            <td className="py-2 px-4">{customer.jumlah}</td>
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

export default CustomerContent;
