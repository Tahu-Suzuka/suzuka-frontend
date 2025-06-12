import React from "react";
import Header from "../components/ui/header/Header";
import { FaStar } from "react-icons/fa";

const products = [
  {
    name: "Tahu Kuning",
    image: "/images/hero/slider1.png",
    price: 12000,
    originalPrice: 15000,
    rating: 5,
  },
  {
    name: "Tahu Putih",
    image: "/images/hero/slider2.png",
    price: 10000,
    originalPrice: 13000,
    rating: 4,
  },
  {
    name: "Tahu Stik",
    image: "/images/hero/slider3.png",
    price: 14000,
    originalPrice: 16000,
    rating: 5,
  },
];

const ProductPage = () => {
  return (
    <div>
      <Header imageSrc="/images/product/Header.png" title="Produk" />
      <div className="lg:px-20 md:p-12 lg:p-16 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-10">
        {products.map((product, index) => (
          <div
            key={index}
            className="bg-white rounded-xl shadow-md overflow-hidden text-center"
          >
            <img
              src={product.image}
              alt={product.name}
              className="w-full h-48 object-cover block rounded-t-xl"
            />
            <div className="p-4">
              <h2 className="text-xl lg:text-2xl font-semibold lg:font-bold">
                {product.name}
              </h2>
              <div className="flex justify-center mt-2 text-primary">
                {Array(product.rating)
                  .fill()
                  .map((_, i) => (
                    <FaStar key={i} />
                  ))}
              </div>
              <div className="mt-4 flex justify-between items-center">
                <div className="text-left">
                  <p className="text-gray-400 text-sm line-through">
                    Rp. {product.originalPrice.toLocaleString("id-ID")}
                  </p>
                  <p className="text-red-500 font-semibold text-lg">
                    Rp. {product.price.toLocaleString("id-ID")}
                  </p>
                </div>
                <button className="bg-primary hover:bg-yellow-500 text-white px-4 py-2 rounded-md font-semibold text-sm">
                  Masukkan Keranjang
                </button>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default ProductPage;
