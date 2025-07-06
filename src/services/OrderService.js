import axios from "axios";
import { API_URL } from "./API";

export const OrderService = {
  createManualOrder: async (data, token) => {
    try {
      const response = await axios.post(`${API_URL}/orders/manual`, data, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      return response.data;
    } catch (error) {
      throw new Error(
        error?.response?.data?.message || "Gagal mengirim pesanan manual"
      );
    }
  },

  getAll: async ({ page = 1, status = "" }) => {
    const token = localStorage.getItem("token");
    const response = await axios.get(`${API_URL}/orders/all`, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
      params: {
        page,
        status,
      },
    });
    return response.data;
  },

  getById: async (id) => {
    const token = localStorage.getItem("token");
    const response = await axios.get(`${API_URL}/orders/${id}`, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
    return response.data;
  },

  // OrderService.js
  getByIdAdmin: async (id) => {
    return axios.get(`${API_URL}/orders/all/${id}`, {
      headers: {
        Authorization: `Bearer ${localStorage.getItem("token")}`,
      },
    });
  },

  updateStatus: async (id, status) => {
    const token = localStorage.getItem("token");
    const response = await axios.patch(
      `${API_URL}/orders/${id}/status`,
      { status },
      {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      }
    );
    return response.data;
  },

  getAllOrders: async () => {
    const token = localStorage.getItem("token");
    const response = await axios.get(`${API_URL}/orders/all`, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
      params: {
        limit: 5, // bisa diubah sesuai kebutuhan
      },
    });
    return response.data;
  },

  getByCustomer: async () => {
    const token = localStorage.getItem("token");
    const response = await axios.get(`${API_URL}/orders`, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
    return response.data;
  },

  getDashboardStats: async () => {
    const token = localStorage.getItem("token");
    const response = await axios.get(`${API_URL}/orders/stats`, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
    return response.data;
  },
};
