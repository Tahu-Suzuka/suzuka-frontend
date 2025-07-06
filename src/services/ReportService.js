import axios from "axios";
import { API_URL } from "./API";

export const ReportService = {
  // ✅ Ambil data pesanan yang sedang diproses (bukan PDF)
  getProcessingData: async () => {
    const token = localStorage.getItem("token");
    const response = await axios.get(`${API_URL}/reports/processing`, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
    return response.data;
  },

  // ✅ Download PDF laporan pesanan "Diproses"
  downloadProcessingPDF: async () => {
    const token = localStorage.getItem("token");
    const response = await axios.get(`${API_URL}/reports/processing/pdf`, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
      responseType: "blob", // penting agar axios baca sebagai file
    });
    return response.data; // blob
  },

  // ✅ Ambil data laporan penjualan produk per bulan
  getMonthlySalesData: async () => {
    const token = localStorage.getItem("token");
    const response = await axios.get(`${API_URL}/reports/product-sales`, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
      params: {
        period: "month",
      },
    });
    return response.data;
  },

  // ✅ Download PDF laporan penjualan produk per bulan
  downloadMonthlySalesPDF: async () => {
    const token = localStorage.getItem("token");
    const response = await axios.get(`${API_URL}/reports/product-sales/pdf`, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
      params: {
        period: "month",
      },
      responseType: "blob", // untuk file
    });
    return response.data; // blob
  },
};
