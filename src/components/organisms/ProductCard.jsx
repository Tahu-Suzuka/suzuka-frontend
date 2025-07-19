import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import Card from "../atoms/Card";
import Button from "../atoms/Button";
import Alert from "../atoms/Alert";
import CartSidebar from "../organisms/sidebar/CartSidebar";
import { CartService } from "../../services/CartService";
import AOS from "aos";
import "aos/dist/aos.css";

const ProductCard = ({ products = [], loading, onCartUpdate }) => {
  const navigate = useNavigate();
  const [showSuccessAlert, setShowSuccessAlert] = useState(false);
  const [isCartOpen, setIsCartOpen] = useState(false);

  useEffect(() => {
    AOS.init({ duration: 800, once: true });
  }, []);

  const handleAddToCart = async (product, e) => {
    e.stopPropagation();
    const token = localStorage.getItem("token");
    if (!token) {
      navigate("/login");
      return;
    }

    try {
      const variation = product.variations?.[0];
      if (!variation) return alert("Produk tidak memiliki variasi");
      await CartService.addItems([{ variationId: variation.id, quantity: 1 }]);
      setShowSuccessAlert(true);
      if (onCartUpdate) onCartUpdate();
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
          confirmText="Lihat Keranjang"
          onConfirm={() => {
            setShowSuccessAlert(false);
            setIsCartOpen(true);
          }}
        />
      )}

      {isCartOpen && <CartSidebar onClose={() => setIsCartOpen(false)} />}

      {products.map((product, index) => (
        <div
          key={product.id}
          className="cursor-pointer"
          onClick={() => navigate(`/produk/${product.id}`)}
          data-aos="zoom-in"
          data-aos-delay={`${index * 100}`}
        >
          <Card
            name={product.product_name}
            image={product.mainImage}
            rating={product.rating || 5}
            ratingAverage={product.ratingAverage}
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
