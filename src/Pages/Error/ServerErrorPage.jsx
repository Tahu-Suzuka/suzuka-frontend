import React from "react";
import ErrorLayout from "../../layouts/ErrorLayout";

const ServerErrorPage = () => {
  return (
    <ErrorLayout
      imageSrc="/images/500.png"
      code="500"
      description="Terjadi kesalahan di server kami. Silakan coba lagi nanti."
    />
  );
};

export default ServerErrorPage;
