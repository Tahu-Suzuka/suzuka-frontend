import React from "react";
import { FaStar } from "react-icons/fa";

const Card = ({ name, image, rating, price, originalPrice, children }) => {
  return (
    <div className="bg-white rounded-xl shadow-md overflow-hidden text-center">
      <img
        src={image}
        alt={name}
        className="w-full h-48 object-cover block rounded-t-xl"
      />
      <div className="p-4">
        <h2 className="text-xl lg:text-2xl font-semibold lg:font-bold">
          {name}
        </h2>
        <div className="flex justify-center mt-2 text-primary">
          {Array(rating)
            .fill()
            .map((_, i) => (
              <FaStar key={i} />
            ))}
        </div>
        <div className="mt-4 flex justify-between items-center">
          <div className="text-left">
            <p className="text-gray-400 text-sm line-through">
              Rp. {originalPrice.toLocaleString("id-ID")}
            </p>
            <p className="text-red-500 font-semibold text-lg">
              Rp. {price.toLocaleString("id-ID")}
            </p>
          </div>
          {children}
        </div>
      </div>
    </div>
  );
};

export default Card;
