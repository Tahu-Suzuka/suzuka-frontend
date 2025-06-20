import React from "react";
import ErrorLayout from "../../layouts/ErrorLayout";

const Error404 = () => {
  return (
    <ErrorLayout
      imageSrc="/images/error/404.png"
      code="404"
      description="Ups! Halaman yang kamu cari tidak ada di sini."
    />
  );
};

export default Error404;
