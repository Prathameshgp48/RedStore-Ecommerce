import React, { useEffect, useState } from "react";
import "./Cart.css";
import CartRow from "./CartRow.js";
// import { useProduct } from "../../contexts/ProductContext.js";
import axios from "axios"

export default function Cart() {
  // const { cart } = useProduct();
  const [cart, setCart] = useState([]);
  // const totalPrice = cart.reduce((acc, product) => acc + product.price * product.quantity, 0); // Ensure total is calculated with quantity
  const [total, setTotal] = useState(0);

  useEffect(() => {
    ; (async () => {
      try {
        const response = await axios.get("http://localhost:8000/api/v1/users/cart")
        console.log(response.data)
        setCart(response.data)
      } catch (error) {
        console.log(error)
      }
    })();


  }, [])

  useEffect(() => {
    if (cart.length > 0) {
      const totalPrice = cart.reduce((acc, product) => acc + Number(product.price) * product.quantity, 0);
      setTotal(totalPrice)
    }
  }, [cart])

  if (cart.length !== 0) {
    return (
      <div className="container grid grid-cols-1 md:grid-cols-2 px-25">
        <table className="w-4/5 mx-auto my-10 border-collapse border">
          <thead>
            <tr className="bg-gray-200">
              <th className="text-left py-2 px-4">Product</th>
              <th className="text-left py-2 pr-4">size</th>
              <th className="text-left py-2 px-4">Quantity</th>
              <th className="text-left py-2 px-4">Price</th>
            </tr>
          </thead>
          <tbody>
            {cart.map((item) => (
              <CartRow key={item.id} item={item} />
            ))}
          </tbody>
        </table>

        <div className="mr-36 flex justify-end items-center">
          <table className="max-w-sm px-{auto}">
            <tbody>
              <tr className="bg-white-200 border-b border-gray-600">
                <td className="px-4">Subtotal</td>
                <td className="text-right px-4">Rs.{total}</td>
              </tr>
              <tr className="bg-white-200 border-b border-gray-600">
                <td className="px-4">Tax</td>
                <td className="text-right px-4">Rs.50</td>
              </tr>
              <tr className="bg-white-200">
                <td className="px-4">Total</td>
                <td className="text-right px-4">Rs.{total + 50}</td>
              </tr>
              <tr>
                <td colSpan="2" className="border-orange-500 flex justify-between">
                  <label className="flex items-center">
                    <input type="radio" name="payment-method" className="mr-2 appearance-none rounded-full border-orange-500 border-2 checked:bg-orange-500 checked:border-orange-500 checked:ring-2 checked:ring-orange-500 focus:outline-none" />
                    Online Payment
                  </label>
                </td>
              </tr>
              <tr>
                <td className=" flex justify-between">
                  <label className="flex items-center">
                    <input type="radio" name="payment-method" className="mr-2 appearance-none rounded-full border border-orange-500 checked:bg-orange-500 checked:border-orange-500 focus:outline-none" />
                    Cash on Delivery
                  </label>
                </td>
              </tr>
              <tr>
                <td colSpan="2" className="text-center py-4">
                  <button className="bg-red-500 hover:bg-red-400 text-white font-bold py-2 px-4 rounded">
                    Checkout
                  </button>
                </td>
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
