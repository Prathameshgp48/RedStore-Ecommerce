import React from "react";
import "./Home.css";
import ImageComponent from "../../ImageComponent";
import { NavLink } from "react-router-dom";

export default function Home() {
  return (
    <div>
      <div className="home">
        <div className="col-2 home-info">
          <h1>
            Give Your Workout
            <br />A New Style!
          </h1>
          <p>
            Success isn't always about greatness. It's about consistency.
            Consistency hard work gains success. Greatness will come.
          </p>
          <NavLink href="#explore" className="explore">
            Explore <i className="fa-solid fa-arrow-right"></i>
          </NavLink>
        </div>
        <div className="col-2 home-hero">
          <ImageComponent imagePath={"/images/image1.png"} altText="My Image" />
        </div>
      </div>

      {/* Categories */}
      <div className="categories" id="explore">
        <div className="small-container">
          <div className="row">
            <div className="col-3">
              <ImageComponent imagePath={"/images/category-1.jpg"} altText="" />
            </div>
            <div className="col-3">
              <ImageComponent imagePath={"/images/category-2.jpg"} altText="" />
            </div>
            <div className="col-3">
              <ImageComponent imagePath={"/images/category-3.jpg"} altText="" />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
