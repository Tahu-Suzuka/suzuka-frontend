import React from "react";

const Header = ({ imageSrc, title }) => {
  return (
    <div className="relative w-full h-[150px] lg:h-[220px]">
      <img
        src={imageSrc}
        className="absolute inset-0 w-full h-full object-cover"
        alt={title}
      />
      <div className="absolute inset-0 bg-black/50 flex items-center justify-center">
        <h1 className="text-white pt-6 lg:pt-0 text-2xl lg:text-4xl font-bold">
          {title}
        </h1>
      </div>
    </div>
  );
};

export default Header;
