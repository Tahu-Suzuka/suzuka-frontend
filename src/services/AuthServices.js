import axios from "axios";
import { API_URL } from "./API";

export const AuthService = {
  // Login
  login: async (email, password) => {
    const res = await axios.post(`${API_URL}/auth/login`, { email, password });
    return res.data;
  }, // Register

  register: async ({ name, email, password }) => {
    const res = await axios.post(`${API_URL}/auth/register`, {
      name,
      email,
      password,
    });
    return res.data;
  }, // Verifikasi OTP

  verifyOtp: async (email, otp) => {
    const res = await axios.post(`${API_URL}/auth/verify-otp`, {
      email,
      otp,
    });
    return res.data;
  }, // Kirim ulang OTP

  resendOtp: async (email) => {
    const res = await axios.post(`${API_URL}/auth/resend-otp`, { email });
    return res.data;
  }, // Ambil profil user

  getProfile: async (token) => {
    const res = await axios.get(`${API_URL}/auth/profile`, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
    return res.data;
  }, // Update profil

  updateProfile: async (token, profileData) => {
    const res = await axios.patch(`${API_URL}/auth/profile`, profileData, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
    return res.data;
  }, //  Ganti password

  changePassword: async (token, oldPassword, newPassword) => {
    const res = await axios.patch(
      `${API_URL}/auth/change-password`,
      {
        oldPassword,
        newPassword,
      },
      {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      }
    );
    return res.data;
  },
};
