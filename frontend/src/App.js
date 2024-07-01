import { BrowserRouter, Route, Routes } from "react-router-dom";
import "./App.css";
import Navbar from "./components/Navbar/Navbar.js";
import Home from "./components/Home/Home.js";
import Products from "./components/Products/Products.js";
import Cart from "./components/Cart/Cart.js";
import Account from "./components/Login/Login.js";
import Footer from "./components/Footer/Footer.js";

function App() {
  return (
    <BrowserRouter>
      <div className="App">
        <Navbar />
        <Routes>
          <Route path="/" element={<Home />}></Route>
          <Route path="/products" element={<Products />}>
            <Route path="/:id" element ={<PrductDetails/>} />
          </Route>
          <Route path="/cart" element={<Cart />}></Route>
          <Route path="/account" element={<Account />}></Route>
        </Routes>
        <Footer />
      </div>
    </BrowserRouter>
  );
}

export default App;
