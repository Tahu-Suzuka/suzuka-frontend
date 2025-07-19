import React from "react";
import { Link } from "react-router-dom";
import { LazyLoadImage } from "react-lazy-load-image-component";
import "react-lazy-load-image-component/src/effects/blur.css";

const AboutShort = () => {
  return (
    <div className="px-6 lg:px-16 relative overflow-hidden">
      <div className="flex flex-col lg:flex-row items-center gap-8 relative z-10">
        <div className="relative w-full lg:w-[40%]">
          {/* Blob */}
          <LazyLoadImage
            src="/images/about/blob.png"
            alt="Blob"
            className="absolute w-[82%] z-0 pointer-events-none hidden lg:block"
            effect="blur"
          />

          <LazyLoadImage
            src="/images/about/short.png"
            alt="Tentang Kami"
            className="relative z-10 w-92 h-72 object-cover hidden lg:block"
            effect="blur"
          />
        </div>

        <div className="lg:w-[65%]">
          <h5 className="text-primary text-sm font-bold uppercase mb-2">
            Tentang Kami
          </h5>
          <h2 className="text-2xl lg:text-3xl font-bold mb-4">
            Dari Cibuntu, untuk Anda.
          </h2>
          <p className="text-sm lg:text-base leading-relaxed text-gray-700 text-justify ">
            Suzuka (Tahu Susu Keju) didirikan pada tahun 1983 di Cibuntu,
            Bandung dengan misi menghadirkan produk tahu berkualitas tinggi
            dengan cita rasa yang khas. Dengan resep turun temurun dan proses
            produksi yang higienis, kami berkomitmen untuk menyajikan produk
            tahu yang tidak hanya enak tetapi juga sehat untuk dikonsumsi
            seluruh keluarga. Saat ini, Suzuka telah berkembang menjadi salah
            satu produsen tahu terkemuka di Bandung dengan berbagai varian
            produk yang disukai oleh konsumen dari berbagai kalangan.
          </p>

          <Link
            to="/about"
            className="inline-block mt-4 text-primary underline text-sm font-semibold"
          >
            Lihat Selengkapnya...
          </Link>
        </div>
      </div>
    </div>
  );
};

export default AboutShort;
