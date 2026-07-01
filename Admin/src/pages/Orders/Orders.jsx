import { useEffect, useState } from 'react'
import { listOrdersApi, updateOrderStatusApi } from '../../api/orderApi'
import './Orders.css'

const statuses = ['placed', 'confirmed', 'preparing', 'out_for_delivery', 'delivered', 'cancelled']

const formatStatus = (status) => status.replaceAll('_', ' ')

const Orders = () => {
  const [orders, setOrders] = useState([])
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState('')

  const fetchOrders = async () => {
    try {
      setLoading(true)
      const data = await listOrdersApi()
      setOrders(data.orders)
    } catch (err) {
      setError(err.message)
    } finally {
      setLoading(false)
    }
  }

  const updateStatus = async (orderId, orderStatus) => {
    try {
      await updateOrderStatusApi(orderId, orderStatus)
      fetchOrders()
    } catch (err) {
      alert(err.message)
    }
  }

  useEffect(() => {
    fetchOrders()
  }, [])

  return (
    <div className="admin-page orders-page">
      <div className="admin-card">
        <h2>Orders</h2>
        {loading && <p>Loading orders...</p>}
        {error && <p className="admin-error">{error}</p>}
        <div className="orders-list">
          {orders.map((order) => (
            <div key={order._id} className="order-card">
              <div>
                <h3>{order.user?.name || `${order.deliveryAddress?.firstName || ''} ${order.deliveryAddress?.lastName || ''}`}</h3>
                <p>{order.user?.email || order.deliveryAddress?.email}</p>
                <p>{order.deliveryAddress?.phone}</p>
              </div>
              <div>
                <b>Items</b>
                {order.items.map((item) => (
                  <p key={`${order._id}-${item.food}`}>{item.name} x {item.quantity}</p>
                ))}
              </div>
              <div>
                <b>Address</b>
                <p>{order.deliveryAddress?.street}</p>
                <p>{order.deliveryAddress?.city}, {order.deliveryAddress?.state}</p>
                <p>{order.deliveryAddress?.country} - {order.deliveryAddress?.zipCode}</p>
              </div>
              <div>
                <p><b>Total:</b> ₹{order.total}</p>
                <p><b>Payment:</b> COD ({order.paymentStatus})</p>
                <p><b>Date:</b> {new Date(order.createdAt).toLocaleString()}</p>
              </div>
              <select value={order.orderStatus} onChange={(e) => updateStatus(order._id, e.target.value)}>
                {statuses.map((status) => <option key={status} value={status}>{formatStatus(status)}</option>)}
              </select>
            </div>
          ))}
          {!loading && orders.length === 0 && <p>No orders found.</p>}
        </div>
      </div>
    </div>
  )
}

export default Orders
