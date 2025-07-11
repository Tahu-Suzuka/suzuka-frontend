import React, { useState, useEffect } from "react";
import { FaStar } from "react-icons/fa";
import Table from "../../components/atoms/Table";
import Pagination from "../../components/atoms/Pagination";
import SearchBar from "../../components/atoms/SearchBar";
import Filter from "../../components/atoms/Filter";
import { ReviewService } from "../../services/ReviewService";

const ReviewContent = () => {
  const [searchTerm, setSearchTerm] = useState("");
  const [sortBy, setSortBy] = useState("");
  const [reviews, setReviews] = useState([]);
  const [loading, setLoading] = useState(true);
  const [currentPage, setCurrentPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);

  const sortOptions = [
    { value: "", label: "Semua Rating" },
    { value: "5", label: "Bintang 5" },
    { value: "4", label: "Bintang 4" },
    { value: "3", label: "Bintang 3" },
    { value: "2", label: "Bintang 2" },
    { value: "1", label: "Bintang 1" },
  ];

  useEffect(() => {
    const fetchReviews = async () => {
      setLoading(true);
      try {
        const res = await ReviewService.getAllReviews({
          page: currentPage,
          limit: 8,
        });
        setReviews(res.data || []);
        setTotalPages(res.pagination?.totalPages || 1);
      } catch (error) {
        console.error("Gagal mengambil data ulasan:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchReviews();
  }, [currentPage]);

  const filteredReviews = reviews
    .filter((review) =>
      review.comment.toLowerCase().includes(searchTerm.toLowerCase())
    )
    .filter((review) => (sortBy ? review.rating === parseInt(sortBy) : true));
  const headers = ["No", "Pelanggan", "Produk", "Rating", "Komentar"];

  return (
    <div className="space-y-6 bg-white p-6 rounded-lg shadow">
      {/* Toolbar */}
      <div className="flex w-full justify-between items-center">
        <h1 className="text-xl font-bold text-gray-800">Daftar Ulasan</h1>
        <div className="flex flex-auto justify-end gap-4">
          <div className="w-44">
            <SearchBar
              searchTerm={searchTerm}
              setSearchTerm={setSearchTerm}
              placeholder="Cari komentar..."
            />
          </div>
          <Filter value={sortBy} onChange={setSortBy} options={sortOptions} />
        </div>
      </div>

      <Table headers={headers}>
        {loading ? (
          <tr>
            <td colSpan={headers.length} className="text-center py-10">
              Memuat ulasan...
            </td>
          </tr>
        ) : filteredReviews.length > 0 ? (
          filteredReviews.map((review, idx) => (
            <tr key={review.id} className="border-t">
              <td className="py-2 px-4 w-12">
                {(currentPage - 1) * 8 + idx + 1}
              </td>

              <td className="py-2 px-4 font-medium">{review.user?.name}</td>
              <td className="py-2 px-4">{review.product?.product_name}</td>
              <td className="py-2 px-4">
                <div className="flex text-secondary">
                  {[...Array(5)].map((_, i) => (
                    <FaStar
                      key={i}
                      className={
                        i < review.rating ? "text-primary" : "text-gray-300"
                      }
                    />
                  ))}
                </div>
              </td>
              <td className="py-2 px-4 text-sm text-gray-600">
                {review.comment}
              </td>
            </tr>
          ))
        ) : (
          <tr>
            <td colSpan={headers.length} className="text-center py-10">
              Tidak ada ulasan.
            </td>
          </tr>
        )}
      </Table>

      {/* Pagination */}
      <Pagination
        currentPage={currentPage}
        totalPages={totalPages}
        onPageChange={(page) => setCurrentPage(page)}
      />
    </div>
  );
};

export default ReviewContent;
