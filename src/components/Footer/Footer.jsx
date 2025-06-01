import React from "react";
import Wavify from "react-wavify";
import Button from "../ui/button/Button";

const WaveFooter = () => {
  return (
    <div className="relative text-white">
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

      <div className="bg-red-600 relative z-10 px-6 pt-10 pb-10 -mt-1 font-bebas font-normal tracking-wider">
        <img
          src="/images/footer/footer.png"
          alt="Tahu Suzuka"
          className="mx-auto w-32 h-32 rounded-full -mt-40 object-cover"
        />

        <p className="mt-16 text-white text-xl lg:text-2xl max-w-2xl mx-12 leading-relaxed text-left">
          PESAN SEKARANG DAN NIKMATI BERBAGAI VARIAN
          <br /> TAHU KAMI YANG DIBUAT DENGAN BAHAN YANG
          <br /> BERKUALITAS DAN PROSES HIGIENIS CIRI KHAS
          <br /> BANDUNG CIBUTU
        </p>

        <div className="text-right mx-12 -mt-6 lg:-mt-16">
          <Button
            type="submit"
            text="Pesan Sekarang"
            width="w-32"
            py="py-2"
            bgColor="bg-white"
            textColor="text-primary"
          />
        </div>

        <div className="mx-12 ">
          <hr className="border-white/40 mb-10 mt-3 lg:my-10 max-w-6xl" />
          <div className="flex flex-col sm:flex-row justify-between gap-8 text-left text-sm -mt-6">
            <div>
              <h4 className="font-semibold text-white mb-2 text-xl lg:text-2xl">
                INFORMASI UMUM
              </h4>
              <ul className="space-y-1 lg:text-base">
                <li>Tentang Kami</li>
                <li>Syarat dan Ketentuan</li>
                <li>Kebijakan Privasi</li>
              </ul>
            </div>
            <div>
              <h4 className="font-semibold text-white mb-2 text-xl lg:text-2xl">
                LOKASI
              </h4>
              <p className="lg:text-base">
                Jl. Cibuntu No. 123,
                <br />
                Bandung
              </p>
            </div>
            <div>
              <h4 className="font-semibold text-white mb-2 text-xl lg:text-2xl">
                KONTAK KAMI
              </h4>
              <p className="lg:text-base">
                08xxxxxxxxx
                <br />
                tahusuzuka@gmail.com
              </p>
            </div>
          </div>
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
