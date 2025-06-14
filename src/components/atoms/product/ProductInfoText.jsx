import React from "react";

const ProductInfoText = ({ current, total }) => {
  return (
    <div className="hidden lg:block text-sm text-gray-700">
      Menampilkan {current} dari {total} Produk
    </div>
  );
};

export default ProductInfoText;
