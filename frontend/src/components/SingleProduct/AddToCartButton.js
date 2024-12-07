import axios from 'axios'
import React from 'react'
import { useProduct } from '../../contexts/ProductContext.js'
import { useNavigate } from 'react-router-dom'
import { useAuth } from '../../contexts/AuthContext.js'
import { toast } from 'react-toastify'

function AddToCartButton({ product, quantity, selectedSize }) {
    const { addToCart } = useProduct()
    const { isAuthenticated, setlogout } = useAuth()
    const navigate = useNavigate()

    const handleAddToCart = async () => {

        if (!isAuthenticated) {
            toast.error("Please login first")
            navigate('/login')
            return
        }

        if (selectedSize === "Select Size") {
            toast.error("Please select a size")
            return
        }

        try {
            // const response = await axios.post("http://localhost:8000/api/v1/users/addtocart", {
            //     product: product,
            //     quantity: quantity,
            //     size: selectedSize
            // },
            //     {
            //         withCredentials: true
            //     }
            // )

            const response = await axios.post("https://redstore-ecommerce-nlqa.onrender.com/api/v1/users/addtocart", {
                product: product,
                quantity: quantity,
                size: selectedSize
            },
                {
                    withCredentials: true
                }
            )

            if (response.status === 200) {
                console.log("Product added to cart", response.data.product)
                toast.success('Product added to cart')
                addToCart(response.data.product, response.data.product.quantity, response.data.product.size)
            }
        } catch (error) {
            // Server responded with a status other than 200 range
            console.log('Error adding to cart:', error.response.data);
            if (error.response.data.message === "Invalid token") {
                toast.error("Session Expired!Please login again")
                setlogout()
                navigate('/login')
            }

            return
        }
    }

    return (
        <button
            className="inline-block bg-red-500 text-white py-2 px-6 rounded-full transition-transform duration-200 transform hover:scale-105"
            onClick={handleAddToCart}
        >
            Add To Cart
        </button>
    )
}

export default AddToCartButton

