import React from "react";
import { useProduct } from "../../contexts/ProductContext.js";
import ServerUrl from "../../constant.js";
import { toast } from "react-toastify";
import axios from "axios";
// import ImageComponent from "../../ImageComponent.js";

function CartRow({ item }) {

  const { removeCart, setQuantity, cart } = useProduct();
  const handleQuantityChange = (e) => {
    setQuantity(item.id);
  };

  const handleRemove = async () => {
    const productId = item.product_id
    console.log(productId)
    try {
      const response = await axios.post(`${ServerUrl}/removefromcart`, { productId })
      console.log(response.data)
      if (response.status == 200) {
        toast.success(response.data?.message || "Product Removed From the Cart")
        removeCart(item.id)
      }

    } catch (error) {
      console.log(error)
      toast.error("Something went wrong")
    }
  };

  return (

    <tr>
      <td>
        <div className="flex flex-wrap">
          <img src={item.product_img} alt={item.product_name} />
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
