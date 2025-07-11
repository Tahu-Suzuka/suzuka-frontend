import React from "react";
import ErrorLayout from "../../layouts/ErrorLayout";

const ForbiddenPage = () => {
  return (
    <ErrorLayout
      imageSrc="/images/403.png"
      code="403"
      description="Eh, kamu tidak memiliki izin untuk mengakses halaman ini."
    />
  );
};

export default ForbiddenPage;
