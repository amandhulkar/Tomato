import { apiRequest } from './client'

export const loginApi = (formData) => {
  return apiRequest('/auth/login', {
    method: 'POST',
    body: JSON.stringify(formData)
  })
}

export const getMeApi = () => apiRequest('/auth/me')
