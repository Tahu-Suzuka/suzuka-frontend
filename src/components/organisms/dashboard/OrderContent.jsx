import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { FaPrint, FaPlus } from "react-icons/fa";
import Button from "../../atoms/Button";
import OrderTable from "../../organisms/dashboard/OrderTable";
import Pagination from "../../atoms/Pagination";
import Filter from "../../atoms/Filter";
import { OrderService } from "../../../services/OrderService";

const OrderContent = () => {
  const [sortBy, setSortBy] = useState("");
  const [isPrintModalOpen, setIsPrintModalOpen] = useState(false);
  const [startDate, setStartDate] = useState("");
  const [endDate, setEndDate] = useState("");

  const [orders, setOrders] = useState([]);
  const [loading, setLoading] = useState(false);
  const [currentPage, setCurrentPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);

  const navigate = useNavigate();

  const sortOptions = [
    { value: "", label: "Semua Status" },
    { value: "Menunggu Pembayaran", label: "Menunggu Pembayaran" },
    { value: "Diproses", label: "Diproses" },
    { value: "Dikirim", label: "Dikirim" },
    { value: "Selesai", label: "Selesai" },
    { value: "Dibatalkan", label: "Dibatalkan" },
  ];

  useEffect(() => {
    fetchOrders();
  }, [sortBy, currentPage]);

  const fetchOrders = async () => {
    try {
      setLoading(true);
      const response = await OrderService.getAll({
        page: currentPage,
        status: sortBy,
      });

      const orders = Array.isArray(response.data)
        ? response.data
        : response.data?.orders || response.orders || [];

      const totalPages = response.totalPages || response.data?.totalPages || 1;

      setOrders(orders);
      setTotalPages(totalPages);
    } catch (err) {
      console.error("❌ Gagal load orders:", err);
    } finally {
      setLoading(false);
    }
  };

  const handleStatusChange = async (id, newStatus) => {
    try {
      await OrderService.updateStatus(id, newStatus);
      fetchOrders(); // refresh setelah update
    } catch (error) {
      console.error("❌ Gagal mengubah status:", error);
    }
  };

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
      <OrderTable
        data={orders}
        loading={loading}
        showAction={true}
        showPayment={true}
        onStatusChange={handleStatusChange}
      />

      {/* Pagination */}
      <Pagination
        currentPage={currentPage}
        totalPages={totalPages}
        onPageChange={(page) => setCurrentPage(page)}
      />

      {/* Modal Cetak */}
      {isPrintModalOpen && (
        <div className="fixed -inset-7 z-50 bg-black bg-opacity-30 flex items-center justify-center">
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
