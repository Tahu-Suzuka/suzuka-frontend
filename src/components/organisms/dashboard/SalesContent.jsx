import React, { useState } from "react";
import { FaPrint } from "react-icons/fa";
import Button from "../../atoms/Button";
import Table from "../../atoms/Table";
import SearchBar from "../../atoms/SearchBar";
import Pagination from "../../atoms/Pagination";

const SalesContent = () => {
  const [searchTerm, setSearchTerm] = useState("");

  const sales = [
    {
      tanggal: "2024-06-01",
      produk: "Tahu Kuning",
      jumlahTerjual: 100,
      totalPendapatan: "Rp 1.000.000",
    },
  ];

  const headers = ["Tanggal", "Produk", "Jumlah Terjual", "Total Pendapatan"];

  const formatTanggal = (tanggal) => {
    const [year, month, day] = tanggal.split("-");
    return `${day}-${month}-${year}`;
  };

  return (
    <div className="space-y-6 bg-white p-6 rounded-lg shadow">
      {/* Toolbar */}
      <div className="flex w-full justify-between items-center">
        <h1 className="text-xl font-bold text-gray-800">Daftar Penjualan</h1>
        <div className="flex flex-wrap justify-end gap-4">
          <div className="w-44">
            <SearchBar
              searchTerm={searchTerm}
              setSearchTerm={setSearchTerm}
              placeholder="Cari pesanan..."
            />
          </div>

          <Button text="Cetak Invoice" className="rounded-md" width="w-36">
            <FaPrint />
          </Button>
        </div>
      </div>

      <Table headers={headers}>
        {sales.map((sale, idx) => (
          <tr key={idx} className="border-t">
            <td className="py-2 px-4">{formatTanggal(sale.tanggal)}</td>
            <td className="py-2 px-4">{sale.produk}</td>
            <td className="py-2 px-4">{sale.jumlahTerjual}</td>
            <td className="py-2 px-4">{sale.totalPendapatan}</td>
          </tr>
        ))}
      </Table>

      {/* Pagination */}
      <Pagination />
    </div>
  );
};

export default SalesContent;
