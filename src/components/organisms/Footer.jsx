import React, { useEffect, useState } from "react";
import Button from "../atoms/Button";

const WaveFooter = () => {
  const [rotation, setRotation] = useState(0);

  useEffect(() => {
    const handleScroll = () => {
      const scrollY = window.scrollY;
      setRotation(scrollY * 0.3);
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <div className="relative text-white">
      {/* --- [MODIFIKASI] Tambahkan margin-bottom negatif --- */}
      <div
        className="w-full block"
        style={{ lineHeight: "0", marginBottom: "-1px" }}
      >
        <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 1440 320">
          <path
            fill="#DC2626"
            fillOpacity="1"
            d="M0,96L30,106.7C60,117,120,139,180,170.7C240,203,300,245,360,245.3C420,245,480,203,540,208C600,213,660,267,720,261.3C780,256,840,192,900,170.7C960,149,1020,171,1080,192C1140,213,1200,235,1260,218.7C1320,203,1380,149,1410,122.7L1440,96L1440,320L1410,320C1380,320,1320,320,1260,320C1200,320,1140,320,1080,320C1020,320,960,320,900,320C840,320,780,320,720,320C660,320,600,320,540,320C480,320,420,320,360,320C300,320,240,320,180,320C120,320,60,320,30,320L0,320Z"
          ></path>
        </svg>
      </div>

      <div className="bg-primary relative lg:px-8 pt-10 pb-10 font-normal tracking-wider">
        <img
          src="/images/footer/footer.png"
          alt="Tahu Suzuka"
          className="mx-auto w-48 h-44 lg:w-52 lg:h-44 rounded-full -mt-40 object-cover relative z-30"
          style={{
            transform: `rotate(${rotation}deg)`,
            transition: "transform 0.1s linear",
          }}
        />
        <h1 className="mt-16 text-white text-lg lg:text-xl max-w-2xl mx-2 lg:mx-12 leading-relaxed text-center lg:text-left">
          PESAN SEKARANG DAN NIKMATI BERBAGAI VARIAN TAHU KAMI YANG DIBUAT
          DENGAN BAHAN YANG BERKUALITAS DAN PROSES HIGIENIS CIRI KHAS BANDUNG
          CIBUNTU
        </h1>
        <div className="text-center lg:text-right mt-3 mx-9 lg:mx-12 lg:-mt-16">
          <Button
            to="/product"
            text="Pesan Sekarang"
            width="w-40"
            bgColor="bg-white"
            textColor="text-black"
            className="rounded-xl py-2"
          />
        </div>
        <div className="mx-7 lg:mx-12">
          <hr className="border-white/40 mb-10 mt-3 lg:my-10 max-w-7xl" />
          <div className="flex flex-col sm:flex-row justify-between gap-5 lg:gap-8 text-left text-sm -mt-6">
            <div>
              <h1 className="font-semibold text-white mb-2 text-lg lg:text-xl">
                INFORMASI UMUM
              </h1>
              <ul className="space-y-1 text-sm lg:text-base">
                <li>Tentang Kami</li>
                <li>Syarat dan Ketentuan</li>
                <li>Kebijakan Privasi</li>
              </ul>
            </div>
            <div>
              <h1 className="font-semibold text-white mb-2 text-lg lg:text-xl">
                LOKASI
              </h1>
              <p className="text-sm lg:text-base">
                Jl. Cibuntu No. 123,
                <br />
                Bandung
              </p>
            </div>
            <div>
              <h1 className="font-semibold text-white mb-2 text-lg lg:text-xl">
                KONTAK KAMI
              </h1>
              <p className="text-sm lg:text-base">
                08xxxxxxxxx
                <br />
                tahusuzuka@gmail.com
              </p>
            </div>
          </div>
        </div>
        <div className="text-center text-sm text-white/80 mt-10 lg:mt-7">
          Copyright © Tahu Suzuka 2025
        </div>
        <img
          src="/images/footer/line1.png"
          alt="Line Left"
          className="absolute bottom-[550px] right-80 lg:bottom-40 lg:right-[250px] w-32 sm:w-40 z-20"
        />
        <img
          src="/images/footer/line2.png"
          alt="Line Right"
          className="absolute bottom-[50px] left-72 lg:bottom-[330px] lg:left-72 w-32 sm:w-40 z-20"
        />
      </div>
    </div>
  );
};

export default WaveFooter;
