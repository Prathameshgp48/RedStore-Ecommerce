import React, { useState, useEffect } from "react"
import Card from "../Card/Card.js"
import axios from "axios"
import Skeleton from "../Card/Skeleton.js"
import { Link } from "react-router-dom"

export default function Products() {
  //ui management
  const [loading, setLoading] = useState(true)

  //product state management
  const [filter, setFilter] = useState("Show All")
  const [products, setProducts] = useState([])
  const [category, setCategory] = useState("")


  useEffect(() => {
    ;(async () => {
      try {
        const response = await axios.get(
          `http://localhost:8000/api/v1/users/products?category=${category === "Show All" ? "" : category
          }`
        );
        console.log("API Response:", response.data.products);
        if (Array.isArray(response.data)) {
          setProducts(response.data);
        } else if (
          typeof response.data === "object" &&
          response.data.products
        ) {
          setProducts(response.data.products);
          // setAllProducts(response.data.products);
        } else {
          console.error("Unexpected response format:", response.data);
        }
      } catch (error) {
        console.error("Error fetching products:", error);
      }
    })();

    setTimeout(() => {
      setLoading(false);
    }, 1000);
  }, [category]);

  const handleFilter = (category) => {
    if (category === "Show All") {
      setCategory("");
    } else {
      setCategory(category);
    }
    setFilter(category);
    setLoading(true);
  };


  return (
    <div className="py-10 px-4 sm:px-6">
      <div className="max-w-6xl mx-auto">
        <div className="mb-6 flex flex-col items-center">
          <div className="flex flex-wrap justify-center space-x-2">
            {["Show All", "T-shirt", "Joggers", "Sports Shoes"].map(
              (category) => (
                <button
                  key={category}
                  className={`px-4 py-2 rounded-md ${filter === category
                    ? "bg-red-500 text-white"
                    : "bg-gray-200 text-gray-700"
                    } transition-colors duration-200`}
                  onClick={() => handleFilter(category)}
                >
                  {category}
                </button>
              )
            )}
          </div>
        </div>
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
          {loading
            ? Array(8)
              .fill(0)
              .map((_, index) => <Skeleton key={index} />)
            : products.map((product) => (
              <Link
                to={`/products/${product.product_id}`}
                key={product.product_id}
              >
                <Card product={product} />
              </Link>
            ))}
        </div>
      </div>
    </div>
  );
}
