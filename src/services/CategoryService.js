import axios from "axios";
import { API_URL } from "./API";

export const CategoryService = {
  getAllCategories: async () => {
    const res = await axios.get(`${API_URL}/categories`);
    return res.data;
  },

  getCategoryById: async (id) => {
    const res = await axios.get(`${API_URL}/categories/${id}`);
    return res.data;
  },

  createCategory: async ({ name, image, token }) => {
    const formData = new FormData();
    formData.append("category_name", name);
    if (image) formData.append("category_image", image);

    const res = await axios.post(`${API_URL}/categories`, formData, {
      headers: {
        Authorization: `Bearer ${token}`,
        "Content-Type": "multipart/form-data",
      },
    });
    return res.data;
  },

  updateCategory: async ({ id, name, image, token }) => {
    const formData = new FormData();
    formData.append("category_name", name);
    if (image) formData.append("category_image", image);

    const res = await axios.put(`${API_URL}/categories/${id}`, formData, {
      headers: {
        Authorization: `Bearer ${token}`,
        "Content-Type": "multipart/form-data",
      },
    });
    return res.data;
  },

  deleteCategory: async ({ id, token }) => {
    const res = await axios.delete(`${API_URL}/categories/${id}`, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
    return res.data;
  },
};
