import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { FaPlus } from "react-icons/fa";
import { FiEdit } from "react-icons/fi";
import { MdDelete } from "react-icons/md";
import { CategoryService } from "../../../services/CategoryService";
import { API_URL } from "../../../services/API";
import { LazyLoadImage } from "react-lazy-load-image-component";
import "react-lazy-load-image-component/src/effects/blur.css";
import Button from "../../../components/atoms/Button";
import Table from "../../../components/atoms/Table";
import Alert from "../../../components/atoms/Alert";

const CategoryPage = () => {
  const navigate = useNavigate();

  const [categories, setCategories] = useState([]);
  const [showAlert, setShowAlert] = useState(false);
  const [selectedId, setSelectedId] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchCategories = async () => {
      setLoading(true);
      try {
        const res = await CategoryService.getAllCategories();
        setCategories(res.data || []);
      } catch (error) {
        console.error("Gagal mengambil kategori:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchCategories();
  }, []);

  const getFullImageUrl = (path) => {
    if (!path) return "/images/default-category.png";
    if (path.startsWith("http")) return path;
    return `${API_URL}${path}`;
  };

  const confirmDelete = (id) => {
    setSelectedId(id);
    setShowAlert(true);
  };

  const handleConfirmDelete = async () => {
    try {
      const token = localStorage.getItem("token");
      await CategoryService.deleteCategory({ id: selectedId, token });
      setCategories((prev) => prev.filter((item) => item.id !== selectedId));
    } catch (error) {
      alert(error.response?.data?.message || "Gagal menghapus kategori.");
    } finally {
      setShowAlert(false);
      setSelectedId(null);
    }
  };

  const handleCancelDelete = () => {
    setShowAlert(false);
    setSelectedId(null);
  };

  const headers = ["No", "Gambar", "Nama", "Aksi"];

  return (
    <div className="space-y-6 bg-white p-6 rounded-lg shadow">
      {showAlert && (
        <Alert
          message="Apakah kamu yakin ingin menghapus kategori ini?"
          onCancel={handleCancelDelete}
          onConfirm={handleConfirmDelete}
        />
      )}

      {/* Toolbar */}
      <div className="flex w-full justify-between items-center">
        <h1 className="text-xl font-bold text-gray-800">Daftar Kategori</h1>
        <div className="flex flex-wrap justify-end gap-4">
          <Button
            width="w-44"
            className="rounded-md flex items-center justify-center gap-2 py-2"
            onClick={() => navigate("/dashboard/add-category")}
          >
            <FaPlus className="text-sm" />
            Tambah Kategori
          </Button>
        </div>
      </div>

      {/* Tabel Kategori */}
      <Table headers={headers}>
        {loading ? (
          <tr>
            <td colSpan={headers.length} className="text-center py-10">
              Memuat...
            </td>
          </tr>
        ) : categories.length === 0 ? (
          <tr>
            <td colSpan={headers.length} className="text-center py-10">
              Tidak ada kategori.
            </td>
          </tr>
        ) : (
          categories.map((category, idx) => (
            <tr key={category.id} className="border-t">
              <td className="py-2 px-4">{idx + 1}</td>
              <td className="py-2 px-4">
                <LazyLoadImage
                  src={getFullImageUrl(category.image)}
                  alt={category.category_name}
                  className="w-10 h-10 object-cover rounded"
                  effect="blur"
                  width={40}
                  height={40}
                />
              </td>
              <td className="py-2 px-4">{category.category_name}</td>
              <td className="py-2 px-4 flex gap-3">
                <button
                  className="text-green-500 hover:text-green-700"
                  onClick={() =>
                    navigate(`/dashboard/edit-category/${category.id}`)
                  }
                >
                  <FiEdit className="w-5 h-5" />
                </button>
                <button
                  className="text-primary hover:text-primary"
                  onClick={() => confirmDelete(category.id)}
                >
                  <MdDelete className="w-5 h-5" />
                </button>
              </td>
            </tr>
          ))
        )}
      </Table>
    </div>
  );
};

export default CategoryPage;
