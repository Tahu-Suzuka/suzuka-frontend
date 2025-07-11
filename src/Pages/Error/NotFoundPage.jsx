import React from "react";
import ErrorLayout from "../../layouts/ErrorLayout";

const NotFoundPage = () => {
  return (
    <ErrorLayout
      imageSrc="/images/404.png"
      code="404"
      description="Ups! Halaman yang kamu cari tidak ditemukan."
    />
  );
};

export default NotFoundPage;
