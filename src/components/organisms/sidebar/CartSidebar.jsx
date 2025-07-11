import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { X } from "lucide-react";
import { FaMinus, FaPlus } from "react-icons/fa";
import Button from "../../atoms/Button";
import Alert from "../../atoms/Alert";
import { CartService } from "../../../services/CartService";
import { ProductService } from "../../../services/ProductService";
import { LazyLoadImage } from "react-lazy-load-image-component";
import "react-lazy-load-image-component/src/effects/blur.css";

const CartSidebar = ({ onClose, refresh }) => {
  const navigate = useNavigate();
  const [items, setItems] = useState([]);
  const [showAlert, setShowAlert] = useState(false);
  const [deleteItemId, setDeleteItemId] = useState(null);

  useEffect(() => {
    fetchCart();
  }, [refresh]);

  const fetchCart = async () => {
    try {
      const res = await CartService.getAll();
      const mapped = await Promise.all(
        [...res.carts].reverse().map(async (item) => {
          const detail = await ProductService.getById(item.variation.productId);
          return {
            id: item.id,
            name: item.variation.product.product_name,
            price: item.variation.price,
            image: item.variation.product.mainImage || "/images/default.png",
            quantity: item.quantity,
            productVariationId: item.productVariationId,
            variations: detail?.variations || detail?.data?.variations || [],
          };
        })
      );
      setItems(mapped);
    } catch (error) {
      if (error.response?.status === 401) {
        navigate("/login");
      } else if (error.response?.status === 403) {
        navigate("/403");
      } else if (error.response?.status >= 500) {
        navigate("/500");
      } else {
        console.error("Gagal mengambil keranjang:", error);
      }
    }
  };

  const formatRupiah = (number) =>
    new Intl.NumberFormat("id-ID", {
      style: "currency",
      currency: "IDR",
      minimumFractionDigits: 0,
    }).format(number);

  const updateCart = async (updatedItems) => {
    await CartService.updateItems(
      updatedItems.map((item) => ({
        variationId: item.productVariationId,
        quantity: item.quantity,
      }))
    );
  };

  const handleIncrement = async (variationId) => {
    const updated = items.map((item) =>
      item.productVariationId === variationId
        ? { ...item, quantity: item.quantity + 1 }
        : item
    );
    setItems(updated);
    await updateCart(updated);
  };

  const handleDecrement = async (variationId) => {
    const item = items.find((i) => i.productVariationId === variationId);
    if (item.quantity === 1) {
      setDeleteItemId(item.id);
      setShowAlert(true);
    } else {
      const updated = items.map((item) =>
        item.productVariationId === variationId
          ? { ...item, quantity: item.quantity - 1 }
          : item
      );
      setItems(updated);
      await updateCart(updated);
    }
  };

  const handleDeleteConfirmed = async () => {
    try {
      await CartService.deleteItem(deleteItemId);
      setItems((prev) => prev.filter((item) => item.id !== deleteItemId));
    } catch (error) {
      if (error.response?.status === 403) {
        navigate("/403");
      } else if (error.response?.status >= 500) {
        navigate("/500");
      } else {
        alert("Gagal menghapus item.");
      }
    } finally {
      setShowAlert(false);
      setDeleteItemId(null);
    }
  };

  const handleCancelDelete = () => {
    setShowAlert(false);
    setDeleteItemId(null);
  };

  const handleVariationChange = async (itemId, newVariationId) => {
    const item = items.find((i) => i.id === itemId);
    const newVariation = item.variations.find((v) => v.id === newVariationId);
    const updated = items.map((i) =>
      i.id === itemId
        ? {
            ...i,
            productVariationId: newVariationId,
            price: newVariation.price,
          }
        : i
    );
    setItems(updated);
    await updateCart(updated);
  };

  const handleCheckout = () => {
    sessionStorage.setItem("checkoutMode", "cart");
    window.location.href = "/checkout";
  };

  const total = items.reduce(
    (acc, item) => acc + item.price * item.quantity,
    0
  );

  return (
    <>
      <div className="fixed top-0 right-0 w-full lg:max-w-sm h-full bg-white shadow-lg z-50 transition-transform duration-300 flex flex-col">
        <div className="flex justify-between items-center px-4 py-4 border-b">
          <h2 className="text-lg font-bold">Keranjang</h2>
          <button onClick={onClose}>
            <X className="w-6 h-6 text-gray-600" />
          </button>
        </div>

        <div className="flex-1 overflow-y-auto px-4 pt-4 space-y-4">
          {items.map((item) => (
            <div key={item.id} className="flex items-start gap-3 border-b pb-4">
              <LazyLoadImage
                src={item.image}
                alt={item.name}
                className="w-16 h-16 object-cover rounded"
                effect="blur"
              />
              <div className="flex-1 space-y-1">
                <div className="flex justify-between items-start">
                  <h3 className="font-semibold text-sm">{item.name}</h3>
                  <button
                    className="text-xs text-primary hover:font-bold hover:underline"
                    onClick={() => {
                      setDeleteItemId(item.id);
                      setShowAlert(true);
                    }}
                  >
                    Hapus
                  </button>
                </div>

                <div className="flex justify-between items-center gap-4 pt-1 pb-1">
                  <select
                    className="bg-gray-200 text-xs rounded px-2 py-1"
                    value={item.productVariationId}
                    onChange={(e) =>
                      handleVariationChange(item.id, e.target.value)
                    }
                  >
                    {item.variations.map((v) => (
                      <option key={v.id} value={v.id}>
                        {v.name}
                      </option>
                    ))}
                  </select>

                  <div className="flex items-center gap-2 border px-2 py-1 rounded">
                    <button
                      onClick={() => handleDecrement(item.productVariationId)}
                    >
                      <FaMinus className="text-xs" />
                    </button>
                    <p className="text-sm px-2">{item.quantity}</p>
                    <button
                      onClick={() => handleIncrement(item.productVariationId)}
                    >
                      <FaPlus className="text-xs" />
                    </button>
                  </div>
                </div>

                <p className="text-sm text-gray-800 font-semibold mt-1">
                  Rp {item.price.toLocaleString("id-ID")}
                </p>
              </div>
            </div>
          ))}
        </div>

        <div className="px-4 pt-4 pb-3 border-t space-y-3">
          <div className="flex justify-between font-semibold text-base">
            <p>Total</p>
            <p>{formatRupiah(total)}</p>
          </div>
          <p className="text-xs text-gray-500">
            Ongkir dan Voucher diskon akan dihitung pada saat checkout.
          </p>
          <Button
            text="Lanjutkan"
            width="w-full"
            className="rounded text-sm font-semibold py-2"
            onClick={handleCheckout}
          />
        </div>
      </div>

      {showAlert && (
        <Alert
          message="Apakah Anda yakin ingin menghapus produk ini dari keranjang?"
          onCancel={handleCancelDelete}
          onConfirm={handleDeleteConfirmed}
        />
      )}
    </>
  );
};

export default CartSidebar;
