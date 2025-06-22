import React, { useState } from "react";
import { FaTruck, FaTicketAlt } from "react-icons/fa";
import Button from "../components/atoms/Button";
import Header from "../components/atoms/Header";
import Card from "../components/atoms/Card";
import Review from "../components/atoms/Review";

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
    <div className="bg-[#F3F4F6]">
      <Header imageSrc="/images/product/header.png" title="Detail Produk" />

      <div className="px-6 lg:px-20 pb-40">
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
                <span key={i}>★</span>
              ))}
              <span className="text-sm text-black ml-1">3 Review</span>
            </div>

            <p className="text-gray-700 mb-4">
              Tahu kuning khas Cibuntu dengan tekstur lembut dan cita rasa
              gurih, cocok untuk digoreng atau dimasak dalam berbagai hidangan.
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
                <button onClick={handleDecrement} className="px-3 py-1 text-lg">
                  -
                </button>
                <span className="px-4 text-sm">{quantity}</span>
                <button onClick={handleIncrement} className="px-3 py-1 text-lg">
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
            <div className="flex items-center gap-2 text-sm text-gray-600">
              <FaTicketAlt className="text-lg text-secondary" />
              Anda dapat memasukan voucher diskon ataupun gratis ongkir
            </div>
          </div>
        </div>

        {/* SECTION ULASAN + PRODUK SERUPA */}
        <div className="max-w-6xl mx-auto grid grid-cols-1 lg:grid-cols-3 gap-6 mt-6">
          {/* Ulasan */}
          <div className="col-span-2">
            <Review />
          </div>

          {/* Produk Serupa */}
          <div className="bg-white rounded-md p-6 hidden lg:block self-start">
            <h1 className="text-xl font-bold text-center">Produk Serupa</h1>
            <div className="space-y-4">
              {[1, 2].map((_, idx) => (
                <Card
                  key={idx}
                  name="Tahu Cibuntu"
                  image="/images/product/header.png"
                  price={12000}
                  showButton={false}
                  showRating={false}
                  showHorizontalLayout={true}
                />
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default DetailProductPage;
