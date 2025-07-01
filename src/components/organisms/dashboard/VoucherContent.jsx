import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { FaPlus } from "react-icons/fa";
import { FiEdit } from "react-icons/fi";
import { MdDelete } from "react-icons/md";
import Button from "../../atoms/Button";
import Table from "../../atoms/Table";
import Pagination from "../../atoms/Pagination";
import Alert from "../../atoms/Alert";

const CustomerContent = () => {
  const navigate = useNavigate();

  const [customers, setCustomers] = useState([
    {
      id: 1,
      nama: "Andi Setiawan",
      email: "andi@example.com",
      noHp: "081234567890",
      alamat: "Jl. Merdeka No. 123, Jakarta",
    },
    {
      id: 2,
      nama: "Rina Wijaya",
      email: "rina@example.com",
      noHp: "089876543210",
      alamat: "Jl. Sudirman No. 456, Bandung",
    },
  ]);

  const [showAlert, setShowAlert] = useState(false);
  const [selectedId, setSelectedId] = useState(null);

  const headers = ["No", "Nama", "Email", "No Hp", "Alamat", "Aksi"];

  const confirmDelete = (id) => {
    setSelectedId(id);
    setShowAlert(true);
  };

  const handleConfirmDelete = () => {
    setCustomers((prev) => prev.filter((cust) => cust.id !== selectedId));
    setShowAlert(false);
    setSelectedId(null);
  };

  const handleCancelDelete = () => {
    setShowAlert(false);
    setSelectedId(null);
  };

  return (
    <div className="space-y-6 bg-white p-6 rounded-lg shadow relative">
      {showAlert && (
        <Alert
          message="Apakah kamu yakin ingin menghapus pelanggan ini?"
          onCancel={handleCancelDelete}
          onConfirm={handleConfirmDelete}
        />
      )}

      {/* Toolbar */}
      <div className="flex w-full justify-between items-center">
        <h1 className="text-xl font-bold text-gray-800">Daftar Pelanggan</h1>
        <Button
          width="w-44"
          className="rounded-md flex items-center justify-center gap-2 py-2"
          onClick={() => navigate("/dashboard/add-customer")}
        >
          <FaPlus className="text-sm" />
          Tambah Pelanggan
        </Button>
      </div>

      {/* Table */}
      <Table headers={headers}>
        {customers.map((cust, index) => (
          <tr key={cust.id} className="border-t">
            <td className="py-2 px-4">{index + 1}</td>
            <td className="py-2 px-4">{cust.nama}</td>
            <td className="py-2 px-4">{cust.email}</td>
            <td className="py-2 px-4">{cust.noHp}</td>
            <td className="py-2 px-4">{cust.alamat}</td>
            <td className="py-2 px-4 flex gap-3">
              <button
                className="text-green-500 hover:text-green-700"
                onClick={() => navigate(`/dashboard/edit-customer/${cust.id}`)}
              >
                <FiEdit className="w-5 h-5" />
              </button>
              <button
                className="text-primary hover:text-red-800"
                onClick={() => confirmDelete(cust.id)}
              >
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

export default CustomerContent;
