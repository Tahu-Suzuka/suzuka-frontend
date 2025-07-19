import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { FaPlus } from "react-icons/fa";
import { FiEdit } from "react-icons/fi";
import { MdDelete } from "react-icons/md";
import { UserService } from "../../../services/UserService";
import { API_URL } from "../../../services/API";
import { LazyLoadImage } from "react-lazy-load-image-component";
import "react-lazy-load-image-component/src/effects/blur.css";
import Button from "../../../components/atoms/Button";
import Table from "../../../components/atoms/Table";
import SearchBar from "../../../components/atoms/SearchBar";
import Pagination from "../../../components/atoms/Pagination";
import Alert from "../../../components/atoms/Alert";

const CustomerPage = () => {
  const navigate = useNavigate();
  const [customers, setCustomers] = useState([]);
  const [loading, setLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState("");
  const [showAlert, setShowAlert] = useState(false);
  const [selectedId, setSelectedId] = useState(null);
  const [currentPage, setCurrentPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);
  const itemsPerPage = 6;

  const fetchCustomers = async (page) => {
    setLoading(true);
    try {
      const token = localStorage.getItem("token");
      const res = await UserService.getAllPaginated(page, itemsPerPage, token);

      setCustomers(res.data || []);
      setTotalPages(res.pagination?.totalPages || 1);
    } catch (err) {
      console.error("Gagal mengambil data pelanggan:", err);
      alert("Gagal memuat data pelanggan");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchCustomers(currentPage);
  }, [currentPage]);

  const confirmDelete = (id) => {
    setSelectedId(id);
    setShowAlert(true);
  };

  const handleConfirmDelete = async () => {
    try {
      const token = localStorage.getItem("token");
      await UserService.delete(selectedId, token);
      fetchCustomers(currentPage);
    } catch (err) {
      console.error("Gagal menghapus pelanggan:", err);
      alert("Gagal menghapus pelanggan");
    } finally {
      setShowAlert(false);
      setSelectedId(null);
    }
  };

  const handleCancelDelete = () => {
    setShowAlert(false);
    setSelectedId(null);
  };

  const getFullImageUrl = (path) => {
    if (!path) return "/images/default-profile.png";
    if (path.startsWith("http")) return path;
    return `${API_URL}${path}`;
  };

  const headers = ["No", "Nama", "Email", "No. Telepon", "Aksi"];

  return (
    <div className="space-y-6 bg-white p-6 rounded-lg shadow">
      {showAlert && (
        <Alert
          message="Apakah Anda yakin ingin menghapus pelanggan ini?"
          onConfirm={handleConfirmDelete}
          onCancel={handleCancelDelete}
        />
      )}

      <div className="flex w-full justify-between items-center">
        <h1 className="text-xl font-bold text-gray-800">Daftar Pelanggan</h1>
        <div className="flex flex-wrap justify-end gap-4">
          <div className="w-44">
            <SearchBar
              searchTerm={searchTerm}
              setSearchTerm={setSearchTerm}
              placeholder="Cari pelanggan..."
            />
          </div>
          <Button
            width="w-52"
            className="rounded-md flex items-center justify-center gap-2 py-2"
            onClick={() => navigate("/dashboard/add-customer")}
          >
            <FaPlus className="text-sm" />
            Tambah Pelanggan
          </Button>
        </div>
      </div>

      {loading ? (
        <p className="text-center text-gray-500 py-10">Memuat data...</p>
      ) : (
        <Table headers={headers}>
          {customers.length === 0 ? (
            <tr>
              <td colSpan={headers.length} className="py-4 text-center">
                Tidak ada data pelanggan.
              </td>
            </tr>
          ) : (
            customers.map((customer, idx) => (
              <tr key={customer.id} className="border-t">
                <td className="py-2 px-4">
                  {(currentPage - 1) * itemsPerPage + idx + 1}
                </td>
                <td className="py-2 px-4">
                  <div className="flex items-center gap-3">
                    <LazyLoadImage
                      src={getFullImageUrl(customer.image)}
                      alt={customer.name}
                      className="w-10 h-10 object-cover rounded"
                      effect="blur"
                    />
                    <span className="text-sm font-medium text-gray-800">
                      {customer.name}
                    </span>
                  </div>
                </td>
                <td className="py-2 px-4">{customer.email}</td>
                <td className="py-2 px-4">{customer.phone || "-"}</td>
                <td className="py-2 px-4 flex gap-3">
                  <button
                    className="text-green-500 hover:text-green-700"
                    onClick={() =>
                      navigate(`/dashboard/edit-customer/${customer.id}`)
                    }
                  >
                    <FiEdit className="w-5 h-5" />
                  </button>
                  <button
                    className="text-primary hover:text-red-800"
                    onClick={() => confirmDelete(customer.id)}
                  >
                    <MdDelete className="w-5 h-5" />
                  </button>
                </td>
              </tr>
            ))
          )}
        </Table>
      )}

      {!loading && totalPages > 1 && (
        <Pagination
          currentPage={currentPage}
          totalPages={totalPages}
          onPageChange={setCurrentPage}
        />
      )}
    </div>
  );
};

export default CustomerPage;
