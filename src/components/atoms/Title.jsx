import React from "react";

const Title = ({ subtitle, title }) => {
  return (
    <div className="flex flex-col items-center justify-center pb-5 lg:pb-10 px-16">
      {subtitle && (
        <p className="text-primary font-bold text-base lg:text-lg lg:pb-2">
          {subtitle}
        </p>
      )}
      {title && (
        <h1 className="text-xl lg:text-2xl font-bold text-center">{title}</h1>
      )}
    </div>
  );
};

export default Title;
