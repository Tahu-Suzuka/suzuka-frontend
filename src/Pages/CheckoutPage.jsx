import React from "react";
import { FaTicketAlt } from "react-icons/fa";
import { FaLocationDot } from "react-icons/fa6";
import Button from "../components/atoms/Button";

const CheckoutPage = () => {
  const products = [
    {
      id: 1,
      name: "Tahu Kuning",
      size: "Besar",
      price: 14000,
      quantity: 5,
      image: "/images/hero/slider1.png",
    },
    {
      id: 2,
      name: "Tahu Kuning",
      size: "Kecil",
      price: 12000,
      quantity: 5,
      image: "/images/hero/slider1.png",
    },
    {
      id: 3,
      name: "Tahu Putih",
      size: "Besar",
      price: 14000,
      quantity: 5,
      image: "/images/hero/slider1.png",
    },
  ];

  const subtotal = products.reduce((acc, p) => acc + p.price * p.quantity, 0);

  const serviceFee = 4000;
  const discount = 0;
  const total = subtotal + serviceFee - discount;

  return (
    <div>
      <div className="max-w-6xl mx-auto p-4 space-y-6">
        {/* Alamat */}
        <div className="bg-white p-4 rounded-lg shadow">
          <h2 className="text-primary font-bold mb-2 flex items-center gap-2">
            <FaLocationDot className="text-xl" />
            Alamat Penerima
          </h2>
          <div className="flex flex-col gap-2 border-t pt-2 text-sm text-gray-700">
            <div className="flex flex-col lg:flex-row justify-between lg:items-start">
              {/* Nama dan Telepon */}
              <div className="flex flex-row lg:flex-col gap-1">
                <p className="font-semibold">Jhon Doe</p>
                <p>(+6281222244412)</p>
              </div>

              {/* Alamat */}
              <p className="mt-1 lg:mt-0 lg:text-right lg:max-w-xs break-words">
                Jl. Dr. Setiabudi No.193, Gegerkalong, Kec. Sukasari, Kota
                Bandung, Jawa Barat 40153
              </p>
            </div>
          </div>
        </div>

        {/* Produk */}
        <div className="bg-white p-4 rounded-lg shadow">
          <h2 className="font-bold mb-4">Produk Dipesan</h2>

          {/* Header */}
          <div className="hidden lg:flex justify-end text-sm text-gray-600 font-medium pr-5 gap-9 mb-2">
            <div className="w-[100px] text-center">Harga Satuan</div>
            <div className="w-[60px] text-center">Jumlah</div>
            <div className="w-[120px] text-right">Subtotal Produk</div>
          </div>

          <div className="space-y-2 text-sm text-gray-600">
            {products.map((item, index) => (
              <div
                key={item.id}
                className={`flex justify-between items-center p-3 rounded ${
                  index % 2 === 1 ? "bg-gray-50" : "bg-white"
                }`}
              >
                {/* Gambar dan Info Produk */}
                <div className="flex items-center gap-4">
                  <img
                    src={item.image}
                    alt={item.name}
                    className="w-12 h-12 lg:w-24 lg:h-20 object-cover rounded"
                  />

                  <div>
                    <p className="font-semibold">{item.name}</p>
                    {/*  mobile */}
                    <div className="block lg:hidden text-sm text-gray-500">
                      Ukuran Tahu : {item.size}
                    </div>
                  </div>
                </div>

                {/*  desktop */}
                <div className="hidden lg:block lg:w-[130px] text-center text-gray-600">
                  Ukuran Tahu : {item.size}
                </div>

                <div className="flex items-center gap-8 pr-4">
                  <div className="lg:w-[100px] text-center">
                    Rp {item.price.toLocaleString("id-ID")}
                  </div>
                  <div className="lg:w-[60px] text-center">
                    {item.quantity}x
                  </div>
                  <div className="hidden lg:block lg:w-[120px] text-right font-semibold text-gray-800">
                    Rp {(item.price * item.quantity).toLocaleString("id-ID")}
                  </div>
                </div>
              </div>
            ))}
          </div>

          <hr className="my-4" />

          <p className="text-right font-semibold text-sm lg:text-base">
            Total Pesanan ({products.length} Produk):{" "}
            <span className="text-primary">
              Rp{subtotal.toLocaleString("id-ID")}
            </span>
          </p>
        </div>

        {/* Wrapper  */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {/* Voucher */}
          <div className="bg-white p-4 rounded-lg shadow space-y-4 h-fit">
            <h2 className="text-primary font-semibold flex items-center gap-2">
              <FaTicketAlt /> Voucher
            </h2>
            <div className="flex flex-col md:flex-row items-stretch md:items-center gap-3">
              <input
                type="text"
                placeholder="Masukan kode voucher anda disini"
                className="border w-full px-4 py-2 rounded text-sm"
              />
              <div className="flex justify-end items-end ">
                <Button
                  to="/"
                  text="Gunakan Voucher"
                  width="lg:w-56"
                  className="rounded-md px-6 text-sm py-2"
                />
              </div>
            </div>
          </div>
          {/* Ringkasan Pembayaran) */}
          <div className="bg-white p-4 rounded-lg shadow flex flex-col justify-between">
            <div className="space-y-2 text-xs lg:text-sm text-gray-700">
              <div className="flex justify-between">
                <span>Subtotal Pesanan</span>
                <span>Rp{subtotal.toLocaleString("id-ID")}</span>
              </div>
              <div className="flex justify-between">
                <span>Subtotal Pengiriman</span>
                <span>Rp0</span>
              </div>
              <div className="flex justify-between">
                <span>Biaya Layanan</span>
                <span>Rp{serviceFee.toLocaleString("id-ID")}</span>
              </div>
              <div className="flex justify-between">
                <span>Total Diskon</span>
                <span>Rp{discount.toLocaleString("id-ID")}</span>
              </div>
              <hr />
              <div className="flex justify-between font-semibold text-base lg:text-lg text-red-600">
                <span>Total Pembayaran</span>
                <span>Rp{total.toLocaleString("id-ID")}</span>
              </div>
            </div>

            <div className="flex justify-end items-end pt-4">
              <Button
                to="/"
                text="Lanjutkan Pembayaran"
                width="w-44 lg:w-52"
                className="rounded-md text-sm py-2"
              />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CheckoutPage;
