import React from "react";
import ReactDOM from "react-dom/client";
import "./index.css";
import App from "./App.js"
import {
  Route,
  Routes,
  BrowserRouter,

} from "react-router-dom";
import { ProductContextProvider } from "./contexts/ProductContext.js";
import { AuthContextProvider } from "./contexts/AuthContext.js";
import 'react-toastify/dist/ReactToastify.css';
import { ToastContainer } from "react-toastify";

const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(
  <React.StrictMode>
    <BrowserRouter>
      <ProductContextProvider>
        <AuthContextProvider>
          <ToastContainer position="top-center" autoClose={3000} />
          <Routes>
            <Route path="/*" element={<App />} />
          </Routes>
        </AuthContextProvider>
      </ProductContextProvider>
    </BrowserRouter>
  </React.StrictMode>
);
