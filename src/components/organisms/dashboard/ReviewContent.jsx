import React, { useState } from "react";
import { FaPrint, FaStar } from "react-icons/fa";
import Button from "../../atoms/Button";
import Table from "../../atoms/Table";
import Pagination from "../../atoms/Pagination";
import SearchBar from "../../atoms/SearchBar";

const ReviewContent = () => {
  const [searchTerm, setSearchTerm] = useState("");
  const reviews = [
    {
      pelanggan: "John Doe",
      produk: "Tahu Kuning",
      rating: 5,
      komentar: "Produk sangat bagus dan lezat!",
    },
    {
      pelanggan: "Jane Smith",
      produk: "Tempe Crispy",
      rating: 4,
      komentar: "Rasa enak, tapi kemasannya bisa lebih baik.",
    },
    {
      pelanggan: "Ali Ahmad",
      produk: "Keripik Singkong",
      rating: 3,
      komentar: "Cukup baik, tapi kurang renyah.",
    },
  ];

  const headers = ["Pelanggan", "Produk", "Rating", "Komentar"];

  return (
    <div className="space-y-6 bg-white p-6 rounded-lg shadow">
      {/* Toolbar */}
      <div className="flex w-full justify-between items-center">
        <h1 className="text-xl font-bold text-gray-800">Daftar Ulasan</h1>
        <div className="flex flex-wrap justify-end gap-4">
          <select className="border border-gray-300 text-sm px-2 rounded-md hover:border-primary">
            <option>Semua Rating</option>
            <option>Bintang 1</option>
            <option>Bintang 2</option>
            <option>Bintang 3</option>
            <option>Bintang 4</option>
            <option>Bintang 5</option>
          </select>
          <div className="w-40">
            <SearchBar
              searchTerm={searchTerm}
              setSearchTerm={setSearchTerm}
              placeholder="Cari komentar..."
            />
          </div>
        </div>
      </div>

      <Table headers={headers}>
        {reviews.map((review, idx) => (
          <tr key={idx} className="border-t">
            <td className="py-2 px-4">{review.pelanggan}</td>
            <td className="py-2 px-4">{review.produk}</td>
            <td className="py-2 px-4 flex text-secondary">
              {[...Array(5)].map((_, i) => (
                <FaStar
                  key={i}
                  className={i < review.rating ? "" : "text-gray-300"}
                />
              ))}
            </td>
            <td className="py-2 px-4">{review.komentar}</td>
          </tr>
        ))}
      </Table>

      {/* Pagination */}
      <Pagination />
    </div>
  );
};

export default ReviewContent;
