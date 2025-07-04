import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { FaPlus } from "react-icons/fa";
import { FiEdit } from "react-icons/fi";
import { MdDelete } from "react-icons/md";
import Button from "../../atoms/Button";
import Pagination from "../../atoms/Pagination";
import Table from "../../atoms/Table";
import { VoucherService } from "../../../services/VoucherService";
import Alert from "../../atoms/Alert";

const VoucherContent = () => {
  const navigate = useNavigate();
  const [vouchers, setVouchers] = useState([]);
  const [loading, setLoading] = useState(true);
  const [alert, setAlert] = useState({
    show: false,
    message: "",
    onConfirm: null,
    onCancel: null,
  });

  const headers = [
    "Kode",
    "Tipe",
    "Minimum Pembelian",
    "Nilai",
    "Masa Berlaku",
    "Status",
    "Aksi",
  ];

  const badgeTipeClasses = {
    POTONGAN_HARGA: "bg-green-100 text-green-700",
    POTONGAN_ONGKIR: "bg-blue-100 text-blue-700",
  };

  const badgeStatusClasses = {
    aktif: "bg-emerald-100 text-emerald-700",
    kedaluwarsa: "bg-red-100 text-red-700",
  };

  const formatTanggal = (tanggal) => {
    const date = new Date(tanggal);
    return date.toLocaleDateString("id-ID", {
      day: "2-digit",
      month: "2-digit",
      year: "numeric",
    });
  };

  const formatRupiah = (angka) => {
    if (!angka) return "-";
    return angka.toLocaleString("id-ID", {
      style: "currency",
      currency: "IDR",
      minimumFractionDigits: 0,
    });
  };

  const getStatus = (voucher) => {
    const now = new Date();
    const until = new Date(voucher.validUntil);
    return now <= until ? "aktif" : "kedaluwarsa";
  };

  const fetchData = async () => {
    try {
      setLoading(true);
      const token = localStorage.getItem("token");
      const data = await VoucherService.getAll(token);
      setVouchers(data);
    } catch (err) {
      console.error("Gagal mengambil data voucher:", err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchData();
  }, []);

  const handleDelete = async (id) => {
    const token = localStorage.getItem("token");
    try {
      await VoucherService.delete(id, token);
      fetchData();
    } catch (err) {
      setAlert({
        show: true,
        message: "Gagal menghapus voucher.",
        onCancel: () => setAlert({ ...alert, show: false }),
      });
    }
  };

  const confirmDelete = (id) => {
    setAlert({
      show: true,
      message: "Yakin ingin menghapus voucher ini?",
      onConfirm: () => {
        setAlert({ ...alert, show: false });
        handleDelete(id);
      },
      onCancel: () => setAlert({ ...alert, show: false }),
    });
  };

  return (
    <div className="space-y-6 rounded-lg bg-white p-6 shadow">
      {/* Toolbar */}
      <div className="flex w-full flex-wrap items-center justify-between gap-4">
        <h1 className="text-xl font-bold text-gray-800">Daftar Voucher</h1>
        <Button
          width="w-52"
          className="flex items-center justify-center gap-2 rounded-md py-2"
          onClick={() => navigate("/dashboard/add-voucher")}
        >
          <FaPlus className="text-sm" />
          Tambah Voucher
        </Button>
      </div>

      {/* Tabel Voucher */}
      <Table headers={headers}>
        {loading ? (
          <tr>
            <td colSpan={headers.length} className="text-center py-4">
              Memuat data...
            </td>
          </tr>
        ) : vouchers.length === 0 ? (
          <tr>
            <td colSpan={headers.length} className="text-center py-4">
              Tidak ada data voucher.
            </td>
          </tr>
        ) : (
          vouchers.map((voucher) => (
            <tr key={voucher.id} className="border-t">
              <td className="px-4 py-2">{voucher.code}</td>
              <td className="px-4 py-2">
                <span
                  className={`rounded px-2 py-1 text-xs font-medium ${
                    badgeTipeClasses[voucher.type] ||
                    "bg-gray-100 text-gray-700"
                  }`}
                >
                  {voucher.type.replace("_", " ")}
                </span>
              </td>
              <td className="px-4 py-2">{formatRupiah(voucher.minPurchase)}</td>
              <td className="px-4 py-2">{formatRupiah(voucher.value)}</td>
              <td className="px-4 py-2">{formatTanggal(voucher.validUntil)}</td>
              <td className="px-4 py-2">
                <span
                  className={`rounded px-2 py-1 text-xs font-medium capitalize ${
                    badgeStatusClasses[getStatus(voucher)] ||
                    "bg-gray-100 text-gray-700"
                  }`}
                >
                  {getStatus(voucher)}
                </span>
              </td>
              <td className="flex gap-3 px-4 py-2">
                <button
                  onClick={() =>
                    navigate(`/dashboard/edit-voucher/${voucher.id}`)
                  }
                  className="text-green-500 hover:text-green-700"
                >
                  <FiEdit className="h-5 w-5" />
                </button>
                <button
                  onClick={() => confirmDelete(voucher.id)}
                  className="text-primary hover:text-red-800"
                >
                  <MdDelete className="h-5 w-5" />
                </button>
              </td>
            </tr>
          ))
        )}
      </Table>

      <Pagination />

      {alert.show && (
        <Alert
          message={alert.message}
          onCancel={alert.onCancel}
          onConfirm={alert.onConfirm}
        />
      )}
    </div>
  );
};

export default VoucherContent;
