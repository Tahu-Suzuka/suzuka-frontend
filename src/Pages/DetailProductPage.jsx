import React, { useState } from "react";
import { FaStar, FaTruck, FaTicketAlt } from "react-icons/fa";
import Button from "../components/atoms/Button";
import Header from "../components/atoms/Header";
import Card from "../components/atoms/Card";

const DetailProductPage = () => {
  const [size, setSize] = useState("Kecil");
  const [quantity, setQuantity] = useState(1);

  const handleDecrement = () => {
    if (quantity > 1) setQuantity(quantity - 1);
  };

  const handleIncrement = () => {
    setQuantity(quantity + 1);
  };

  const price = 12000;
  const total = price * quantity;

  const thumbnails = [
    "/images/product/header.png",
    "/images/product/header.png",
    "/images/product/header.png",
  ];

  return (
    <div>
      <div className="bg-[#F3F4F6] min-h-screen">
        <Header imageSrc="/images/product/header.png" title="Detail Produk" />

        <div className="px-20">
          {/* SECTION INFO PRODUK */}
          <div className="max-w-6xl mx-auto bg-white rounded-md px-6 py-10 flex flex-col lg:flex-row gap-6 mt-6">
            <div className="flex-1">
              <img
                src="/images/hero/slider1.png"
                alt="Tahu Kuning"
                className="w-full h-80 object-cover rounded-md"
              />
              <div className="grid grid-cols-3 gap-2 mt-4">
                {thumbnails.map((src, i) => (
                  <img
                    key={i}
                    src={src}
                    alt="Tahu Kuning"
                    className="h-20 object-cover rounded-md w-full"
                  />
                ))}
              </div>
            </div>

            <div className="flex-1">
              <h1 className="text-3xl font-bold mb-2">Tahu Kuning</h1>

              <div className="flex items-center gap-1 text-primary mb-1">
                {[...Array(4)].map((_, i) => (
                  <FaStar key={i} />
                ))}
                <span className="text-sm text-black ml-1">3 Review</span>
              </div>

              <p className="text-gray-700 mb-4">
                Tahu kuning khas Cibuntu dengan tekstur lembut dan cita rasa
                gurih, cocok untuk digoreng atau dimasak dalam berbagai
                hidangan.
              </p>

              <div className="mb-4 text-primary text-2xl font-bold">
                Rp {price.toLocaleString("id-ID")}
              </div>

              <div className="flex items-center gap-2 mb-4">
                <span className="text-sm font-medium">Ukuran :</span>
                {["Kecil", "Normal", "Besar"].map((item) => (
                  <button
                    key={item}
                    onClick={() => setSize(item)}
                    className={`px-3 py-1 rounded-md text-sm border ${
                      size === item
                        ? "bg-secondary text-white"
                        : "bg-white text-black"
                    }`}
                  >
                    {item}
                  </button>
                ))}
              </div>

              <div className="flex items-center gap-2 mb-4">
                <span className="text-sm font-medium">Banyaknya :</span>
                <div className="flex items-center border rounded-md overflow-hidden">
                  <button
                    onClick={handleDecrement}
                    className="px-3 py-1 text-lg"
                  >
                    -
                  </button>
                  <span className="px-4 text-sm">{quantity}</span>
                  <button
                    onClick={handleIncrement}
                    className="px-3 py-1 text-lg"
                  >
                    +
                  </button>
                </div>
              </div>

              <div className="mb-4 text-lg">
                <span className="font-medium">Total</span> : Rp{" "}
                {total.toLocaleString("id-ID")}
              </div>

              <div className="flex gap-4 mb-4">
                <Button
                  text="Masukan Keranjang"
                  bgColor="bg-white"
                  textColor="text-primary"
                  className="border border-primary"
                  py="py-2"
                />
                <Button
                  text="Beli Sekarang"
                  bgColor="bg-primary"
                  textColor="text-white"
                  py="py-2"
                />
              </div>

              <div className="flex items-center gap-2 text-sm text-gray-600 mb-2">
                <FaTruck className="text-lg text-secondary" />
                Pengiriman sesuai dengan tanggal yang anda tentukan
              </div>
              <div className="flex items-center gap-2 text-sm text-gray-600 ">
                <FaTicketAlt className="text-lg text-secondary" />
                Anda dapat memasukan voucher diskon ataupun gratis ongkir
              </div>
            </div>
          </div>

          {/* SECTION DESKRIPSI */}
          <div className="max-w-6xl mx-auto bg-white rounded-md p-6 mt-6">
            <h1 className="text-2xl font-bold mb-2">Deskripsi</h1>
            <p className="text-gray-700 leading-relaxed">
              Tahu kuning Tahu Suzuka dibuat dari kedelai pilihan dan diproses
              secara tradisional dengan tambahan kunyit alami sebagai pewarna,
              menghasilkan warna kuning cerah yang menggugah selera. Teksturnya
              lembut di dalam dan kenyal di luar, sangat cocok digoreng langsung
              atau dimasak dalam sajian tumis, pepes, hingga sambal goreng.
            </p>
          </div>

          {/* SECTION ULASAN */}
          <div className="max-w-6xl mx-auto grid grid-cols-1 lg:grid-cols-3 gap-6 mt-6 mb-10">
            {/* Card Ulasan */}
            <div className="col-span-2 bg-white rounded-md p-6">
              <h1 className="text-2xl font-bold mb-6 text-center">Ulasan</h1>
              {/* sorting rating */}
              <div className="space-y-3 mb-6">
                {[5, 4, 3, 2, 1].map((rating) => {
                  const totalReviews = rating === 5 ? 1 : 0;
                  return (
                    <div
                      key={rating}
                      className="flex items-center justify-center gap-4"
                    >
                      <div className="flex gap-1">
                        {[...Array(5)].map((_, i) => (
                          <FaStar
                            key={i}
                            className={`text-lg ${
                              i < rating ? "text-primary" : "text-gray-300"
                            }`}
                          />
                        ))}
                      </div>
                      <div className="flex items-center gap-2">
                        <div className="w-32 h-[3px] bg-gray-300 relative rounded-full overflow-hidden">
                          <div
                            className="h-full bg-primary"
                            style={{
                              width: `${(totalReviews / 1) * 100}%`,
                            }}
                          ></div>
                        </div>
                        <span className="text-sm text-gray-700">
                          {totalReviews}
                        </span>
                      </div>
                    </div>
                  );
                })}
              </div>

              <div className="bg-gray-50 rounded-md p-6 shadow-sm">
                <div className="flex items-center gap-4 mb-2">
                  <img
                    src="/images/hero/slider1.png"
                    alt="User Profile"
                    className="w-14 h-14 rounded-full object-cover"
                  />
                  <div>
                    <h2 className="font-semibold text-gray-800 text-left">
                      Jeon Jungkook
                    </h2>
                    <div className="flex text-primary">
                      {[...Array(5)].map((_, i) => (
                        <FaStar key={i} />
                      ))}
                    </div>
                  </div>
                </div>
                <p className="text-gray-700 text-left mt-2 leading-relaxed">
                  Tahu Suzuka ini enak banget! Luar krispi, dalamnya lembut.
                  Cocok banget buat lauk harian. Udah sering repeat order 😍
                </p>
              </div>
            </div>

            {/* Produk Serupa */}
            <div className="bg-white rounded-md p-6">
              <h1 className="text-xl font-bold mb-4 text-center">
                Produk Serupa
              </h1>
              <div className="space-y-4">
                {[1, 2].map((_, idx) => (
                  <Card
                    key={idx}
                    name="Tahu Cibuntu"
                    image="/images/product/header.png"
                    rating={4}
                    price={12000}
                    showButton={false}
                    priceClassName="mx-auto"
                  />
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default DetailProductPage;
