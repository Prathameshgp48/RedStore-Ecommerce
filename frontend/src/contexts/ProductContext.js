import React, { createContext, useContext, useState } from "react";

const ProductContext = createContext();

export const ProductContextProvider = ({ children }) => {
  const [singleProduct, setSingleProduct] = useState(null);
  const [quantity, setQuantity] = useState(1);
  const [cart, setCart] = useState([]);

  const selectProduct = (product) => {
    setSingleProduct(product);
  };

  const addToCart = (product) => {
    const checkCart = (cart, product) => {
      return cart.some((item) => item.id === product.id);
    };

    if (!checkCart(cart, product)) {
      setCart((prevCart) => [...prevCart, product]);
    }
  };

  const removeCart = (id) => {
    setCart((prev) => prev.filter((cart) => cart.id !== id));
  };

  return (
    <ProductContext.Provider
      value={{
        selectProduct,
        singleProduct,
        cart,
        addToCart,
        quantity,
        setQuantity,
        removeCart,
      }}
    >
      {children}
    </ProductContext.Provider>
  );
};

export const useProduct = () => {
  return useContext(ProductContext);
};
