import axios from "axios";
import { API_URL } from "./API";

export const ProductService = {
  getAll: async () => {
    const res = await axios.get(`${API_URL}/products`);
    return res.data;
  },

  getById: async (id) => {
    const res = await axios.get(`${API_URL}/products/${id}`);
    return res.data;
  },

  search: async (q) => {
    const res = await axios.get(`${API_URL}/products/search?q=${q}`);
    return res.data;
  },

  create: async (formData, token) => {
    const res = await axios.post(`${API_URL}/products`, formData, {
      headers: {
        Authorization: `Bearer ${token}`,
        "Content-Type": "multipart/form-data",
      },
    });
    return res.data;
  },

  update: async (id, formData, token) => {
    const res = await axios.put(`${API_URL}/products/${id}`, formData, {
      headers: {
        Authorization: `Bearer ${token}`,
        "Content-Type": "multipart/form-data",
      },
    });
    return res.data;
  },

  delete: async (id, token) => {
    const res = await axios.delete(`${API_URL}/products/${id}`, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
    return res.data;
  },
};
