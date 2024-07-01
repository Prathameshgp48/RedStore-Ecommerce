import React from "react";
import { useProduct } from "../../contexts/ProductContext.js";
import ImageComponent from "../../ImageComponent.js";

function CartRow({ item }) {
  const { removeCart, setQuantity } = useProduct();

  const handleQuantityChange = (e) => {
    setQuantity(item.id, e.target.value);
  };

  const handleRemove = () => {
    removeCart(item.id);
  };

  return (
    <tr>
      <td>
        <div className="flex flex-wrap">
          <img src={item.productimgurl} alt={item.name}/>
          <div>
            <p>{item.name}</p>
            <small>Price: Rs.{item.price}</small>
            <br />
            <button onClick={handleRemove}>Remove</button>
          </div>
        </div>
      </td>
      <td>{item.size}</td>
      <td>
        <input
          type="number"
          min={1}
          max={10}
          value={item.quantity} // Use item.quantity directly
          onChange={handleQuantityChange}
        />
      </td>
      <td>Rs.{item.price * item.quantity}</td> {/* Calculate subtotal using item.quantity */}
    </tr>
  );
}

export default CartRow;
