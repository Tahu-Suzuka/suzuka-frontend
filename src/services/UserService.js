import axios from "axios";
import { API_URL } from "./API";

export const UserService = {
  getAll: async (token) => {
    const res = await axios.get(`${API_URL}/users`, {
      headers: { Authorization: `Bearer ${token}` },
    });
    return res.data;
  },

  getById: async (id, token) => {
    const res = await axios.get(`${API_URL}/users/${id}`, {
      headers: { Authorization: `Bearer ${token}` },
    });
    return res.data;
  },

  create: async (data, token) => {
    const res = await axios.post(`${API_URL}/users`, data, {
      headers: { Authorization: `Bearer ${token}` },
    });
    return res.data;
  },

  update: async (id, data, token) => {
    const res = await axios.put(`${API_URL}/users/${id}`, data, {
      headers: { Authorization: `Bearer ${token}` },
    });
    return res.data;
  },

  delete: async (id, token) => {
    const res = await axios.delete(`${API_URL}/users/${id}`, {
      headers: { Authorization: `Bearer ${token}` },
    });
    return res.data;
  },

  search: async (query, token) => {
    const res = await axios.get(`${API_URL}/users/search?q=${query}`, {
      headers: { Authorization: `Bearer ${token}` },
    });
    return res.data;
  },

  async getProfile() {
    const token = localStorage.getItem("token");
    if (!token) {
      throw new Error("Token tidak ditemukan. Silakan login kembali.");
    }
    const res = await axios.get(`${API_URL}/auth/profile`, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
    return res.data.data;
  },

  getAllPaginated: async (page = 1, limit = 6, token) => {
    const res = await axios.get(
      `${API_URL}/users?page=${page}&limit=${limit}`,
      {
        headers: { Authorization: `Bearer ${token}` },
      }
    );
    return res.data;
  },
};
