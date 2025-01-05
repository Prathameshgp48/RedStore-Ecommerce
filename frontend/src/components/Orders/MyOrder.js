import axios from 'axios';
import React, { useEffect, useState } from 'react'
import OrderCard from './OrderCard';

function MyOrder() {
  const [orders, setOrders] = useState();

  useEffect(() => {
    const fetchOrders = async () => {
      try {
        // const response = await axios.post('http://localhost:8000/api/v1/orders/myorders')
        const response = await axios.post('https://redstore-ecommerce-nlqa.onrender.com/api/v1/orders/myorders')
        if (response.status === 200) {
          setOrders(response.data.orders)
          console.log("orders", response.data.orders);
        }
      } catch (error) {
        console.error(error);
      }
    }
    fetchOrders()
  }, [])



  return (
    <div className="container grid grid-cols-1 px-10 pb-3 min-h-96 mb-9">
        {orders?.map((order) => (
          <OrderCard key={order.id} order={order}/>
        ))}
    </div>
  )
}

export default MyOrder
