import { apiRequest } from './client'

export const placeOrderApi = (orderData) => {
  return apiRequest('/orders/place', {
    method: 'POST',
    body: JSON.stringify(orderData)
  })
}

export const getMyOrdersApi = () => {
  return apiRequest('/orders/my')
}
