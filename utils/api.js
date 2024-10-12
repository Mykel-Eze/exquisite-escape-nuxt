// utils/api.js
import { useRuntimeConfig } from '#app'

export const useApi = () => {
  const config = useRuntimeConfig()

  const handleResponse = async (response) => {
    const contentType = response.headers.get("content-type");
    if (contentType && contentType.indexOf("application/json") !== -1) {
      const data = await response.json();
      if (!response.ok) {
        throw new Error(data.message || response.statusText);
      }
      return data;
    } else {
      const text = await response.text();
      if (!response.ok) {
        throw new Error(text || response.statusText);
      }
      return text;
    }
  }

  const get = async (endpoint, options = {}) => {
    const url = `${config.public.apiBase}${endpoint}`;
    const response = await fetch(url, {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
        ...options.headers,
      },
      ...options,
    });
    return handleResponse(response);
  }

  const post = async (endpoint, data, options = {}) => {
    const url = `${config.public.apiBase}${endpoint}`;
    const response = await fetch(url, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        ...options.headers,
      },
      body: JSON.stringify(data),
      ...options,
    });
    return handleResponse(response);
  }

  return {
    get,
    post,
  }
}