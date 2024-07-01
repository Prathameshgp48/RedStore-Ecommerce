import React from "react";
// import { Link } from "react-router-dom";
import ImageComponent from "../../ImageComponent.js";
import { useProduct } from "../../contexts/ProductContext.js";

export default function Card({ product }) {
  const { selectProduct } = useProduct();

  const handleClick = () => {
    selectProduct(product);
    console.log(product);
  };

  // console.log("From card.js ~line 14:",product);
  return (
    <div
      className="flex flex-col items-start w-full md:w-1/5 p-2 min-w-[200px] mb-12 transition-transform duration-500 hover:transform hover:-translate-x-1"
      onClick={handleClick}
    >
      <div className="w-full">
        <ImageComponent
          imagePath={product.productimgurl}
          altText={product.name}
          className="w-full h-auto"
        />
      </div>
      <h4 className="text-gray-700 font-normal my-1">{product.name}</h4>
      <div className="flex my-1">
        <i className="rate fa-solid fa-star text-[#ff523b] mr-1"></i>
        <i className="rate fa-solid fa-star text-[#ff523b] mr-1"></i>
        <i className="rate fa-solid fa-star text-[#ff523b] mr-1"></i>
        <i className="rate fa-solid fa-star text-[#ff523b] mr-1"></i>
        <i className="rate fa-regular fa-star text-[#ff523b] mr-1"></i>
      </div>
      <p className="text-sm my-1">Rs. {product.price}</p>
    </div>
  );
}
