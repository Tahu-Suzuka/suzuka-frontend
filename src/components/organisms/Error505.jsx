import React from "react";
import ErrorLayout from "../../layouts/ErrorLayout";

const Error500 = () => {
  return (
    <ErrorLayout
      imageSrc="/images/error/500.png"
      code="500"
      description="Terjadi kesalahan di server kami. Silakan coba lagi nanti."
    />
  );
};

export default Error500;
