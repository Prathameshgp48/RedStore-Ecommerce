import axios from "axios";
import React, { createContext, useContext, useEffect, useState } from "react";
const ProductContext = createContext();

export const ProductContextProvider = ({ children }) => {
  const [singleProduct, setSingleProduct] = useState(null)
  const [cart, setCart] = useState([])
  const [totalPrice, setTotalPrice] = useState()
  const [checkout, setCheckout] = useState(false)
  const [loading, setLoading] = useState(false)

  const selectProduct = (product) => {
    setSingleProduct(product);
  };

  const addToCart = async (product, quantity, size) => {
    const newCartItem = { ...product, quantity, size}
    setCart((prevCart) => {
      const updatedCart = [...prevCart, newCartItem]
      return updatedCart
    })

  };

  const removeCart = (id) => {
    setCart((prev) => prev.filter((cart) => cart.id !== id));
  };

  const loadCartData = async (authStatus) => {
    console.log(authStatus)
    if (authStatus) {
      try {
        const response = await axios.get(`http://localhost:8000/api/v1/cart/cart`, {
          withCredentials: true
        })
        console.log(response.data)
        setCart(response.data)
      } catch (error) {
        console.log(error)
      }
    }
  }

  useEffect(() => {
    const loadData = async () => {
      setLoading(true)
      if (localStorage.getItem("isAuthenticated")) {
        await loadCartData(localStorage.getItem("isAuthenticated"))
      }
      setLoading(false)
    }
    loadData()
  }, [])

  useEffect(() => {
    console.log("Cart updated: ", cart);  // Log cart state whenever it changes
  }, [cart])  

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
        setCheckout,
        loading
      }}
    >
      {children}
    </ProductContext.Provider>
  );
};

export const useProduct = () => {
  return useContext(ProductContext);
};
