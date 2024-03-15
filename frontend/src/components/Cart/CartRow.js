import React from "react";
import { useProduct } from "../../contexts/ProductContext";
import ImageComponent from "../../ImageComponent";

function CartRow({ item }) {
  const { quantity, setQuantity, removeCart } = useProduct();

  const handleQuantity = (e) => {
    setQuantity(e.target.value);
  };

  const remove = () => {
    removeCart(item.id);
  };

  return (
    <tr>
      <td>
        <div className="cart-info">
          <ImageComponent imagePath={`/images/${item.img}`} />
          <div>
            <p>{item.name}</p>
            <small>Price: Rs.{item.price}</small>
            <br />
            <button onClick={remove}>Remove</button>
          </div>
        </div>
      </td>
      <td>
        <input
          type="number"
          min={1}
          max={10}
          onChange={handleQuantity}
          value={quantity}
        />
      </td>
      <td>Rs.{item.price * quantity}</td>
    </tr>
  );
}

export default CartRow;
