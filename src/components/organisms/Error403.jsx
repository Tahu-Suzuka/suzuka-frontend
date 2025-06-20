import React from "react";
import ErrorLayout from "../../layouts/ErrorLayout";

const Error403 = () => {
  return (
    <ErrorLayout
      imageSrc="/images/error/403.png"
      code="403"
      description="Kamu tidak memiliki izin untuk mengakses halaman ini."
    />
  );
};

export default Error403;
