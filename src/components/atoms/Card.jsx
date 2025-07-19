import { FaStar } from "react-icons/fa";

const Card = ({
  name,
  image,
  ratingAverage,
  price,
  children,
  priceClassName = "",
  showRating = true,
  showHorizontalLayout = false,
  onClick,
}) => {
  const rating = Number(ratingAverage) || 0;

  return (
    <div
      className="bg-white rounded-xl shadow-md overflow-hidden text-center group cursor-pointer"
      onClick={onClick}
    >
      <div className="overflow-hidden">
        <img
          src={image}
          alt={name}
          className="w-full h-48 object-cover block rounded-t-xl transform transition-transform duration-300 group-hover:scale-105"
        />
      </div>

      <div className="p-4">
        {showHorizontalLayout ? (
          <div className="flex justify-between items-center">
            <h2 className="text-base font-semibold text-left">{name}</h2>
            <p
              className={`text-primary font-semibold text-sm ${priceClassName}`}
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
              <div className="flex justify-center mt-2">
                {Array.from({ length: 5 }).map((_, i) => (
                  <FaStar
                    key={i}
                    className={
                      i < Math.round(rating)
                        ? "text-yellow-400"
                        : "text-gray-300"
                    }
                  />
                ))}
              </div>
            )}

            <div className="mt-4 flex justify-between items-center">
              <p
                className={`text-primary font-semibold text-lg ${priceClassName}`}
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
