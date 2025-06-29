import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { FaPrint, FaPlus } from "react-icons/fa";
import Button from "../../atoms/Button";
import OrderTable from "../../organisms/dashboard/OrderTable";
import Pagination from "../../atoms/Pagination";
import Filter from "../../atoms/Filter";

const OrderContent = () => {
  const [sortBy, setSortBy] = useState("");
  const [isPrintModalOpen, setIsPrintModalOpen] = useState(false);
  const [startDate, setStartDate] = useState("");
  const [endDate, setEndDate] = useState("");

  const navigate = useNavigate();

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

  const handlePrint = () => {
    if (!startDate || !endDate) {
      alert("Silakan pilih rentang tanggal terlebih dahulu.");
      return;
    }

    console.log("Cetak pesanan dari:", startDate, "sampai:", endDate);
    setIsPrintModalOpen(false);
  };

  return (
    <div className="space-y-6 bg-white p-6 rounded-lg shadow">
      {/* Toolbar */}
      <div className="flex w-full justify-between items-center">
        <h1 className="text-xl font-bold text-gray-800">Daftar Pesanan</h1>
        <div className="flex flex-auto justify-end gap-4">
          <Filter value={sortBy} onChange={setSortBy} options={sortOptions} />
          <Button
            width="w-44"
            className="rounded-md py-2"
            onClick={() => navigate("/dashboard/add-order")}
          >
            <FaPlus className="text-sm" />
            Tambah Pesanan
          </Button>
          <Button
            text="Cetak Pesanan"
            className="rounded-md"
            width="w-36"
            onClick={() => setIsPrintModalOpen(true)}
          >
            <FaPrint />
          </Button>
        </div>
      </div>

      {/* Table */}
      <OrderTable showDate={true} showAction={true} />

      {/* Pagination */}
      <Pagination />

      {/* Modal Cetak */}
      {isPrintModalOpen && (
        <div className="fixed -inset-7 z-50 bg-black bg-opacity-30 flex items-center justify-center ">
          <div className="bg-white p-6 rounded-lg w-full max-w-md space-y-4 shadow-lg">
            <h2 className="text-lg font-semibold text-center">
              Pilih Rentang Waktu
            </h2>

            <div className="flex flex-col gap-4">
              <div className="flex flex-col">
                <label htmlFor="startDate" className="text-sm font-medium">
                  Dari Tanggal:
                </label>
                <input
                  id="startDate"
                  type="date"
                  className="border p-2 rounded-md"
                  value={startDate}
                  onChange={(e) => setStartDate(e.target.value)}
                />
              </div>

              <div className="flex flex-col">
                <label htmlFor="endDate" className="text-sm font-medium">
                  Sampai Tanggal:
                </label>
                <input
                  id="endDate"
                  type="date"
                  className="border p-2 rounded-md"
                  value={endDate}
                  onChange={(e) => setEndDate(e.target.value)}
                />
              </div>
            </div>

            <div className="flex justify-end gap-4 pt-4">
              <button
                onClick={() => setIsPrintModalOpen(false)}
                className="px-4 py-2 border border-gray-400 rounded-md text-gray-700 hover:bg-gray-100"
              >
                Batal
              </button>
              <button
                onClick={handlePrint}
                className="px-4 py-2 bg-primary text-white rounded-md hover:bg-primary/90"
              >
                Cetak
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default OrderContent;
