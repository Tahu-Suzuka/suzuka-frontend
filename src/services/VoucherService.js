import axios from "axios";
import { API_URL } from "./API";

export const VoucherService = {
  getAll: async () => {
    const token = localStorage.getItem("token");
    if (!token) {
      throw new Error("Token tidak ditemukan, silakan login kembali.");
    }
    const res = await axios.get(`${API_URL}/vouchers`, {
      headers: { Authorization: `Bearer ${token}` },
    });
    return res.data.data;
  },

  getById: async (id, token) => {
    const res = await axios.get(`${API_URL}/vouchers/${id}`, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
    return res.data.data;
  },

  create: async (voucherData, token) => {
    const res = await axios.post(`${API_URL}/vouchers`, voucherData, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
    return res.data;
  },

  update: async (id, updateData, token) => {
    const res = await axios.put(`${API_URL}/vouchers/${id}`, updateData, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
    return res.data;
  },

  delete: async (id, token) => {
    const res = await axios.delete(`${API_URL}/vouchers/${id}`, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
    return res.data;
  },

  applyVoucher: async (code) => {
    const token = localStorage.getItem("token");
    if (!token) throw new Error("Anda harus login untuk menggunakan voucher.");

    try {
      const response = await axios.post(
        `${API_URL}/vouchers/apply`,
        { code },
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );
      return response.data;
    } catch (error) {
      throw new Error(error?.response?.data?.message || "Voucher tidak valid.");
    }
  },
};
