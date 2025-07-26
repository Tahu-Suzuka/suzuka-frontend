import React, { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { FaTruck, FaTicketAlt, FaStar } from "react-icons/fa";
import { ProductService } from "../services/ProductService";
import { CartService } from "../services/CartService";
import { OrderService } from "../services/OrderService";
import { ReviewService } from "../services/ReviewService";
import { getAuthToken } from "../services/getAuthToken"; // Import fungsi getAuthToken
import Button from "../components/atoms/Button";
import Header from "../components/atoms/Header";
import Card from "../components/atoms/Card";
import Review from "../components/atoms/Review";
import Modal from "react-modal";
import Slider from "react-slick";
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
  const [reviews, setReviews] = useState([]);
  const [ratingAverage, setRatingAverage] = useState(0);
  const [totalReview, setTotalReview] = useState(0);
  const [note, setNote] = useState(""); // State untuk note (opsional, jika ingin ada input note di halaman detail produk)

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
        // Pertimbangkan untuk menampilkan pesan error ke pengguna
      } finally {
        setLoading(false);
      }
    };
    fetchProduct();
  }, [id]);

  useEffect(() => {
    const fetchReviews = async () => {
      try {
        const res = await ReviewService.getReviewByProduct(id);
        const reviewList = res.data || [];
        setReviews(reviewList);
        setTotalReview(reviewList.length);

        if (reviewList.length > 0) {
          const avg =
            reviewList.reduce((sum, r) => sum + r.rating, 0) /
            reviewList.length;
          setRatingAverage(avg);
        } else {
          setRatingAverage(0);
        }
      } catch (err) {
        console.error("Gagal ambil review:", err);
        // Pertimbangkan untuk menampilkan pesan error ke pengguna
      }
    };
    fetchReviews();
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
    const token = getAuthToken(); // Gunakan getAuthToken()
    if (!token) {
      alert("Anda harus login untuk menambahkan produk ke keranjang.");
      navigate("/login");
      return;
    }

    try {
      if (!selectedVariation) {
        alert("Variasi produk belum dipilih.");
        return;
      }
      await CartService.addItems([
        { variationId: selectedVariation.id, quantity },
      ]);
      setShowSuccessAlert(true);
    } catch (err) {
      console.error("Gagal tambah ke keranjang:", err);
      alert(err.response?.data?.message || "Gagal menambahkan ke keranjang.");
    }
  };

  const handleBuyNow = async () => {
    const token = getAuthToken(); // Pastikan Anda mengambil token di sini
    if (!token) {
      alert("Anda harus login untuk melanjutkan pembelian.");
      navigate("/login");
      return;
    }

    try {
      if (!selectedVariation) {
        alert("Variasi produk belum dipilih.");
        return;
      }

      // Payload untuk OrderService.createBuyNowOrder
      const payload = {
        items: [{ variationId: selectedVariation.id, quantity }],
        note: note, // Menggunakan state note dari DetailProductPage
        // Perbaikan: Ubah voucherCode dari `null` menjadi `""` (string kosong)
        voucherCode: "", // <--- PERBAIKAN DI SINI!
      };

      // Panggil createBuyNowOrder dengan payload DAN token
      const orderRes = await OrderService.createBuyNowOrder(payload, token);
      const orderId = orderRes?.data?.id;

      if (!orderId) {
        throw new Error("Gagal mendapatkan ID pesanan dari server.");
      }

      // Simpan data yang diperlukan di sessionStorage untuk CheckoutPage
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
                // Tambahkan properti lain dari produk yang mungkin dibutuhkan di CheckoutPage
              },
            },
            quantity,
          },
        ])
      );
      // Anda tidak perlu menyimpan orderId di sessionStorage jika itu hanya untuk navigasi langsung ke pembayaran Midtrans.
      // Jika orderId dibutuhkan di CheckoutPage untuk proses lain (misal, menampilkan order yang baru dibuat), baru simpan.
      // sessionStorage.setItem("buyNowOrderId", orderId); // Ini bisa dihapus jika tidak digunakan

      navigate("/checkout");
    } catch (error) {
      console.error("Error Buy Now:", error);
      // Pastikan Anda mengakses pesan error yang benar
      alert(
        error.response?.data?.message ||
          error.message ||
          "Gagal proses beli sekarang."
      );
    }
  };

  if (loading)
    return (
      <div className="flex items-center justify-center min-h-screen bg-gray-100">
        <img
          src="/images/loading.gif"
          alt="Loading..."
          className="w-64 lg:w-72 h-auto object-contain"
        />
      </div>
    );

  if (!product)
    return (
      <div className="flex items-center justify-center min-h-screen bg-white">
        <p className="text-lg font-semibold">Produk tidak ditemukan.</p>
      </div>
    );

  const thumbnails = [
    product.additionalImage1,
    product.additionalImage2,
    product.additionalImage3,
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
            <div className="flex items-center gap-1 mb-3">
              {Array.from({ length: 5 }).map((_, i) => (
                <FaStar
                  key={i}
                  className={`text-lg ${
                    i < Math.round(ratingAverage)
                      ? "text-yellow-400"
                      : "text-gray-300"
                  }`}
                />
              ))}
              <span className="text-sm text-gray-700 ml-1">
                ({totalReview} Ulasan)
              </span>
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
            <div className="mb-4 text-lg font-medium">
              Total : Rp {total.toLocaleString("id-ID")}
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
              <FaTruck className="text-lg text-secondary" /> Pemesanan hanya
              bisa dilakukan untuk wilayah Bandung dan sekitarnya.
            </div>
            <div className="flex items-center gap-2 text-sm text-gray-600">
              <FaTicketAlt className="text-lg text-secondary" /> Anda dapat
              memasukan voucher diskon ataupun gratis ongkir
            </div>
          </div>
        </div>
        <div className="max-w-6xl mx-auto grid grid-cols-1 lg:grid-cols-3 gap-6 mt-6 mb-20 lg-mb-0">
          <div className="col-span-2">
            <Review productId={id} />
          </div>

          <div className="bg-white rounded-md p-6 hidden lg:block self-start">
            <div className="bg-white rounded-md mb-6">
              <div className="relative w-full">
                <img
                  src="/images/product/voucher.png"
                  alt="Voucher Banner"
                  className="w-full h-auto object-cover rounded-2xl"
                />

                <div className="absolute inset-0 flex flex-col justify-center px-2">
                  <h1 className="text-lg font-bold text-white pl-28">
                    VOUCHER DISKON
                  </h1>
                  <div className="mb-2 pl-40">
                    <span className="text-lg font-bold text-white ">
                      Rp 5000
                    </span>
                  </div>
                  <div className="pl-36">
                    <p className="text-xs text-white">
                      *Minimal pembelian 30rb
                    </p>
                  </div>
                  {/* Kode Voucher */}
                  <div className="mt-2">
                    <div className="bg-white rounded-md overflow-hidden max-w-full">
                      <div className="flex text-xs">
                        <div className="bg-gray-200 px-4 py-2 text-gray-700 font-medium whitespace-nowrap">
                          <span>Kode</span>
                        </div>

                        <div className="bg-gray-800 flex-1 px-2 py-2 text-white flex items-center justify-center min-w-0">
                          <p className="font-bold text-xs truncate">
                            GRANDOPENINGSUZUKA
                          </p>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
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
                  ratingAverage={p.ratingAverage}
                  showButton={false}
                  showRating={true}
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
