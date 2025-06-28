import React from "react";

const Avatar = ({ src }) => {
  return (
    <img
      src={src}
      alt="Avatar"
      className="w-10 h-10 rounded-full object-cover border-2 bg-white"
    />
  );
};

export default Avatar;
