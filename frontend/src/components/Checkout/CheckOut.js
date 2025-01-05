import axios from 'axios'
import React from 'react'
import ServerUrl from '../../constant.js'
import { useProduct } from '../../contexts/ProductContext'
import { useNavigate } from 'react-router-dom'

function CheckOut() {
    const { totalPrice, cart } = useProduct()
    const navigate = useNavigate()

    const handleCheckout = async (e) => {
        e.preventDefault()
        try {
            // const response = await axios.post(`http://localhost:8000/api/v1/orders/checkout`)
            const response = await axios.post(`https://redstore-ecommerce-nlqa.onrender.com/api/v1/orders/checkout`)
            console.log(response.data)

            if (response.data.success === true) {
                window.location.href = response.data.session_url
                navigate("/myorders")
            } else {
                console.error('Checkout failed:', response.data.message)
                navigate("/")
            }
        } catch (error) {
            console.log(error)
            navigate("/")
        }
    }

    return (
        <button onClick={handleCheckout} className="w-full bg-red-500 hover:bg-red-400 text-white font-bold py-2 px-4 rounded">
            Checkout
        </button>
    )
}

export default CheckOut
