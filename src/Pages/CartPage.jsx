import React, { useState } from "react";
import CartSidebar from "../components/organisms/sidebar/CartSidebar";

const CartPage = () => {
  const [refreshCart, setRefreshCart] = useState(false);

  const triggerCartRefresh = () => {
    setRefreshCart((prev) => !prev); // memicu useEffect di CartSidebar
  };

  return (
    <div>
      <CartSidebar refresh={refreshCart} />
    </div>
  );
};

export default CartPage;
