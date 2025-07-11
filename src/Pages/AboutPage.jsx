import React from "react";
import Wavify from "react-wavify";
import Header from "../components/atoms/Header";
import { LazyLoadImage } from "react-lazy-load-image-component";
import "react-lazy-load-image-component/src/effects/blur.css";

const AboutPage = () => {
  return (
    <div>
      <Header imageSrc="/images/about/header.png" title="Tentang Kami" />

      <div className="relative bg-red-600 text-white text-center pt-10 pb-32">
        <div className="max-w-4xl mx-auto">
          <h1 className="text-xl lg:text-3xl font-bold mb-6">
            Perjalanan Kami dalam pembuatan Tahu Tradisional di Cibuntu Sejak
            Tahun 1983
          </h1>
          <p className="text-sm lg:text-base leading-relaxed mb-10">
            Dimulai dari usaha pembuatan Tahu secara tradisional di rumah dengan
            resep turun temurun dan proses produksi yang higienis, kami
            berkomitmen untuk menyajikan produk tahu yang tidak hanya enak
            tetapi juga sehat untuk dikonsumsi seluruh keluarga.
            <br className="hidden" />
            Kini kami memiliki industri tahu tradisional khas Bandung di Sentra
            Tahu Cibuntu.
          </p>

          <div className="grid grid-cols-2 gap-8 max-w-md mx-auto">
            <div>
              <h1 className="text-4xl font-bold">+40</h1>
              <p className="text-sm mt-2">Tahun Pengalaman</p>
            </div>
            <div>
              <h1 className="text-4xl font-bold">10.000+</h1>
              <p className="text-sm mt-2">Tahu yang sudah dibuat</p>
            </div>
          </div>
        </div>

        <div className="absolute bottom-[-1px] left-0 w-full leading-none">
          <Wavify
            fill="#ffffff"
            paused={true}
            options={{
              height: 60,
              amplitude: 90,
              speed: 0.2,
              points: 3,
            }}
            className="w-full"
          />
        </div>
      </div>

      {/* Sejarah Pemilik */}
      <div className="bg-white mt-10 px-6 lg:px-24">
        <div className="grid grid-cols-1 lg:grid-cols-2 items-start gap-8">
          <div className="flex flex-col items-center lg:items-start">
            <LazyLoadImage
              src="/images/home/pemilik.jpg"
              alt="Pendiri Tahu Suzuka"
              className="w-60 sm:w-72 lg:w-80 h-auto object-cover rounded-xl shadow-lg"
              effect="blur"
            />
            <p className="mt-3 text-sm text-gray-500 italic text-center lg:text-left">
              Bapak H. Ade Anwar Sanusi, Pendiri Tahu Suzuka
            </p>
          </div>

          <div className="text-justify">
            <h2 className="text-2xl lg:text-3xl font-bold text-red-600 mb-6 text-center lg:text-left">
              Sejarah Pemilik & Perjalanan Nama Tahu Suzuka
            </h2>

            {/* Timeline */}
            <div className="space-y-6 text-sm text-gray-700 leading-relaxed">
              {/* 1985 */}
              <div className="flex items-start gap-3">
                <div className="text-red-600 text-xl font-bold shrink-0 min-w-[50px]">
                  1985
                </div>
                <p>
                  Tahu Suzuka pertama kali berdiri dengan nama{" "}
                  <strong>Tahu HD</strong>, didirikan oleh{" "}
                  <strong>Bapak H. Ade Anwar Sanusi</strong>. Mengusung cara
                  produksi tradisional dari resep keluarga, usaha ini bermula
                  dari skala rumahan di Cibuntu.
                </p>
              </div>

              {/* 2017 */}
              <div className="flex items-start gap-3">
                <div className="text-red-600 text-xl font-bold shrink-0 min-w-[50px]">
                  2017
                </div>
                <p>
                  Kepemimpinan dilanjutkan oleh <strong>putra keenam</strong>{" "}
                  beliau. Saat itulah nama <strong>Tahu Suzuka</strong>{" "}
                  diperkenalkan — singkatan dari <em>Tahu Susu</em>,{" "}
                  <em>Kezu</em>, dan <em>Kacang Kedelai</em>, sebagai identitas
                  baru yang tetap menjaga akar tradisi.
                </p>
              </div>

              {/* 2025 */}
              <div className="flex items-start gap-3">
                <div className="text-red-600 text-xl font-bold shrink-0 min-w-[50px]">
                  2025
                </div>
                <p>
                  Tahun ini, Tahu Suzuka menghadirkan{" "}
                  <strong>platform pemesanan online</strong>, memperluas
                  distribusi ke luar kota, dan mulai masuk ke pasar retail
                  modern. Kami terus berkembang tanpa meninggalkan nilai
                  tradisional.
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>

      <div className=" bg-primary p-8 mt-20">
        <div className="flex flex-col lg:flex-row items-center lg:items-start justify-between gap-12">
          <div className="flex-1 relative w-full flex justify-center lg:justify-start">
            <div className="relative z-10 w-72 h-72 lg:w-96 lg:h-96 left-0 lg:left-6">
              <LazyLoadImage
                src="/images/home/bg-tahu-2.png"
                alt="background"
                effect="blur"
              />
              <div className="absolute top-24 lg:top-28 -left-4 lg:left-8">
                <LazyLoadImage
                  src="/images/home/tahu-putih.png"
                  alt="Tahu Putih"
                  className="w-24 lg:w-32 h-auto object-cover"
                  effect="blur"
                />
              </div>
              <div className="absolute top-14 right-24 ">
                <LazyLoadImage
                  src="/images/home/tahu-kuning.png"
                  alt="Tahu Kuning"
                  className="w-24 lg:w-32 h-auto object-cover"
                  effect="blur"
                />
              </div>

              <div className="absolute top-40 lg:top-44 right-16 lg:right-14">
                <LazyLoadImage
                  src="/images/home/tahu-hijau.png"
                  alt="Tahu Hijau"
                  className="w-24 lg:w-32 h-auto object-cover"
                  effect="blur"
                />
              </div>

              <div className="absolute bottom-2 lg:bottom-8 left-2 lg:left-16">
                <LazyLoadImage
                  src="/images/home/tahu-pedas.png"
                  alt="Tahu Pedas"
                  className="w-24 lg:w-32 h-auto object-cover"
                  effect="blur"
                />
              </div>
            </div>
          </div>

          <div className="flex-1 w-full px-4 lg:px-16">
            <h1 className="text-white text-2xl lg:text-3xl font-bold mb-8 text-center lg:text-left">
              Mengapa harus membeli Tahu dari Suzuka?
            </h1>
            <div className="space-y-4">
              <div className="bg-white rounded-lg p-4 flex items-center space-x-4">
                <LazyLoadImage
                  src="/images/home/tahu-kuning.png"
                  alt="Tahu Kuning Icon"
                  className="w-10 lg:w-12 h-auto object-cover"
                  effect="blur"
                />
                <div>
                  <h3 className="text-base lg:text-lg font-bold text-gray-800">
                    Khas Bandung Cibuntu
                  </h3>
                  <p className="text-sm text-gray-600">
                    Tahu kami dibuat dengan tradisional dan asli khas Bandung
                    Cibuntu.
                  </p>
                </div>
              </div>
              <div className="bg-white rounded-lg p-4 flex items-center space-x-4">
                <LazyLoadImage
                  src="/images/home/tahu-hijau.png"
                  alt="Tahu Hijau Icon"
                  className="w-10 lg:w-12 h-auto object-cover"
                  effect="blur"
                />
                <div>
                  <h3 className="text-base lg:text-lg font-bold text-gray-800">
                    Gratis Ongkir
                  </h3>
                  <p className="text-sm text-gray-600">
                    Dapatkan gratis ongkir menggunakan voucher.
                  </p>
                </div>
              </div>
              <div className="bg-white rounded-lg p-4 flex items-center space-x-4">
                <LazyLoadImage
                  src="/images/home/tahu-pedas.png"
                  alt="Tahu Pink Icon"
                  className="w-10 lg:w-12 h-auto object-cover"
                  effect="blur"
                />
                <div>
                  <h3 className="text-base lg:text-lg font-bold text-gray-800">
                    100% Tanpa Pengawet
                  </h3>
                  <p className="text-sm text-gray-600">
                    Tahu yang kami buat 100% menggunakan bahan alami tanpa bahan
                    pengawet.
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      <div className="pt-20 pb-20 mb-10 bg-gray-100 p-8">
        <div className="max-w-6xl mx-auto">
          <div className="flex flex-col lg:flex-row items-center lg:items-start justify-between gap-8">
            <div className="flex-1 relative w-full flex justify-center lg:justify-start">
              <div className="absolute left-16 lg:left-10 inset-0 bg-primary rounded-lg blur-xl opacity-80 w-72 h-80 lg:w-80 lg:h-96"></div>

              <div className="relative z-10 p-8 left-0 lg:left-10">
                <LazyLoadImage
                  src="/images/home/tahu-2.png"
                  alt="Tahu dalam mangkuk"
                  className="w-52 h-72 lg:w-64 lg:h-80 object-cover rounded-lg shadow-lg"
                  effect="blur"
                />
              </div>
            </div>
            <div className="flex-1 px-2 lg:px-10">
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                <div className="bg-white border-2 border-dashed border-red-300 rounded-lg p-6">
                  <h3 className="text-red-500 text-lg font-bold mb-3">
                    Kualitas
                  </h3>
                  <p className="text-gray-700 text-sm leading-relaxed">
                    Dibuat dengan resep turun temurun sehingga terjaga kualitas
                    dan keaslian dari Tahu Cibuntu tanpa bahan pengawet
                  </p>
                </div>
                <div className="bg-white border-2 border-dashed border-red-300 rounded-lg p-6">
                  <h3 className="text-red-500 text-lg font-bold mb-3">
                    Higienis
                  </h3>
                  <p className="text-gray-700 text-sm leading-relaxed">
                    Produk tahu yang kami berikan kepada pelanggan menggunakan
                    plastik untuk menjaga ke higienisannya
                  </p>
                </div>
                <div className="bg-white border-2 border-dashed border-red-300 rounded-lg p-6">
                  <h3 className="text-red-500 text-lg font-bold mb-3">
                    Business to Business
                  </h3>
                  <p className="text-gray-700 text-sm leading-relaxed">
                    Kami menyediakan kebutuhan untuk usaha dan kebutuhan bahan
                    pokok untuk sebuah acara dan memberikan fasilitas pesan
                    antar
                  </p>
                </div>
                <div className="bg-white border-2 border-dashed border-red-300 rounded-lg p-6">
                  <h3 className="text-red-500 text-lg font-bold mb-3">
                    Tradisional
                  </h3>
                  <p className="text-gray-700 text-sm leading-relaxed">
                    Dengan resep yang turun temurun sejak 1983 kami tetap
                    menjaga kualitas dan cara pembuatan tahu secara tradisional
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
      <div className="bg-white mb-32 px-4 sm:px-6 lg:px-20 py-20">
        <div className="max-w-6xl mx-auto text-center">
          <h2 className="text-2xl lg:text-3xl font-bold text-red-600 mb-10">
            Proses Pembuatan Tahu Tradisional Kami
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 text-left">
            {/* 1. Perendaman Kedelai */}
            <div className="bg-white rounded-xl shadow p-6">
              <h3 className="text-lg font-bold text-red-500 mb-2">
                1. Perendaman Kedelai
              </h3>
              <p className="text-sm text-gray-700">
                Kedelai direndam selama kurang lebih <strong>3 jam</strong>{" "}
                untuk melunakkan biji, sehingga lebih mudah diolah pada tahap
                berikutnya.
              </p>
            </div>

            {/* 2. Penggilingan Kedelai */}
            <div className="bg-white rounded-xl shadow p-6">
              <h3 className="text-lg font-bold text-red-500 mb-2">
                2. Penggilingan Kedelai
              </h3>
              <p className="text-sm text-gray-700">
                Kedelai yang sudah lunak digiling bersama air hingga membentuk
                bubur kedelai yang halus.
              </p>
            </div>

            {/* 3. Pemasakan */}
            <div className="bg-white rounded-xl shadow p-6">
              <h3 className="text-lg font-bold text-red-500 mb-2">
                3. Pemasakan
              </h3>
              <p className="text-sm text-gray-700">
                Bubur kedelai dimasak selama <strong>15–20 menit</strong> hingga
                matang dan siap untuk disaring.
              </p>
            </div>

            {/* 4. Penyaringan */}
            <div className="bg-white rounded-xl shadow p-6">
              <h3 className="text-lg font-bold text-red-500 mb-2">
                4. Penyaringan
              </h3>
              <p className="text-sm text-gray-700">
                Cairan hasil masakan disaring menggunakan kain khusus untuk
                mendapatkan susu kedelai murni.
              </p>
            </div>

            {/* 5. Pencetakan */}
            <div className="bg-white rounded-xl shadow p-6">
              <h3 className="text-lg font-bold text-red-500 mb-2">
                5. Pencetakan Tahu
              </h3>
              <p className="text-sm text-gray-700">
                Gumpalan hasil pengolahan susu kedelai yang terbentuk dituangkan
                ke cetakan dan dipadatkan untuk membentuk tahu.
              </p>
            </div>

            {/* 6. Pemotongan & Pengemasan */}
            <div className="bg-white rounded-xl shadow p-6">
              <h3 className="text-lg font-bold text-red-500 mb-2">
                6. Pemotongan & Pengemasan
              </h3>
              <p className="text-sm text-gray-700">
                Setelah didinginkan, tahu dipotong sesuai ukuran, dibungkus
                plastik higienis, dan siap didistribusikan.
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AboutPage;
