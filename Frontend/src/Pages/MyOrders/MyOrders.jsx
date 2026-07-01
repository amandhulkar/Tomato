import React, { useEffect, useState } from 'react'
import { getMyOrdersApi } from '../../api/orderApi'
import './myorders.css'

const formatStatus = (status) => status?.replaceAll('_', ' ')

const MyOrders = () => {
  const [orders, setOrders] = useState([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState('')

  const fetchOrders = async () => {
    try {
      setLoading(true)
      const data = await getMyOrdersApi()
      setOrders(data.orders)
    } catch (err) {
      setError(err.message)
    } finally {
      setLoading(false)
    }
  }

  useEffect(() => {
    fetchOrders()
  }, [])

  return (
    <div className='my-orders'>
      <h1>My Orders</h1>
      {loading && <p>Loading your orders...</p>}
      {error && <p className='my-orders-error'>{error}</p>}
      {!loading && orders.length === 0 && <p>No orders found.</p>}
      <div className="my-orders-list">
        {orders.map((order) => (
          <div key={order._id} className="my-order-card">
            <div>
              <h3>Order #{order._id.slice(-6)}</h3>
              <p>{new Date(order.createdAt).toLocaleString()}</p>
            </div>
            <div>
              <b>Items</b>
              {order.items.map((item) => (
                <p key={`${order._id}-${item.food}`}>{item.name} x {item.quantity}</p>
              ))}
            </div>
            <div>
              <b>Delivery Address</b>
              <p>{order.deliveryAddress?.street}</p>
              <p>{order.deliveryAddress?.city}, {order.deliveryAddress?.state}</p>
              <p>{order.deliveryAddress?.phone}</p>
            </div>
            <div>
              <p><b>Total:</b> ₹{order.total}</p>
              <p><b>Payment:</b> Cash on Delivery ({order.paymentStatus})</p>
              <p><b>Status:</b> <span className='order-status'>{formatStatus(order.orderStatus)}</span></p>
            </div>
          </div>
        ))}
      </div>
    </div>
  )
}

export default MyOrders
