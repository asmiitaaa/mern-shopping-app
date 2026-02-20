import { createContext, useContext, useState, useEffect } from "react";
import axios from "../../api/axios";
import { useAuth } from "./AuthContext";

const CartContext = createContext();

export const CartProvider = ({ children }) => {
  const [cart, setCart] = useState(null);
  const [cartCount, setCartCount] = useState(0);
  const { user } = useAuth();

  // Fetch cart when user logs in
  useEffect(() => {
    if (user) {
      fetchCart();
    } else {
      setCart(null);
      setCartCount(0);
    }
  }, [user]);

  const fetchCart = async () => {
    try {
      const { data } = await axios.get("/cart");
      setCart(data);
      setCartCount(data.items.length);
    } catch (error) {
      console.log(error);
    }
  };

  const addToCart = async (productId, quantity = 1) => {
    try {
      const { data } = await axios.post("/cart/add", { productId, quantity });
      setCart(data);
      setCartCount(data.items.length);
    } catch (error) {
      console.log(error);
    }
  };

  const updateCartItem = async (productId, quantity) => {
    try {
      const { data } = await axios.put("/cart/update", { productId, quantity });
      setCart(data);
      setCartCount(data.items.length);
    } catch (error) {
      console.log(error);
    }
  };

  const removeFromCart = async (productId) => {
    try {
      const { data } = await axios.delete(`/cart/remove/${productId}`);
      setCart(data);
      setCartCount(data.items.length);
    } catch (error) {
      console.log(error);
    }
  };

  const clearCart = async () => {
    try {
      await axios.delete("/cart/clear");
      setCart(null);
      setCartCount(0);
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <CartContext.Provider
      value={{
        cart,
        cartCount,
        fetchCart,
        addToCart,
        updateCartItem,
        removeFromCart,
        clearCart,
      }}
    >
      {children}
    </CartContext.Provider>
  );
};

export const useCart = () => useContext(CartContext);
