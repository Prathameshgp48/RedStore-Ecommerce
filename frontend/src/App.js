import { Route, Routes } from "react-router-dom";
import "./App.css";
import Home from "./components/Home/Home.js";
import Products from "./components/Products/Products.js";
import Cart from "./components/Cart/Cart.js";
import Login from "./components/Login/Login.js"
import Register from "./components/Register/Register.js"
import Layout from "./Layout.js";
import ProductDetails from "./components/SingleProduct/ProductDetails.js";
import { useAuth } from "./contexts/AuthContext.js";
import ShippingAddress from "./components/Address/ShippingAddress.js";
import VerifyOrder from "./components/Verify/VerifyOrder.js";
import UserOrder from "./components/Orders/UserOrder.js";

function App() {
  const { isAuthenticated } = useAuth()

  return (
    <>
      <Routes>
        <Route path="/" element={<Layout />}>
          <Route path="/" element={<Home />} />
          <Route path="/login" element={isAuthenticated ? <div className="container flex justify-center items-center h-96">404 page not found</div> : <Login />} />
          <Route path="/register" element={isAuthenticated ? <div className="container flex justify-center items-center h-96">404 page not found</div> : <Register />} />
          <Route path="/products" element={<Products />} />
          <Route path="products/:id" element={<ProductDetails />} />
          <Route path="/cart" element={isAuthenticated ? <Cart /> : <div className="container flex justify-center items-center h-96">404 page not found</div>} />
          <Route path="*" element={<div className="container flex justify-center items-center h-96">404 page not found</div>} />
          <Route path="/checkout/address" element={isAuthenticated ? <ShippingAddress />: <div className="container flex justify-center items-center h-96">404 page not found</div>} />
          <Route path="/verify" element={isAuthenticated ? <VerifyOrder />: <div className="container flex justify-center items-center h-96">404 page not found</div>}/>
          <Route path="/myorders" element = {isAuthenticated ? <UserOrder />: <div className="container flex justify-center items-center h-96">404 page not found</div>}/>
        </Route>
      </Routes>
    </>
  );
}

export default App;
