import { apiRequest } from './client'

export const listFoodApi = () => {
  return apiRequest('/food')
}
