import React from "react";
import ImageComponent from "../../ImageComponent";
import "./ProductDetails.css";
import { Link } from "react-router-dom";
import { useProduct } from "../../contexts/ProductContext";

function ProductDetails() {
  const { singleProduct, addToCart } = useProduct();

  const handleCart = () => {
    addToCart(singleProduct);
  };

  if (!singleProduct) {
    return <div>Error: Invalid Product</div>;
  }

  return (
    <div className="small-container product-page">
      <div className="p-col-2">
        <ImageComponent
          imagePath={`/images/${singleProduct.img}`}
          id="productImg"
          altText=""
        />
      </div>
      <div className="p-col-2">
        <h1>{singleProduct.name}</h1>
        <h4>Rs. {singleProduct.price}</h4>
        <select>
          <option>Select Size</option>
          <option>XXL</option>
          <option>XL</option>
          <option>L</option>
          <option>M</option>
          <option>S</option>
        </select>
        <Link to={"/cart"} className="cart-btn" onClick={handleCart}>
          Add To Cart
        </Link>
      </div>
    </div>
  );
}

export default ProductDetails;
