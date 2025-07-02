import React, { useEffect, useState } from "react";
import Card from "../atoms/Card";
import Button from "../atoms/Button";
import { ProductService } from "../../services/ProductService";

const ProductCard = () => {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);

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

  if (loading) {
    return <p className="text-center text-gray-500">Memuat produk...</p>;
  }

  return (
    <>
      {products.map((product, index) => (
        <Card
          key={index}
          name={product.product_name}
          image={product.mainImage}
          rating={product.rating || 5} // default rating jika belum tersedia
          price={product.variations?.[0]?.price || 0} // fallback harga 0 jika kosong
        >
          <Button
            to="/cart"
            text="Masukkan Keranjang"
            width="w-auto"
            className="rounded-md px-4 text-sm py-2"
          />
        </Card>
      ))}
    </>
  );
};

export default ProductCard;
