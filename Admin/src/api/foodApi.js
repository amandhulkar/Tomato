import { apiRequest } from './client'

export const addFoodApi = (formData) => {
  return apiRequest('/food', {
    method: 'POST',
    body: formData
  })
}

export const listFoodApi = () => apiRequest('/food')

export const removeFoodApi = (id) => {
  return apiRequest(`/food/${id}`, {
    method: 'DELETE'
  })
}

export const updateFoodApi = (id, formData) => {
  return apiRequest(`/food/${id}`, {
    method: 'PUT',
    body: formData
  })
}
