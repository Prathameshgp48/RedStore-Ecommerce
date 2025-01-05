import React, { useEffect } from 'react'
import { useNavigate, useSearchParams } from 'react-router-dom'
import ServerUrl from '../../constant.js'
import axios from 'axios'
import { toast } from 'react-toastify'
import { useProduct } from '../../contexts/ProductContext.js'

function VerifyOrder() {
    const [searchParams, setSearchParams] = useSearchParams()
    const navigate = useNavigate()
    const success = searchParams.get("success")
    const orderId = searchParams.get("orderId")
    const { setCheckout } = useProduct()

    const verifyPayment = async () => {
        try {
            // const response = await axios.post(`http://localhost:8000/api/v3/orders/verifyOrder`, { success, orderId })
            const response = await axios.post(`https://redstore-ecommerce-nlqa.onrender.com/api/v1/orders/verifyOrder`, { success, orderId })
            console.log(response.data)
            if (response.data.success === 'true') {
                navigate('/myorders')
                setCheckout(true)
                toast.success(response.data.message || "Order Placed Successfully🥳")
            } else {
                toast.error("Something went wrong😑")
                navigate("/")
            }
        } catch (error) {
            console.log(error)
        }
    }

    useEffect(() => {
        verifyPayment()
    })

    return (
        <div>
            Verify
        </div>
    )
}

export default VerifyOrder
