import { apiRequest } from './client'

export const signupApi = (formData) => {
  return apiRequest('/auth/signup', {
    method: 'POST',
    body: JSON.stringify(formData)
  })
}

export const loginApi = (formData) => {
  return apiRequest('/auth/login', {
    method: 'POST',
    body: JSON.stringify(formData)
  })
}

export const getMeApi = () => {
  return apiRequest('/auth/me')
}
