import { FaBox, FaUsers, FaStar } from "react-icons/fa";
import { IoStatsChart } from "react-icons/io5";
import { TbFileInvoice } from "react-icons/tb";
import Chart from "../../atoms/Chart";
import Stat from "../../atoms/Stat";
import OrderTable from "../../organisms/dashboard/OrderTable";

const DashboardContent = () => {
  return (
    <div className="space-y-6">
      <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
        <Stat
          title="Penjualan Hari Ini"
          value="24"
          icon={<IoStatsChart className="text-3xl text-primary" />}
        />
        <Stat
          title="Jumlah Pesanan"
          value="120"
          icon={<TbFileInvoice className="text-3xl text-primary" />}
        />
        <Stat
          title="Ulasan"
          value="65"
          icon={<FaStar className="text-3xl text-primary" />}
        />
        <Stat
          title="Jumlah Pelanggan"
          value="65"
          icon={<FaUsers className="text-3xl text-primary" />}
        />
      </div>

      {/* Grafik dan Tabel */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <div className="bg-white p-6 rounded-lg shadow">
          <h2 className="text-lg font-bold text-gray-800 mb-4">
            Grafik Penjualan Mingguan
          </h2>
          <Chart />
        </div>

        <div className="bg-white p-6 rounded-lg shadow">
          <h2 className="text-lg font-bold text-gray-800 mb-4">
            Daftar Pesanan
          </h2>
          <OrderTable showDate={false} showAction={false} />
        </div>
      </div>
    </div>
  );
};

export default DashboardContent;
