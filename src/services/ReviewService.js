import axios from "axios";
import { API_URL } from "./API";
import { getAuthToken } from "../services/getAuthToken";

export const ReviewService = {
  postReview: async ({ orderId, productId, rating, comment, image }) => {
    const token = getAuthToken();
    const formData = new FormData();

    formData.append("orderId", orderId);
    formData.append("productId", productId);
    formData.append("rating", parseInt(rating));
    formData.append("comment", comment);

    if (image instanceof File) {
      formData.append("review_images", image);
    }

    const res = await axios.post(`${API_URL}/reviews`, formData, {
      headers: {
        "Content-Type": "multipart/form-data",
        Authorization: `Bearer ${token}`,
      },
    });

    return res.data;
  },

  getReviewByProduct: async (productId) => {
    const url = productId
      ? `${API_URL}/reviews/product/${productId}`
      : `${API_URL}/reviews`;
    const res = await axios.get(url);
    return res.data;
  },

  checkReviewStatus: async (orderId, productId) => {
    const token = localStorage.getItem("token");
    try {
      const response = await axios.get(
        `${API_URL}/reviews/order/${orderId}/product/${productId}/check`,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );
      return response.data;
    } catch (error) {
      console.error("Gagal memeriksa status review:", error);
      return { hasReviewed: false };
    }
  },
};
