import React, { useState } from "react";
import { FaPrint } from "react-icons/fa";
import Button from "../../atoms/Button";
import OrderTable from "../../organisms/dashboard/OrderTable";
import SearchBar from "../../atoms/SearchBar";

const OrderContent = () => {
  const [searchTerm, setSearchTerm] = useState("");

  const orders = [
    {
      no: "#202501",
      tanggal: "2025-06-17",
      pelanggan: "Ahmad",
      total: "Rp120.000",
      status: "Belum Dibayar",
    },
    {
      no: "#202502",
      tanggal: "2025-06-17",
      pelanggan: "Siti",
      total: "Rp85.000",
      status: "Diproses",
    },
    {
      no: "#202503",
      tanggal: "2025-06-17",
      pelanggan: "Rudi",
      total: "Rp200.000",
      status: "Dikirim",
    },
    {
      no: "#202504",
      tanggal: "2025-06-17",
      pelanggan: "Nina",
      total: "Rp55.000",
      status: "Selesai",
    },
    {
      no: "#202505",
      tanggal: "2025-06-17",
      pelanggan: "Fajar",
      total: "Rp99.000",
      status: "Dibatalkan",
    },
  ];

  return (
    <div className="space-y-6 bg-white p-6 rounded-lg shadow">
      {/* Toolbar */}
      <div className="flex w-full justify-between items-center">
        <h1 className="text-xl font-bold text-gray-800">Daftar Pesanan</h1>
        <div className="flex flex-wrap justify-end gap-4">
          <Button
            text="Tambah Pesanan Manual"
            width="w-52"
            className="rounded-md"
          />

          <select className="border border-gray-300 text-sm px-2 rounded-md">
            <option>Semua Status</option>
            <option>Belum Dibayar</option>
            <option>Diproses</option>
            <option>Dikirim</option>
            <option>Selesai</option>
            <option>Dibatalkan</option>
          </select>

          <div className="w-40">
            <SearchBar
              searchTerm={searchTerm}
              setSearchTerm={setSearchTerm}
              placeholder="Cari pesanan..."
            />
          </div>

          <Button text="Cetak Invoice" className="rounded-md" width="w-52">
            <FaPrint />
          </Button>
        </div>
      </div>

      {/* Table */}
      <OrderTable showDate={true} showAction={true} />

      {/* Pagination */}
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

export default OrderContent;
