import React, { useEffect } from 'react'
import { useNavigate, useSearchParams } from 'react-router-dom'
import ServerUrl from '../../constant.js'
import axios from 'axios'
import { toast } from 'react-toastify'

function VerifyOrder() {
    const [searchParams, setSearchParams] = useSearchParams()
    const navigate = useNavigate()
    const success = searchParams.get("success")
    const orderId = searchParams.get("orderId")
    // console.log(success, orderId)

    // if (success === "true") {
    //     navigate(`/order/${orderId}`)
    // } else {
    //     navigate("/")
    // }

    const verifyPayment = async() => {
        try {
            const response = await axios.post(`${ServerUrl}/verifyOrder`,{success, orderId})
            console.log(response.data)
            if (response.data.success === "true") {
                navigate('/myorders')
                toast.success("Order Placed Successfully🥳")
            } else {
                toast.error("Something went wrong😑")
                navigate("/")
            }
        } catch (error) {
            console.log(error)
        }
    }

    useEffect(()=>{
        verifyPayment()
    })

    return (
        <div>
           Verify
        </div>
    )
}

export default VerifyOrder
