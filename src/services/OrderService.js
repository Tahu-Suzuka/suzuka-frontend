import axios from "axios";
import { API_URL } from "./API";
import { getAuthToken } from "./getAuthToken";

export const OrderService = {
  createManualOrder: async (data, token) => {
    try {
      const response = await axios.post(`${API_URL}/orders/manual`, data, {
        headers: {
          Authorization: `Bearer ${token}`,
          "Content-Type": "application/json",
        },
      });
      return response.data;
    } catch (error) {
      const errData = error?.response?.data;
      console.log("Manual order error response:", errData);

      let message = "Gagal mengirim pesanan manual";
      if (Array.isArray(errData?.errors) && errData.errors.length > 0) {
        const first = errData.errors[0];
        message = first.message || JSON.stringify(first);
      } else if (errData?.message) {
        message = errData.message;
      }

      throw new Error(message);
    }
  },

  getAll: async ({ page = 1, limit = 7, status = "" }) => {
    const token = localStorage.getItem("token");
    const params = new URLSearchParams();
    params.append("page", page);
    params.append("limit", limit);
    if (status) params.append("status", status);

    const response = await axios.get(
      `${API_URL}/orders/all?${params.toString()}`,
      {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      }
    );

    return {
      data: response.data.data,
      pagination: response.data.pagination,
    };
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
    const token = localStorage.getItem("token");

    const res = await axios.patch(
      `${API_URL}/orders/${orderId}/user-status`,
      { status },
      {
        headers: {
          Authorization: `Bearer ${token}`,
          "Content-Type": "application/json",
        },
      }
    );

    return res.data;
  },
};
