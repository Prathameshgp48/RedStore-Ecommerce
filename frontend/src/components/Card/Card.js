import React from "react";
import { Link } from "react-router-dom";
import "./Card.css";
import ImageComponent from "../../ImageComponent";
import { useProduct } from "../../contexts/ProductContext";

export default function Card(props) {
  const { selectProduct } = useProduct();

  const handleClick = () => {
    selectProduct(props);
    console.log(props);
  };

  console.log(props);
  return (
    <div className="col-4 card" onClick={handleClick}>
      <Link to={{ pathname: `/products/${props.id}`, state: props }}>
        <div className="image-wrapper">
          <ImageComponent
            imagePath={`/images/${props.img}`}
            altText="My Image"
          />
        </div>
      </Link>
      <h4>{props.name}</h4>
      <div className="rating">
        <i className="rate fa-solid fa-star"></i>
        <i className="rate fa-solid fa-star"></i>
        <i className="rate fa-solid fa-star"></i>
        <i className="rate fa-solid fa-star"></i>
        <i className="rate fa-regular fa-star"></i>
      </div>
      <p>Rs. {props.price}</p>
    </div>
  );
}
