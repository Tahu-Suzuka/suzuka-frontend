import React from "react";
import Card from "../atoms/Card";
import Button from "../atoms/Button";

const products = [
  {
    name: "Tahu Kuning",
    image: "/images/hero/slider1.png",
    price: 12000,
    rating: 5,
  },
  {
    name: "Tahu Putih",
    image: "/images/hero/slider2.png",
    price: 10000,
    rating: 4,
  },
  {
    name: "Tahu Stik",
    image: "/images/hero/slider3.png",
    price: 14000,
    rating: 5,
  },
  {
    name: "Tahu Stik",
    image: "/images/hero/slider3.png",
    price: 14000,
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
