import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import Card from "../atoms/Card";
import Button from "../atoms/Button";
import Alert from "../atoms/Alert";
import { CartService } from "../../services/CartService";

const ProductCard = ({ products = [], loading, onCartUpdate }) => {
  const navigate = useNavigate();

  const [showSuccessAlert, setShowSuccessAlert] = useState(false);

  const handleAddToCart = async (product, e) => {
    e.stopPropagation();

    const token = localStorage.getItem("token");
    if (!token) {
      navigate("/login");
      return;
    }

    try {
      const variation = product.variations?.[0];
      if (!variation) {
        alert("Produk tidak memiliki variasi");
        return;
      }

      await CartService.addItems([{ variationId: variation.id, quantity: 1 }]);
      setShowSuccessAlert(true);

      if (onCartUpdate) {
        onCartUpdate();
      }
    } catch (err) {
      console.error("Gagal menambahkan ke keranjang:", err);
      alert("Gagal menambahkan ke keranjang.");
    }
  };

  if (loading) {
    return (
      <p className="text-center text-gray-500 col-span-full">
        Memuat produk...
      </p>
    );
  }

  if (products.length === 0) {
    return (
      <p className="text-center text-gray-500 col-span-full">
        Produk tidak ditemukan.
      </p>
    );
  }

  return (
    <>
      {showSuccessAlert && (
        <Alert
          message="Produk berhasil ditambahkan ke keranjang!"
          confirmText="Lanjutkan Belanja"
          onConfirm={() => setShowSuccessAlert(false)}
        />
      )}

      {products.map((product) => (
        <div
          key={product.id}
          className="cursor-pointer"
          onClick={() => navigate(`/produk/${product.id}`)}
        >
          <Card
            name={product.product_name}
            image={product.mainImage}
            rating={product.rating || 5}
            price={product.variations?.[0]?.price || 0}
          >
            <Button
              text="Masukkan Keranjang"
              width="w-auto"
              className="rounded-md px-4 text-sm py-2"
              onClick={(e) => handleAddToCart(product, e)}
            />
          </Card>
        </div>
      ))}
    </>
  );
};

export default ProductCard;
