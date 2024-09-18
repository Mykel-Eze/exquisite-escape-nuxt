import { defineNuxtPlugin } from "#app";

export default defineNuxtPlugin((nuxtApp) => {
  // Set base URL for Axios

  const config = useRuntimeConfig();

  nuxtApp.$axios.defaults.baseURL = config.public.BASE_URL;
  // Add request interceptors, response interceptors, etc. if needed

  // Expose Axios instance globally
  nuxtApp.provide("axios", nuxtApp.$axios);
});
