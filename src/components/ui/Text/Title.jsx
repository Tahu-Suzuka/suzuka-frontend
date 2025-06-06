import React from "react";

const Title = ({ subtitle, title }) => {
  return (
    <div className="flex flex-col items-center justify-center pb-10">
      {subtitle && (
        <p className="text-secondary font-bold text-lg pb-2">{subtitle}</p>
      )}
      {title && <h1 className="text-2xl font-bold text-center">{title}</h1>}
    </div>
  );
};

export default Title;
