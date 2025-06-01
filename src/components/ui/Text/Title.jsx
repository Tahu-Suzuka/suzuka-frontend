import React from "react";

const Title = ({ subtitle, title }) => {
  return (
    <div className="flex flex-col items-center justify-center py-2">
      {subtitle && (
        <p className="text-primary font-semibold text-base pb-2">{subtitle}</p>
      )}
      {title && <h1 className="text-3xl font-bold text-center">{title}</h1>}
    </div>
  );
};

export default Title;
