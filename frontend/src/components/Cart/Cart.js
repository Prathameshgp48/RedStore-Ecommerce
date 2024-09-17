import React, { useEffect, useState } from "react"
import "./Cart.css"
import CartRow from "./CartRow.js"
import { useNavigate } from "react-router-dom"
import { useProduct } from "../../contexts/ProductContext.js"
import LoadingSpinner from "../Loader/LoadingSpinner.js"
// import ImageComponent from "../../ImageComponent.js"
import emptyCart from "../../assets/empty-cart.jpg"

export default function Cart() {
  const [total, setTotal] = useState(0)
  const { setTotalPrice, cart, loading } = useProduct()
  
  const navigate = useNavigate()

  useEffect(() => {
    const totalPrice = cart.reduce((acc, product) => acc + Number(product.price) * product.quantity, 0)
    setTotal(totalPrice)
    setTotalPrice(totalPrice)
  }, [cart, setTotalPrice])

  if (loading) {
    return (
      <div className="flex justify-center items-center h-screen">
        <LoadingSpinner />
      </div>
    )
  }

  if (cart.length !== 0) {
    return (
      <div className="container grid grid-cols-1 md:grid-cols-2 px-10 pb-3 h-auto">
        <table className="w-4/5 mx-auto my-10 border-collapse border">
          <thead>
            <tr className="bg-gray-200">
              <th className="text-left py-2 px-4">Product</th>
              <th className="text-left py-2 pr-4">Size</th>
              <th className="text-left py-2 px-4">Quantity</th>
              <th className="text-left py-2 px-4">Price</th>
            </tr>
          </thead>
          <tbody>
            {cart.map((item) => (
              <CartRow key={`${item.id}-${item.size}`} item={item} />
            ))}
          </tbody>
        </table>

        <div className="mr-36 flex justify-end items-center">
          <table className="max-w-sm">
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
                <td colSpan="2" className="text-center py-4">
                  <button
                    className="bg-red-500 hover:bg-red-400 text-white font-bold py-2 px-4 rounded"
                    onClick={() => navigate("/checkout/address")}
                  >
                    Proceed to Checkout
                  </button>
                </td>
              </tr>
            </tbody>
          </table>
        </div>
      </div>
    )
  } else {
    return (
      <div className="flex justify-center items-center h-96">
        <img className="max-h-52 justify-center items-center"src={emptyCart} alt=""/>
      </div>
    )
  }
}
