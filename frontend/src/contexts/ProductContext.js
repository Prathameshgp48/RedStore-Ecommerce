import React, { createContext, useContext, useState } from "react";

const ProductContext = createContext();

export const ProductContextProvider = ({ children }) => {
  const [singleProduct, setSingleProduct] = useState(null);
  const [cart, setCart] = useState([]);
  const [totalPrice, setTotalPrice] = useState();
  const [checkout, setCheckout] = useState(false)

  const selectProduct = (product) => {
    setSingleProduct(product);
  };

  const addToCart = async (product, quantity, size) => {
    const newCartItem = { ...product, quantity, size }
    setCart((prevCart) => [...prevCart, newCartItem])

    // if (!checkCart(cart, product)) {

    // }
  };

  const removeCart = (id) => {
    setCart((prev) => prev.filter((cart) => cart.id !== id));
  };

  // const setQuantity = (productId, quantity) => {
  //   setCart((prevCart) =>
  //     prevCart.map((item) =>
  //       item.id === productId ? { ...item, quantity: parseInt(quantity) } : item
  //     )
  //   );
  // };

  return (
    <ProductContext.Provider
      value={{
        selectProduct,
        singleProduct,
        cart,
        addToCart,
        removeCart,
        setTotalPrice,
        totalPrice,
        checkout,
        setCheckout
      }}
    >
      {children}
    </ProductContext.Provider>
  );
};

export const useProduct = () => {
  return useContext(ProductContext);
};
