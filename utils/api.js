import { useRuntimeConfig } from '#app'

export const useApi = () => {
  const config = useRuntimeConfig()

  const handleResponse = async (response) => {
    if (!response.ok) {
      const errorData = await response.json().catch(() => ({}));
      if (Array.isArray(errorData.error)) {
        // If it's an array of validation errors
        const errorMessages = errorData.error.map(err => {
          // Correct the typo in the error message
          return err.message.replace('feild', 'field');
        }).join(', ');
        throw new Error(errorMessages);
      } else {
        throw new Error(errorData.message || response.statusText || 'API call failed');
      }
    }
    return response.json();
  }

  const get = async (endpoint) => {
    const response = await fetch(`${config.public.apiBase}${endpoint}`);
    return handleResponse(response);
  }

  const post = async (endpoint, data) => {
    const response = await fetch(`${config.public.apiBase}${endpoint}`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(data),
    });
    return handleResponse(response);
  }

  return {
    get,
    post,
  }
}