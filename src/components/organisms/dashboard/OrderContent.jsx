import React, { useState } from "react";
import { FaPrint, FaPlus } from "react-icons/fa";
import Button from "../../atoms/Button";
import OrderTable from "../../organisms/dashboard/OrderTable";
import Pagination from "../../atoms/Pagination";
import Filter from "../../atoms/Filter";

const OrderContent = () => {
  const [searchTerm, setSearchTerm] = useState("");
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
        <div className="flex flex-auto justify-end gap-4">
          <Filter value={sortBy} onChange={setSortBy} options={sortOptions} />
          <Button width="w-44" className="rounded-md py-2">
            <FaPlus className="text-sm" />
            Tambah Pesanan
          </Button>

          <Button text="Cetak Invoice" className="rounded-md" width="w-36">
            <FaPrint />
          </Button>
        </div>
      </div>

      {/* Table */}
      <OrderTable showDate={true} showAction={true} />

      {/* Pagination */}
      <Pagination />
    </div>
  );
};

export default OrderContent;
