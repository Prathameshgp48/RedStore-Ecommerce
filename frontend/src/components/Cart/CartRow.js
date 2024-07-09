import React from "react";
import { useProduct } from "../../contexts/ProductContext.js";
// import ImageComponent from "../../ImageComponent.js";

function CartRow({ item }) {
  
  const { removeCart, setQuantity } = useProduct();
  const handleQuantityChange = (e) => {
    setQuantity(item.id);
  };

  const handleRemove = () => {
    removeCart(item.id);
  };
  
  return (
    
    <tr>
      <td>
        <div className="flex flex-wrap">
          <img src={item.product_img} alt={item.product_name}/>
          <div>
            <p>{item.product_name}</p>
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
      <td>Rs.{Number(item.price) * item.quantity}</td> 
    </tr>
  );
}

export default CartRow;
