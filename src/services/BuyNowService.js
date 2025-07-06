// BuyNowService.js
// Service untuk menangani operasi "Beli Sekarang"

export const BuyNowService = {
  // Simpan item untuk "Beli Sekarang"
  setBuyNowItems: (items) => {
    sessionStorage.setItem("buyNowItems", JSON.stringify(items));
    sessionStorage.setItem("checkoutMode", "buyNow");
  },

  // Ambil item "Beli Sekarang"
  getBuyNowItems: () => {
    const items = sessionStorage.getItem("buyNowItems");
    return items ? JSON.parse(items) : [];
  },

  // Cek apakah sedang dalam mode "Beli Sekarang"
  isBuyNowMode: () => {
    return sessionStorage.getItem("checkoutMode") === "buyNow";
  },

  // Bersihkan data "Beli Sekarang"
  clearBuyNowData: () => {
    sessionStorage.removeItem("buyNowItems");
    sessionStorage.removeItem("checkoutMode");
  },

  // Proses pembelian langsung (tanpa menambah ke cart)
  processBuyNowOrder: async (orderData) => {
    try {
      // Di sini Anda bisa menambahkan API call untuk memproses order langsung
      // Contoh:
      // const token = localStorage.getItem("token");
      // const response = await axios.post(`${API_URL}/orders/buy-now`, orderData, {
      //   headers: { Authorization: `Bearer ${token}` }
      // });

      console.log("Processing Buy Now Order:", orderData);

      // Simulasi API call
      return {
        success: true,
        orderId: Date.now(),
        message: "Pesanan berhasil diproses",
      };
    } catch (error) {
      console.error("Error processing buy now order:", error);
      throw error;
    }
  },

  // Validasi item sebelum checkout
  validateBuyNowItems: (items) => {
    if (!items || items.length === 0) {
      throw new Error("Tidak ada item untuk di-checkout");
    }

    for (const item of items) {
      if (!item.variation || !item.variation.id) {
        throw new Error("Variasi produk tidak valid");
      }
      if (!item.quantity || item.quantity <= 0) {
        throw new Error("Jumlah produk tidak valid");
      }
    }

    return true;
  },
};
