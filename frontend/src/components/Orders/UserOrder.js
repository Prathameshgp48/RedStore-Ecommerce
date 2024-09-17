import axios from 'axios';
import React, { useEffect, useState } from 'react'

function UserOrder() {
  const [orders, setOrders] = useState();

  useEffect(() => {
    const fetchOrders = async () => {
      try {
        const response = await axios.post('http://localhost:8000/api/v3/orders/myorders')
        if (response.status === 200) {
          setOrders(response.data.orders)
        }
      } catch (error) {
        console.error(error);
      }
    }
    fetchOrders()
  }, [])



  return (
    <div>

    </div>
  )
}

export default UserOrder
