import React, { useState } from "react";
import Card from "../Card/Card";
import "./Products.css";
import data from "../../data.js";

export default function Products() {
  const [list, setList] = useState([...data]);
  console.log(list);

  const card = list.map((item) => {
    return <Card key={item.id} {...item} />;
  });

  const handleFilter = () => {
    
  }

  return (
    <div>
      <div className="small-container">
        <div className="header">
          <h3>All Products</h3>
          <div className="btnContainer">
            <button>Show All</button>
            <button>T-shirt</button>
            <button>Joggers</button>
            <button>Sports Shoes</button>
          </div>
        </div>
        <div className="row row-2">{card}</div>
      </div>
    </div>
  );
}
