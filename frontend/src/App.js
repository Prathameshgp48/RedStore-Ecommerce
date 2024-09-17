import { Navigate, Route, Routes } from "react-router-dom";
import "./App.css";
import Home from "./components/Home/Home.js";
import Products from "./components/Products/Products.js";
import Cart from "./components/Cart/Cart.js";
import Login from "./components/Login/Login.js"
import Register from "./components/Register/Register.js"
import Layout from "./Layout.js";
import ProductDetails from "./components/SingleProduct/ProductDetails.js";
import { useAuth } from "./contexts/AuthContext.js";
import ShippingAddress from "./components/Checkout/ShippingAddress.js";
import VerifyOrder from "./components/Verify/VerifyOrder.js";
import UserOrder from "./components/Orders/UserOrder.js";
import AddProduct from "./components/AddProduct/AddProduct.js";

function App() {
  const { isAuthenticated } = useAuth()

  return (
    <>
      <Routes>
        <Route path="/" element={<Layout />}>
          <Route path="/" element={<Home />} />
          <Route path="/login" element={isAuthenticated ? <Navigate to="/" /> : <Login />} />
          <Route path="/register" element={isAuthenticated ? <Navigate to="/" /> : <Register />} />
          <Route path="/products" element={<Products />} />
          <Route path="products/:id" element={<ProductDetails />} />
          <Route path="/cart" element={isAuthenticated ? <Cart /> : <Navigate to="/login" />} />
          <Route path="*" element={<Navigate to="/login" />} />
          <Route path="/checkout/address" element={isAuthenticated ? <ShippingAddress /> : <Navigate to="/login" />} />
          <Route path="/verify" element={isAuthenticated ? <VerifyOrder /> : <Navigate to="/login" />} />
          <Route path="/myorders" element={isAuthenticated ? <UserOrder /> : <Navigate to="/login" />} />
          <Route path="/admin" element={<AddProduct />} />
        </Route>
      </Routes>
    </>
  );
}

export default App;
