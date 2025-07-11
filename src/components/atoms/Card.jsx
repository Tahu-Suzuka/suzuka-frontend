import React from "react";
import { FaStar } from "react-icons/fa";
import { LazyLoadImage } from "react-lazy-load-image-component";
import "react-lazy-load-image-component/src/effects/blur.css";

const Card = ({
  name,
  image,
  rating,
  price,
  children,
  priceClassName = "",
  showRating = true,
  showHorizontalLayout = false,
}) => {
  return (
    <div className="bg-white rounded-xl shadow-md overflow-hidden text-center">
      <LazyLoadImage
        src={image}
        alt={name}
        effect="blur"
        className="w-full h-48 object-cover block rounded-t-xl"
      />

      <div className="p-4">
        {showHorizontalLayout ? (
          <div className="flex justify-between items-center">
            <h2 className="text-base font-semibold text-left">{name}</h2>
            <p
              className={`text-red-500 font-semibold text-sm ${priceClassName}`}
            >
              Rp. {price.toLocaleString("id-ID")}
            </p>
          </div>
        ) : (
          <>
            <h2 className="text-lg lg:text-xl font-semibold lg:font-bold">
              {name}
            </h2>

            {showRating && (
              <div className="flex justify-center mt-2 text-primary">
                {Array(rating)
                  .fill()
                  .map((_, i) => (
                    <FaStar key={i} />
                  ))}
              </div>
            )}

            <div className="mt-4 flex justify-between items-center">
              <p
                className={`text-red-500 font-semibold text-lg ${priceClassName}`}
              >
                Rp. {price.toLocaleString("id-ID")}
              </p>
              {children}
            </div>
          </>
        )}
      </div>
    </div>
  );
};

export default Card;
