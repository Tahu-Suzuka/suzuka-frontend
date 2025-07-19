import axios from "axios";
import { API_URL } from "./API";

export const ReportService = {
  getProcessingData: async () => {
    const token = localStorage.getItem("token");
    const response = await axios.get(`${API_URL}/reports/processing`, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
    return response.data;
  },

  downloadProcessingPDF: async () => {
    const token = localStorage.getItem("token");
    const response = await axios.get(`${API_URL}/reports/processing/pdf`, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
      responseType: "blob",
    });
    return response.data;
  },

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

  downloadMonthlySalesPDF: async () => {
    const token = localStorage.getItem("token");
    const response = await axios.get(`${API_URL}/reports/product-sales/pdf`, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
      params: {
        period: "month",
      },
      responseType: "blob",
    });
    return response.data;
  },

  getProductSalesYearly: async (page = 1) => {
    const token = localStorage.getItem("token");
    const response = await axios.get(`${API_URL}/reports/product-sales`, {
      headers: { Authorization: `Bearer ${token}` },
      params: { period: "month", page, limit: 20 }, // Sesuai backend default limit 5
    });
    return response.data;
  },
};
