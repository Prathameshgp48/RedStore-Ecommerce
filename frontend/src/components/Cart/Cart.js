import React from "react";
import "./Cart.css";
import CartRow from "./CartRow.js";
import { useProduct } from "../../contexts/ProductContext.js";

export default function Cart() {
  const { cart } = useProduct();
  const totalPrice = cart.reduce((acc, product) => acc + product.price * product.quantity, 0); // Ensure total is calculated with quantity

  if (cart.length !== 0) {
    return (
      <div className="container mx-20 px-25">
        <table className="w-full border-collapse">
          <thead>
            <tr>
              <th className="text-left py-2 px-4 bg-red-500 text-white">Product</th>
              <th className="text-left py-2 px-4 bg-red-500 text-white">size</th>
              <th className="text-left py-2 px-4 bg-red-500 text-white">Quantity</th>
              <th className="text-right py-2 px-4 bg-red-500 text-white">Price</th>
            </tr>
          </thead>
          <tbody>
            {cart.map((item) => (
              <CartRow key={item.id} item={item} />
            ))}
          </tbody>
        </table>

        <div className="flex justify-end mt-6">
          <table className="w-full max-w-sm border-t-4 border-red-500">
            <tbody>
              <tr>
                <td className="py-2 px-4">Subtotal</td>
                <td className="text-right py-2 px-4">Rs.{totalPrice}</td>
              </tr>
              <tr>
                <td className="py-2 px-4">Tax</td>
                <td className="text-right py-2 px-4">Rs.50</td>
              </tr>
              <tr>
                <td className="py-2 px-4">Total</td>
                <td className="text-right py-2 px-4">Rs.{totalPrice + 50}</td>
              </tr>
            </tbody>
          </table>
        </div>
      </div>
    );
  } else {
    return (
      <div className="flex justify-center items-center h-96">
        <h1>Your Cart is Empty!</h1>
      </div>
    );
  }
}
