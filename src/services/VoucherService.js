import axios from "axios";
import { API_URL } from "./API";

export const VoucherService = {
  getAll: async (token) => {
    const res = await axios.get(`${API_URL}/vouchers`, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
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
};
