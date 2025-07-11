import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { FaPrint, FaPlus } from "react-icons/fa";
import Button from "../../../components/atoms/Button";
import OrderTable from "../../../components/organisms/dashboard/OrderTable";
import Pagination from "../../../components/atoms/Pagination";
import Filter from "../../../components/atoms/Filter";
import { OrderService } from "../../../services/OrderService";
import { ReportService } from "../../../services/ReportService";

const OrderDashboardPage = () => {
  const [sortBy, setSortBy] = useState("");
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
        limit: 8,
        status: sortBy,
      });

      const ordersData = response.data || []; // ambil dari "data"
      const totalPagesData = response.pagination?.totalPages || 1; // ambil dari "pagination"

      setOrders(ordersData);
      setTotalPages(totalPagesData);
    } catch (err) {
      console.error("❌ Gagal memuat pesanan:", err);
    } finally {
      setLoading(false);
    }
  };

  const handleStatusChange = async (id, newStatus) => {
    try {
      await OrderService.updateStatus(id, newStatus);
      fetchOrders();
    } catch (error) {
      console.error("❌ Gagal mengubah status:", error);
    }
  };

  const handlePrint = async () => {
    try {
      const blob = await ReportService.downloadProcessingPDF();
      const url = window.URL.createObjectURL(blob);
      const a = document.createElement("a");
      a.href = url;
      a.download = `laporan-diproses-${new Date()
        .toISOString()
        .slice(0, 10)}.pdf`;
      document.body.appendChild(a);
      a.click();
      a.remove();
      window.URL.revokeObjectURL(url);
    } catch (error) {
      console.error("❌ Gagal download PDF:", error);
      alert("Gagal mencetak laporan. Cek koneksi atau login ulang.");
    }
  };

  return (
    <div className="space-y-6 bg-white p-6 rounded-lg shadow">
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
            onClick={handlePrint}
          >
            <FaPrint />
          </Button>
        </div>
      </div>

      <OrderTable
        data={orders}
        loading={loading}
        showAction={true}
        showPayment={true}
        onStatusChange={handleStatusChange}
      />

      <Pagination
        currentPage={currentPage}
        totalPages={totalPages}
        onPageChange={(page) => setCurrentPage(page)}
      />
    </div>
  );
};

export default OrderDashboardPage;
