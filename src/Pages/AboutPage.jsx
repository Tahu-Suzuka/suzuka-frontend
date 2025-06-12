import React from "react";
import Wavify from "react-wavify";
import Header from "../components/ui/header/Header";

const AboutPage = () => {
  return (
    <div>
      <Header imageSrc="/images/about/header.png" title="Tentang Kami" />

      <div className="relative bg-red-600 text-white text-center px-6 pt-10 pb-32">
        <div className="max-w-4xl mx-auto">
          <h1 className="text-2xl lg:text-4xl font-bold mb-6">
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
    </div>
  );
};

export default AboutPage;
