import React from "react";
import "./Cart.css";
import CartRow from "./CartRow";
import { useProduct } from "../../contexts/ProductContext";

export default function Cart() {
  const { cart } = useProduct();
  console.log(cart);
  const totalPrice = cart.reduce((acc, product) => acc + product.price, 0);
  console.log(`Total price: ${totalPrice.toFixed(2)}`);

  if (cart.length !== 0) {
    return (
      <div className="small-container cart-page">
        <table>
          <tbody>
            <tr>
              <th>Product</th>
              <th>Quantity</th>
              <th>Subtotal</th>
            </tr>

            {cart.map((item) => {
              return <CartRow key={item.id} item={item} />;
            })}
          </tbody>
        </table>

        <div className="total-price">
          <table>
            <tbody>
              <tr>
                <td>Subtotal</td>
                <td>Rs.{totalPrice}</td>
              </tr>
              <tr>
                <td>Tax</td>
                <td>Rs.50</td>
              </tr>
              <tr>
                <td>Total</td>
                <td>Rs.{totalPrice + 50}</td>
              </tr>
            </tbody>
          </table>
        </div>
      </div>
    );
  } else {
    return (
      <div
        style={{ display: "flex", justifyContent: "center", height: "45.5vh" }}
      >
        <h1>Your Cart is Empty!</h1>
      </div>
    );
  }
}
