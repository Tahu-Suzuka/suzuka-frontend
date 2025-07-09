import axios from "axios";
import { API_URL } from "./API";
import { getAuthToken } from "./getAuthToken";

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

  getAllOrders: async () => {
    const token = localStorage.getItem("token");
    const response = await axios.get(`${API_URL}/orders/all`, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
      params: {
        limit: 5,
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

  getByIdAdmin: async (id) => {
    const token = localStorage.getItem("token");
    const response = await axios.get(`${API_URL}/orders/all/${id}`, {
      headers: {
        Authorization: `Bearer ${token}`,
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

  createFromCart: async () => {
    const token = localStorage.getItem("token");
    const response = await axios.post(
      `${API_URL}/orders/from-cart`,
      {},
      {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      }
    );
    return response.data;
  },

  createBuyNowOrder: async (payload) => {
    const token = localStorage.getItem("token");
    const response = await axios.post(`${API_URL}/orders`, payload, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
    return response.data;
  },

  createPayment: async (orderId) => {
    const token = localStorage.getItem("token");
    const response = await axios.post(
      `${API_URL}/orders/${orderId}/create-payment`,
      {},
      {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      }
    );
    return response.data;
  },

  updateUserStatus: async (orderId, status) => {
    const token = localStorage.getItem("token"); // Ambil token dari localStorage

    const res = await axios.patch(
      `${API_URL}/orders/${orderId}/user-status`,
      { status }, // ✅ kirim body: { status: "Selesai" }
      {
        headers: {
          Authorization: `Bearer ${token}`, // ✅ kirim token
          "Content-Type": "application/json", // opsional, tapi baik ditambahkan
        },
      }
    );

    return res.data;
  },
};
