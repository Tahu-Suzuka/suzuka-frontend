import React from "react";
import Card from "../atoms/Card";
import Button from "../atoms/Button";

const products = [
  {
    name: "Tahu Kuning",
    image: "/images/hero/slider1.png",
    price: 12000,
    originalPrice: 15000,
    rating: 5,
  },
  {
    name: "Tahu Putih",
    image: "/images/hero/slider2.png",
    price: 10000,
    originalPrice: 13000,
    rating: 4,
  },
  {
    name: "Tahu Stik",
    image: "/images/hero/slider3.png",
    price: 14000,
    originalPrice: 16000,
    rating: 5,
  },
];

const ProductCard = () => {
  return (
    <>
      {products.map((product, index) => (
        <Card
          key={index}
          name={product.name}
          image={product.image}
          rating={product.rating}
          price={product.price}
          originalPrice={product.originalPrice}
        >
          <Button
            to="/cart"
            text="Masukkan Keranjang"
            width="w-auto"
            py="py-2"
            className="rounded-md px-4 text-sm"
          />
        </Card>
      ))}
    </>
  );
};

export default ProductCard;
