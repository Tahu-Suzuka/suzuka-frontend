import React, { useEffect, useState } from "react";
import Wavify from "react-wavify";
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
    <div className="relative text-white mt-10">
      <Wavify
        fill="#dc2626"
        paused={true}
        options={{
          height: 50,
          amplitude: 50,
          speed: 0.2,
          points: 5,
        }}
        className="w-full block"
        style={{ display: "block", margin: 0, padding: 0 }}
      />

      <div className="bg-primary relative z-10 px-6 pt-10 pb-10 font-bebas font-normal tracking-wider">
        <img
          src="/images/footer/footer.png"
          alt="Tahu Suzuka"
          className="mx-auto w-48 h-44 lg:w-52 lg:h-44 rounded-full -mt-40 object-cover"
          style={{
            transform: `rotate(${rotation}deg)`,
            transition: "transform 0.1s linear",
          }}
        />

        <h1 className="mt-16 text-white text-xl lg:text-2xl max-w-2xl mx-6 lg:mx-12 leading-relaxed text-center lg:text-left">
          PESAN SEKARANG DAN NIKMATI BERBAGAI VARIAN TAHU KAMI YANG DIBUAT
          DENGAN BAHAN YANG BERKUALITAS DAN PROSES HIGIENIS CIRI KHAS BANDUNG
          CIBUNTU
        </h1>

        <div className="text-center lg:text-right mt-3 mx-9 lg:mx-12 lg:-mt-16">
          <Button
            text="Pesan Sekarang"
            width="w-40"
            py="py-2"
            bgColor="bg-white"
            textColor="text-black"
          />
        </div>

        <div className="mx-12">
          <hr className="border-white/40 mb-10 mt-3 lg:my-10 max-w-6xl" />
          <div className="flex flex-col sm:flex-row justify-between gap-5 lg:gap-8 text-left text-sm -mt-6">
            <div>
              <h1 className="font-semibold text-white mb-2 text-xl lg:text-2xl">
                INFORMASI UMUM
              </h1>
              <ul className="space-y-1 lg:text-base">
                <li>Tentang Kami</li>
                <li>Syarat dan Ketentuan</li>
                <li>Kebijakan Privasi</li>
              </ul>
            </div>
            <div>
              <h1 className="font-semibold text-white mb-2 text-xl lg:text-2xl">
                LOKASI
              </h1>
              <p className="lg:text-base">
                Jl. Cibuntu No. 123,
                <br />
                Bandung
              </p>
            </div>
            <div>
              <h1 className="font-semibold text-white mb-2 text-xl lg:text-2xl">
                KONTAK KAMI
              </h1>
              <p className="lg:text-base">
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
          className="absolute bottom-[550px] right-80 lg:bottom-40 lg:right-[250px] w-32 sm:w-40"
        />
        <img
          src="/images/footer/line2.png"
          alt="Line Right"
          className="absolute bottom-[50px] left-72 lg:bottom-[330px] lg:left-72  w-32 sm:w-40"
        />
      </div>
    </div>
  );
};

export default WaveFooter;
