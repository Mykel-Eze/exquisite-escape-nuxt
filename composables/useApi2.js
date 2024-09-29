// composables/useApi.js
import { useRuntimeConfig } from '#app'

export const useApi2 = () => {
  const config = useRuntimeConfig()
  const apiBase = config.public.apiBase

  const callApi = async (endpoint, method = 'GET', body = null, headers = {}) => {
    const url = `${apiBase}${endpoint}`
    
    const options = {
      method,
      headers: {
        'Content-Type': 'application/json',
        ...headers
      }
    }

    if (body) {
      options.body = JSON.stringify(body)
    }

    const response = await fetch(url, options)
    
    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`)
    }
    
    return await response.json()
  }

  return {
    callApi
  }
}