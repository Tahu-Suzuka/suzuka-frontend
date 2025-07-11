import React from "react";
import { LazyLoadImage } from "react-lazy-load-image-component";
import "react-lazy-load-image-component/src/effects/blur.css";

const Avatar = ({ src }) => {
  return (
    <LazyLoadImage
      src={src}
      alt="Avatar"
      effect="blur"
      className="w-10 h-10 rounded-full object-cover border-2 bg-white"
    />
  );
};

export default Avatar;
