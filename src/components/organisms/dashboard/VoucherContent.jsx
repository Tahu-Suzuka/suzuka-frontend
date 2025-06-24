import React from "react";
import { FaPlus } from "react-icons/fa";
import { FiEdit } from "react-icons/fi";
import { MdDelete } from "react-icons/md";
import Button from "../../atoms/Button";
import Table from "../../atoms/Table";
import Pagination from "../../atoms/Pagination";

const VoucherContent = () => {
  const vouchers = [
    {
      kode: "DISKONJUNI10K",
      tipe: "Potongan Harga",
      deskripsi: "Diskon 10% untuk pembelian tahu kuning",
      potongan: "10%",
      mulai: "2024-12-10",
      akhir: "2025-12-10",
    },
    {
      kode: "ONGKIRGRATISBDG",
      tipe: "Potongan Ongkir",
      deskripsi: "Gratis ongkir wilayah Bandung",
      potongan: "Rp10.000",
      mulai: "2024-07-01",
      akhir: "2024-08-01",
    },
    {
      kode: "SEMUA20PERSEN",
      tipe: "Persentase",
      deskripsi: "Diskon 20% untuk semua produk",
      potongan: "20%",
      mulai: "2024-06-01",
      akhir: "2024-06-30",
    },
  ];

  const headers = [
    "Kode",
    "Tipe",
    "Deskripsi",
    "Potongan",
    "Mulai ",
    "Akhir ",
    "Aksi",
  ];

  const formatTanggal = (tanggal) => {
    const [year, month, day] = tanggal.split("-");
    return `${day}-${month}-${year}`;
  };

  return (
    <div className="space-y-6 bg-white p-6 rounded-lg shadow">
      {/* Toolbar */}
      <div className="flex w-full justify-between items-center">
        <h1 className="text-xl font-bold text-gray-800">Daftar Voucher</h1>
        <div className="flex flex-wrap justify-end gap-4">
          <Button
            width="w-44"
            py="py-2"
            className="rounded-md flex items-center justify-center gap-2"
          >
            <FaPlus className="text-sm" />
            <span>Tambah Kategori</span>
          </Button>
        </div>
      </div>

      {/* Table */}
      <Table headers={headers}>
        {vouchers.map((voucher, idx) => (
          <tr key={idx} className="border-t">
            <td className="py-2 px-4">{voucher.kode}</td>

            <td className="py-2 px-4">
              <span
                className={`px-1 py-1 text-xs rounded font-medium ${
                  voucher.tipe === "Potongan Harga"
                    ? "bg-green-100 text-green-700"
                    : voucher.tipe === "Persentase"
                    ? "bg-yellow-100 text-yellow-700"
                    : "bg-blue-100 text-blue-700"
                }`}
              >
                {voucher.tipe}
              </span>
            </td>
            <td className="py-2 px-4">{voucher.deskripsi}</td>
            <td className="py-2 px-4">{voucher.potongan}</td>
            <td className="py-2 px-4">{formatTanggal(voucher.mulai)}</td>
            <td className="py-2 px-4">{formatTanggal(voucher.akhir)}</td>
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

export default VoucherContent;
