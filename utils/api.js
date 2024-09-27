import { useRuntimeConfig } from '#app'

export const useApi = () => {
  const config = useRuntimeConfig()

  const handleResponse = async (response) => {
    const contentType = response.headers.get("content-type");
    if (contentType && contentType.indexOf("application/json") !== -1) {
      const data = await response.json();
      // console.log("API Response Data:", data); // Debugging log
      if (!response.ok) {
        if (Array.isArray(data.error)) {
          const errorMessages = data.error.map(err => err.message.replace('feild', 'field')).join(', ');
          throw new Error(errorMessages);
        } else {
          throw new Error(data.message || response.statusText || 'API call failed');
        }
      }
      return data;
    } else {
      const text = await response.text();
      // console.log("API Response Text:", text); // Debugging log
      if (!response.ok) {
        throw new Error(text || response.statusText || 'API call failed');
      }
      return text;
    }
  }

  const get = async (endpoint) => {
    const response = await fetch(`${config.public.apiBase}${endpoint}`);
    return handleResponse(response);
  }

  const post = async (endpoint, data) => {
    // console.log("API Request:", endpoint, data); // Debugging log
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