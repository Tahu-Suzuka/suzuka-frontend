import axios from "axios";
import { API_URL } from "./API";

export const AuthService = {
  login: async (email, password) => {
    const res = await axios.post(`${API_URL}/auth/login`, { email, password });
    return res.data;
  },

  register: async ({ name, email, password }) => {
    const res = await axios.post(`${API_URL}/auth/register`, {
      name,
      email,
      password,
    });
    return res.data;
  },

  verifyOtp: async (email, otp) => {
    const res = await axios.post(`${API_URL}/auth/verify-otp`, {
      email,
      otp,
    });
    return res.data;
  },

  resendOtp: async (email) => {
    const res = await axios.post(`${API_URL}/auth/resend-otp`, { email });
    return res.data;
  },

  forgotPassword: async (email) => {
    const res = await axios.post(`${API_URL}/auth/forgot-password`, {
      email,
    });
    return res.data;
  },

  resetPassword: async ({ email, otp, newPassword }) => {
    const res = await axios.post(`${API_URL}/auth/reset-password`, {
      email,
      otp,
      newPassword,
    });
    return res.data;
  },
};
