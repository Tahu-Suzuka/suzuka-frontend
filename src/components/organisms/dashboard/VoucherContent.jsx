import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { FaPlus } from "react-icons/fa";
import { FiEdit } from "react-icons/fi";
import { MdDelete } from "react-icons/md";
import Button from "../../atoms/Button";
import Table from "../../atoms/Table";
import Pagination from "../../atoms/Pagination";

const VoucherContentPage = () => {
  const navigate = useNavigate();
  const [vouchers, setVouchers] = useState([
    {
      id: 1,
      kode: "DISKONJUNI10K",
      tipe: "Potongan Harga",
      minPembelian: 50000,
      nilai: 10000,
      masaBerlaku: "2024-12-10",
      status: "Aktif",
    },
    {
      id: 2,
      kode: "JULY50",
      tipe: "Potongan Ongkir",
      minPembelian: 100000,
      nilai: 5000,
      masaBerlaku: "2024-07-30",
      status: "Kedaluwarsa",
    },
  ]);

  const headers = [
    "No",
    "Kode",
    "Tipe",
    "Minimum Pembelian",
    "Nilai",
    "Masa Berlaku",
    "Status",
    "Aksi",
  ];

  const formatTanggal = (tanggal) => {
    const [year, month, day] = tanggal.split("-");
    return `${day}-${month}-${year}`;
  };

  const formatRupiah = (angka) => {
    return "Rp" + angka.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ".");
  };

  return (
    <div className="space-y-6 bg-white p-6 rounded-lg shadow">
      {/* Toolbar */}
      <div className="flex w-full justify-between items-center">
        <h1 className="text-xl font-bold text-gray-800">Daftar Voucher</h1>
        <div className="flex flex-wrap justify-end gap-4">
          <Button
            width="w-44"
            className="rounded-md flex items-center justify-center gap-2 py-2"
            onClick={() => navigate("/dashboard/add-voucher")}
          >
            <FaPlus className="text-sm" />
            Tambah Voucher
          </Button>
        </div>
      </div>

      {/* Table */}
      <Table headers={headers}>
        {vouchers.map((voucher, index) => (
          <tr key={voucher.id} className="border-t">
            <td className="py-2 px-4">{index + 1}</td>
            <td className="py-2 px-4">{voucher.kode}</td>

            <td className="py-2 px-4">
              <span
                className={`px-2 py-1 text-xs rounded font-medium ${
                  voucher.tipe === "Potongan Harga"
                    ? "bg-green-100 text-green-700"
                    : voucher.tipe === "Potongan Ongkir"
                    ? "bg-yellow-100 text-yellow-700"
                    : "bg-blue-100 text-blue-700"
                }`}
              >
                {voucher.tipe}
              </span>
            </td>

            <td className="py-2 px-4">{formatRupiah(voucher.minPembelian)}</td>
            <td className="py-2 px-4">{formatRupiah(voucher.nilai)}</td>
            <td className="py-2 px-4">{formatTanggal(voucher.masaBerlaku)}</td>

            <td className="py-2 px-4">
              <span
                className={`px-2 py-1 text-xs rounded font-medium ${
                  voucher.status === "Aktif"
                    ? "bg-green-100 text-green-700"
                    : "bg-red-100 text-red-700"
                }`}
              >
                {voucher.status}
              </span>
            </td>

            <td className="py-2 px-4 flex gap-3">
              <button
                className="text-green-500 hover:text-green-700"
                onClick={() =>
                  navigate(`/dashboard/edit-voucher/${voucher.id}`)
                }
              >
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

export default VoucherContentPage;
