/* eslint-disable react-hooks/exhaustive-deps */
import React, { createContext, useEffect, useState } from "react";

export const CartContext = createContext();

const CartContextProvider = ({ children }) => {
  const [cart, setCart] = useState([]);
  const [cantTotal, setCantTotal] = useState(0);
  const [total, setTotal] = useState(0);

  useEffect(() => {
    calcCart();
  }, [cart]);

  useEffect(() => {
    calcTotal();
  }, [cart]);

  function calcCart() {
    setCantTotal(cart.reduce((total, item) => (total += item.count), 0));
  }

  function calcTotal() {
    setTotal(
      cart.reduce((total, item) => (total += item.count * item.price), 0)
    );
  }

  // Añadir al carrito
  const addToCart = (item) => {
    const indexCart = cart.findIndex((cartItem) => cartItem.id === item.id);
    if (indexCart !== -1) {
      const newCart = [...cart];
      newCart[indexCart].count = newCart[indexCart].count + item.count;
      setCart(newCart);
    } else {
      setCart([...cart, item]);
    }
  };

  // Eliminar del carrito
  const removeFromCart = (id) => {
    setCart(cart.filter((detail) => detail.id !== id));
  };

  // Limpiar carrito
  const clear = () => setCart([]);

  return (
    <CartContext.Provider
      value={{ cart, addToCart, removeFromCart, clear, cantTotal, total }}
    >
      {children}
    </CartContext.Provider>
  );
};

export default CartContextProvider;
