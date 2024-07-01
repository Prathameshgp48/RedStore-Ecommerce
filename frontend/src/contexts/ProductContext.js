import React, { createContext, useContext, useState } from "react";

const ProductContext = createContext();

export const ProductContextProvider = ({ children }) => {
  const [singleProduct, setSingleProduct] = useState(null);
  const [cart, setCart] = useState([]);

  const selectProduct = (product) => {
    setSingleProduct(product);
  };

  const addToCart = (product) => {
    const checkCart = (cart, product) => {
      return cart.some((item) => item.id === product.id);
    };

    if (!checkCart(cart, product)) {
      setCart((prevCart) => [...prevCart, { ...product, quantity: 1 }]); // Add quantity property to the product being added
    }
  };

  const removeCart = (id) => {
    setCart((prev) => prev.filter((cart) => cart.id !== id));
  };

  const setQuantity = (productId, quantity) => {
    setCart((prevCart) =>
      prevCart.map((item) =>
        item.id === productId ? { ...item, quantity: parseInt(quantity) } : item
      )
    );
  };

  return (
    <ProductContext.Provider
      value={{
        selectProduct,
        singleProduct,
        cart,
        addToCart,
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
