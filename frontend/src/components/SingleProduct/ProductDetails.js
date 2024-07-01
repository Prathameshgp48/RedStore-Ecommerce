import React, { useEffect, useState } from "react";
import { Link, useParams } from "react-router-dom";
import { useProduct } from "../../contexts/ProductContext.js";
import axios from "axios";

function ProductDetails() {
  const { singleProduct, selectProduct, addToCart } = useProduct();
  const [product, setProduct] = useState(singleProduct || null);
  const [loading, setLoading] = useState(true);
  const { id } = useParams();
  console.log(id)

  useEffect(() => {
    const fetchProduct = async () => {
      try {
        const response = await axios.get(
          `http://localhost:8000/api/v1/users/products/${id}`
        );
        // console.log(response.data)
        setProduct(response.data.product)
        selectProduct(response.data.product)
        setLoading(false)
        // console.log(product)
      } catch (error) {
        console.error("Error fetching product:", error);
        setLoading(false)
      }
    };


    if (!singleProduct && !product) {
      fetchProduct();
    } else {
      setLoading(false)
    }
  }, [id, product, singleProduct, selectProduct]);

  const handleCart = () => {
    addToCart(product);
  };

  if (loading) {
    return <div>Loading..</div>
  }

  if (!singleProduct) {
    return <div>Error: Invalid Product</div>;
  }

  return (
    <div className="container mx-auto px-6 py-10">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6 items-center">
        <div className="flex justify-center">
          <img
            src={product.productimgurl}
            alt={product.name}
            className="max-w-[400px] w-full h-auto"
          />
        </div>
        <div className="text-center md:text-left">
          <h1 className="text-4xl md:text-5xl font-semibold mb-4">
            {product.name}
          </h1>
          <h4 className="text-2xl font-semibold text-gray-700 mb-4">
            Rs. {product.price}
          </h4>
          <select className="px-4 py-2 text-center border border-red-500 rounded-full mb-4 mx-4">
            <option>Select Size</option>
            <option>XXL</option>
            <option>XL</option>
            <option>L</option>
            <option>M</option>
            <option>S</option>
          </select>
          <Link
            to="/cart"
            className="inline-block bg-red-500 text-white py-2 px-6 rounded-full transition-transform duration-200 transform hover:scale-105"
            onClick={handleCart}
          >
            Add To Cart
          </Link>
        </div>
      </div>
    </div>
  );
}

export default ProductDetails;
