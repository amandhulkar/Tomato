import { apiRequest } from './client'

export const listOrdersApi = () => apiRequest('/orders')

export const updateOrderStatusApi = (id, orderStatus) => {
  return apiRequest(`/orders/${id}/status`, {
    method: 'PATCH',
    body: JSON.stringify({ orderStatus })
  })
}
