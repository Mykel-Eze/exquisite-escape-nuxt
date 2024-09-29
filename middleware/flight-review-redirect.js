export default defineNuxtRouteMiddleware((to, from) => {
  // Check if we're on the client-side
  if (process.client) {
    // If the route is exactly '/flight-ticket-review' (no ID)
    if (to.path === '/flight-ticket-review') {
      // Redirect to the flights search results page
      return navigateTo('/search-results/flights');
    }
  }
});