import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import Card from "../atoms/Card";
import Button from "../atoms/Button";
import { ProductService } from "../../services/ProductService";
import { CartService } from "../../services/CartService";

const ProductCard = ({ onCartUpdate }) => {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const res = await ProductService.getAll();
        setProducts(res.data);
      } catch (err) {
        console.error("Gagal memuat produk:", err);
      } finally {
        setLoading(false);
      }
    };

    fetchProducts();
  }, []);

  const handleAddToCart = async (product, e) => {
    e.stopPropagation(); // supaya tidak trigger navigate
    try {
      const variation = product.variations?.[0];
      if (!variation) return alert("Produk tidak memiliki variasi");

      await CartService.addItems([{ variationId: variation.id, quantity: 1 }]);

      if (onCartUpdate) onCartUpdate(); // ⬅️ untuk trigger refresh cartSidebar
    } catch (err) {
      console.error("Gagal menambahkan ke keranjang:", err);
      alert("Gagal menambahkan ke keranjang.");
    }
  };

  if (loading) {
    return <p className="text-center text-gray-500">Memuat produk...</p>;
  }

  return (
    <>
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
