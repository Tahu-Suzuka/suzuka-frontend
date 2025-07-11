import React, { useState, useEffect } from "react";
import Header from "../components/atoms/Header";
import ProductCard from "../components/organisms/ProductCard";
import ProductToolbar from "../components/organisms/ProductToolbar";
import { ProductService } from "../services/ProductService";

const ProductPage = () => {
  const [activeLayout, setActiveLayout] = useState(1);
  const [allProducts, setAllProducts] = useState([]);
  const [displayedProducts, setDisplayedProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState("");
  const [sortBy, setSortBy] = useState("semua");

  useEffect(() => {
    const fetchAllProducts = async () => {
      setLoading(true);
      try {
        const response = await ProductService.getAll();
        const productData = response.data || [];
        setAllProducts(productData);
        setDisplayedProducts(productData);
      } catch (error) {
        console.error("Gagal mengambil produk:", error);
      } finally {
        setLoading(false);
      }
    };
    fetchAllProducts();
  }, []);

  useEffect(() => {
    let productsToProcess = [...allProducts];

    if (searchTerm) {
      productsToProcess = productsToProcess.filter((p) =>
        p.product_name.toLowerCase().includes(searchTerm.toLowerCase())
      );
    }

    if (sortBy === "termurah") {
      productsToProcess.sort(
        (a, b) =>
          (a.variations?.[0]?.price || 0) - (b.variations?.[0]?.price || 0)
      );
    } else if (sortBy === "termahal") {
      productsToProcess.sort(
        (a, b) =>
          (b.variations?.[0]?.price || 0) - (a.variations?.[0]?.price || 0)
      );
    }

    setDisplayedProducts(productsToProcess);
  }, [searchTerm, sortBy, allProducts]);

  const getGridCols = () => {
    switch (activeLayout) {
      case 0:
        return "sm:grid-cols-2";
      case 1:
        return "sm:grid-cols-3";
      case 2:
        return "sm:grid-cols-4";
      default:
        return "sm:grid-cols-3";
    }
  };

  return (
    <div>
      <Header imageSrc="/images/product/header.png" title="Produk" />

      <ProductToolbar
        active={activeLayout}
        setActive={setActiveLayout}
        searchTerm={searchTerm}
        setSearchTerm={setSearchTerm}
        sortBy={sortBy}
        setSortBy={setSortBy}
        productCount={displayedProducts.length}
        totalCount={allProducts.length}
      />

      <div
        className={`p-6 px-8 pb-28 lg:pb-32 lg:px-20 lg:p-12 grid grid-cols-1 ${getGridCols()} gap-10`}
      >
        <ProductCard products={displayedProducts} loading={loading} />
      </div>
    </div>
  );
};

export default ProductPage;
