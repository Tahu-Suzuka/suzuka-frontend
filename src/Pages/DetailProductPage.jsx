import React, { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { FaTruck, FaTicketAlt, FaStar } from "react-icons/fa";
import Button from "../components/atoms/Button";
import Header from "../components/atoms/Header";
import Card from "../components/atoms/Card";
import Review from "../components/atoms/Review";
import Modal from "react-modal";
import Slider from "react-slick";
import { ProductService } from "../services/ProductService";
import { CartService } from "../services/CartService";
import { OrderService } from "../services/OrderService";
import Alert from "../components/atoms/Alert";
import { LazyLoadImage } from "react-lazy-load-image-component";
import "react-lazy-load-image-component/src/effects/blur.css";
Modal.setAppElement("#root");

const DetailProductPage = () => {
  const { id } = useParams();
  const navigate = useNavigate();

  const [product, setProduct] = useState(null);
  const [loading, setLoading] = useState(true);
  const [size, setSize] = useState("");
  const [quantity, setQuantity] = useState(1);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectedImageIndex, setSelectedImageIndex] = useState(0);
  const [relatedProducts, setRelatedProducts] = useState([]);

  const [showSuccessAlert, setShowSuccessAlert] = useState(false);

  useEffect(() => {
    const fetchProduct = async () => {
      try {
        const res = await ProductService.getById(id);
        setProduct(res.data);
        if (res.data.variations?.length) {
          setSize(res.data.variations[0].name);
        }
      } catch (err) {
        console.error("Gagal ambil detail produk:", err);
      } finally {
        setLoading(false);
      }
    };
    fetchProduct();
  }, [id]);

  useEffect(() => {
    const fetchRelatedProducts = async () => {
      try {
        const res = await ProductService.getAll();
        const allProducts = res.data || [];
        const filtered = allProducts.filter((p) => p.id !== id);
        const shuffled = filtered.sort(() => 0.5 - Math.random());
        const selected = shuffled.slice(0, 4);
        setRelatedProducts(selected);
      } catch (error) {
        console.error("Gagal ambil produk serupa:", error);
      }
    };
    fetchRelatedProducts();
  }, [id]);

  const handleDecrement = () => {
    if (quantity > 1) setQuantity(quantity - 1);
  };

  const handleIncrement = () => {
    setQuantity(quantity + 1);
  };

  const openModal = (index) => {
    setSelectedImageIndex(index);
    setIsModalOpen(true);
  };

  const closeModal = () => setIsModalOpen(false);

  const selectedVariation = product?.variations?.find((v) => v.name === size);
  const price = selectedVariation?.price ?? 0;
  const total = price * quantity;

  const handleAddToCart = async () => {
    const token = localStorage.getItem("token");
    if (!token) {
      navigate("/login");
      return;
    }

    try {
      if (!selectedVariation) return alert("Variasi tidak dipilih.");
      await CartService.addItems([
        { variationId: selectedVariation.id, quantity },
      ]);
      setShowSuccessAlert(true);
    } catch (err) {
      console.error("Gagal tambah ke keranjang:", err);
      alert("Gagal menambahkan ke keranjang.");
    }
  };

  const handleBuyNow = async () => {
    const token = localStorage.getItem("token");
    if (!token) {
      navigate("/login");
      return;
    }

    try {
      if (!selectedVariation) return alert("Variasi tidak dipilih.");

      // --- PERUBAHAN DI SINI ---
      const payload = {
        items: [{ variationId: selectedVariation.id, quantity }],
        note: "", // Tambahkan note kosong
        voucher: null, // Tambahkan voucher null
      };
      // --- BATAS PERUBAHAN ---

      const orderRes = await OrderService.createBuyNowOrder(payload);
      const orderId = orderRes?.data?.id;

      if (!orderId) {
        throw new Error("Gagal mendapatkan ID pesanan dari server.");
      }

      sessionStorage.setItem("checkoutMode", "buyNow");
      sessionStorage.setItem(
        "buyNowItems",
        JSON.stringify([
          {
            variation: {
              id: selectedVariation.id,
              name: selectedVariation.name,
              price: selectedVariation.price,
              product: {
                product_name: product.product_name,
                mainImage: product.mainImage,
              },
            },
            quantity,
          },
        ])
      );
      sessionStorage.setItem("buyNowOrderId", orderId);

      navigate("/checkout");
    } catch (error) {
      console.error("Error Buy Now:", error);
      alert(error.response?.data?.message || "Gagal proses beli sekarang.");
    }
  };

  if (loading) return <p className="text-center py-10">Memuat...</p>;
  if (!product)
    return <p className="text-center py-10">Produk tidak ditemukan.</p>;

  const thumbnails = [
    product.mainImage,
    ...(product.additionalImages || []),
  ].filter(Boolean);

  const sliderSettings = {
    dots: false,
    infinite: thumbnails.length > 1,
    speed: 500,
    initialSlide: selectedImageIndex,
    slidesToShow: 1,
    slidesToScroll: 1,
    arrows: true,
  };

  return (
    <div className="bg-[#F3F4F6]">
      {showSuccessAlert && (
        <Alert
          message="Produk berhasil ditambahkan ke keranjang!"
          confirmText="Tutup"
          onConfirm={() => setShowSuccessAlert(false)}
        />
      )}

      <Header imageSrc="/images/product/header.png" title="Detail Produk" />
      <div className="px-6 lg:px-20 pb-40">
        <div className="max-w-6xl mx-auto bg-white rounded-md px-6 py-10 flex flex-col lg:flex-row gap-6 mt-6">
          <div className="flex-1">
            <LazyLoadImage
              src={product.mainImage}
              alt={product.product_name}
              className="w-full h-80 object-cover rounded-md"
              effect="blur"
            />
            <div className="grid grid-cols-3 gap-2 mt-4">
              {thumbnails.map((src, i) => (
                <LazyLoadImage
                  key={i}
                  src={src}
                  alt={`Thumbnail ${i + 1}`}
                  onClick={() => openModal(i)}
                  className="h-20 object-cover rounded-md w-full cursor-pointer hover:opacity-80"
                  effect="blur"
                />
              ))}
            </div>
          </div>
          <div className="flex-1">
            <h1 className="text-2xl font-bold mb-2">{product.product_name}</h1>
            <div className="flex items-center gap-1 text-primary mb-1">
              {[...Array(5)].map((_, i) => (
                <FaStar key={i} className="text-lg" />
              ))}
              <span className="text-sm text-black ml-1">3 Review</span>
            </div>
            <p className="text-gray-700 mb-4">{product.description}</p>
            <div className="mb-4 text-xl font-bold">
              Rp {price.toLocaleString("id-ID")}
            </div>
            <div className="flex items-center gap-2 mb-4">
              <span className="text-sm font-medium">Ukuran :</span>
              {product.variations.map((item) => (
                <button
                  key={item.name}
                  onClick={() => setSize(item.name)}
                  className={`px-3 py-1 rounded-md text-sm border shadow-sm ${
                    size === item.name
                      ? "bg-secondary text-white font-bold"
                      : "bg-white text-black"
                  }`}
                >
                  {item.name}
                </button>
              ))}
            </div>
            <div className="flex items-center gap-2 mb-4">
              <span className="text-sm font-medium">Banyaknya :</span>
              <div className="flex items-center border rounded-md shadow overflow-hidden">
                <button onClick={handleDecrement} className="px-3 py-1 text-lg">
                  -
                </button>
                <span className="px-4 text-sm">{quantity}</span>
                <button onClick={handleIncrement} className="px-3 py-1 text-lg">
                  +
                </button>
              </div>
            </div>
            <div className="mb-4 text-lg">
              <span className="font-medium">Total</span> : Rp{" "}
              {total.toLocaleString("id-ID")}
            </div>
            <div className="flex gap-4 mb-4">
              <Button
                text="Masukan Keranjang"
                bgColor="bg-white"
                textColor="text-primary"
                className="border border-primary rounded-sm shadow-md hover:text-white py-2"
                onClick={handleAddToCart}
              />
              <Button
                text="Beli Sekarang"
                className="rounded-sm shadow-md"
                py="py-2"
                onClick={handleBuyNow}
              />
            </div>
            <div className="flex items-center gap-2 text-sm text-gray-600 mb-2">
              <FaTruck className="text-lg text-secondary" /> Pengiriman sesuai
              dengan tanggal yang anda tentukan
            </div>
            <div className="flex items-center gap-2 text-sm text-gray-600">
              <FaTicketAlt className="text-lg text-secondary" /> Anda dapat
              memasukan voucher diskon ataupun gratis ongkir
            </div>
          </div>
        </div>
        <div className="max-w-6xl mx-auto grid grid-cols-1 lg:grid-cols-3 gap-6 mt-6">
          <div className="col-span-2">
            <Review productId={id} />
          </div>
          <div className="bg-white rounded-md p-6 hidden lg:block self-start">
            <h1 className="text-xl font-bold mb-6 text-center">
              Produk Serupa
            </h1>
            <div className="space-y-4">
              {relatedProducts.map((p) => (
                <Card
                  key={p.id}
                  name={p.product_name}
                  image={p.mainImage || "/images/default.png"}
                  price={p.variations?.[0]?.price || 0}
                  showButton={false}
                  showRating={false}
                  showHorizontalLayout={true}
                  onClick={() => navigate(`/produk/${p.id}`)}
                />
              ))}
            </div>
          </div>
        </div>
      </div>
      <Modal
        isOpen={isModalOpen}
        onRequestClose={closeModal}
        contentLabel="Preview Gambar"
        className="max-w-3xl w-full mx-auto mt-20 rounded-md outline-none px-12 lg:px-4"
        overlayClassName="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-start z-50"
      >
        <Slider {...sliderSettings}>
          {thumbnails.map((src, i) => (
            <div key={i} className="w-full">
              <LazyLoadImage
                src={src}
                alt={`Slide ${i + 1}`}
                className="w-full max-h-[200px] lg:max-h-[400px] object-contain rounded"
                effect="blur"
              />
            </div>
          ))}
        </Slider>
      </Modal>
    </div>
  );
};

export default DetailProductPage;
