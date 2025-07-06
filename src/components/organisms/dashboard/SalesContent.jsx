import React, { useEffect, useState } from "react";
import { FaPrint } from "react-icons/fa";
import Button from "../../atoms/Button";
import Table from "../../atoms/Table";
import Pagination from "../../atoms/Pagination";
import { API_URL } from "../../../services/API";
import Alert from "../../atoms/Alert";
import Filter from "../../atoms/Filter";

const SalesContent = () => {
  const [isPrintModalOpen, setIsPrintModalOpen] = useState(false);
  const [selectedPeriod, setSelectedPeriod] = useState("year");
  const [alertMessage, setAlertMessage] = useState("");
  const [sales, setSales] = useState([]);

  const headers = ["Produk", "Variasi", "Jumlah Terjual", "Total Pendapatan"];

  const filterOptions = [
    { label: "Hari Ini", value: "today" },
    { label: "Minggu Ini", value: "week" },
    { label: "Bulan Ini", value: "month" },
    { label: "Tahun Ini", value: "year" },
  ];

  const closeAlert = () => {
    setAlertMessage("");
  };

  const fetchSalesData = async () => {
    try {
      const token = localStorage.getItem("token");
      const url = `/reports/product-sales?period=${selectedPeriod}`;

      const res = await fetch(`${API_URL}${url}`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      if (!res.ok) throw new Error("Gagal mengambil data penjualan");

      const json = await res.json();

      const newSales =
        json?.data?.sales?.map((item) => ({
          productName: item.productName,
          variationName: item.variationName,
          totalQuantitySold: item.totalQuantitySold,
          totalRevenue: item.formattedTotalRevenue,
        })) || [];

      setSales(newSales);
    } catch (error) {
      console.error("Gagal mengambil data penjualan:", error);
    }
  };

  useEffect(() => {
    fetchSalesData();
  }, [selectedPeriod]);

  const handlePrint = async () => {
    const url = `/reports/product-sales/pdf?period=${selectedPeriod}`;

    try {
      const token = localStorage.getItem("token");

      const response = await fetch(`${API_URL}${url}`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      if (!response.ok) throw new Error("Gagal mencetak laporan");

      const blob = await response.blob();
      const fileURL = URL.createObjectURL(blob);
      window.open(fileURL, "_blank");
      setIsPrintModalOpen(false);
    } catch (error) {
      console.error("Gagal mencetak laporan:", error);
      setAlertMessage("Gagal mencetak laporan. Silakan coba lagi.");
    }
  };

  return (
    <div className="space-y-6 bg-white p-6 rounded-lg shadow">
      {/* Toolbar */}
      <div className="flex w-full justify-between items-center">
        <h1 className="text-xl font-bold text-gray-800">Daftar Penjualan</h1>
        <div className="flex flex-wrap justify-end items-center gap-4">
          <div className="w-48">
            <Filter
              value={selectedPeriod}
              onChange={setSelectedPeriod}
              options={filterOptions}
            />
          </div>
          <Button
            text="Cetak Pesanan"
            className="rounded-md py-2"
            width="w-36"
            onClick={() => setIsPrintModalOpen(true)}
          >
            <FaPrint />
          </Button>
        </div>
      </div>

      <Table headers={headers}>
        {sales.map((sale, idx) => (
          <tr key={idx} className="border-t">
            <td className="py-2 px-4">{sale.productName}</td>
            <td className="py-2 px-4">{sale.variationName}</td>
            <td className="py-2 px-4">{sale.totalQuantitySold}</td>
            <td className="py-2 px-4">{sale.totalRevenue}</td>
          </tr>
        ))}
      </Table>

      <Pagination />

      {/* Modal Cetak */}
      {isPrintModalOpen && (
        <div className="fixed -inset-7 z-50 bg-black bg-opacity-30 flex items-center justify-center">
          <div className="bg-white p-6 rounded-lg w-full max-w-md space-y-4 shadow-lg">
            <h2 className="text-lg font-semibold text-center">
              Pilih Tipe Laporan
            </h2>

            <div className="flex flex-col gap-4">
              <div>
                <label className="text-sm font-medium">Periode:</label>
                <select
                  className="border p-2 rounded-md w-full"
                  value={selectedPeriod}
                  onChange={(e) => setSelectedPeriod(e.target.value)}
                >
                  <option value="today">Hari Ini</option>
                  <option value="week">Mingguan</option>
                  <option value="month">Bulanan</option>
                  <option value="year">Tahunan</option>
                </select>
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

      {/* Alert Error */}
      {alertMessage && (
        <Alert
          message={alertMessage}
          onCancel={closeAlert}
          cancelText="Tutup"
        />
      )}
    </div>
  );
};

export default SalesContent;
