import axios from "axios";
import { API_URL } from "./API";

export const CartService = {
  getAll: async () => {
    const token = localStorage.getItem("token");
    const res = await axios.get(`${API_URL}/carts`, {
      headers: { Authorization: `Bearer ${token}` },
    });
    return res.data;
  },

  addItems: async (items) => {
    const token = localStorage.getItem("token");
    const res = await axios.post(
      `${API_URL}/carts`,
      { items },
      {
        headers: { Authorization: `Bearer ${token}` },
      }
    );
    return res.data;
  },

  updateItems: async (items) => {
    const token = localStorage.getItem("token");
    return await axios.patch(
      `${API_URL}/carts`,
      { items },
      {
        headers: { Authorization: `Bearer ${token}` },
      }
    );
  },

  deleteItem: async (id) => {
    const token = localStorage.getItem("token");
    return await axios.delete(`${API_URL}/carts/${id}`, {
      headers: { Authorization: `Bearer ${token}` },
    });
  },
};
