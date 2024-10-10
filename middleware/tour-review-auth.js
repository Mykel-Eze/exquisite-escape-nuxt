// middleware/tour-review-auth.js
export default defineNuxtRouteMiddleware((to) => {
  if (process.client) {  // Only run on client-side
    const cartItems = JSON.parse(localStorage.getItem('cartItems') || '[]');
    const id = to.params.id;
    console.log('Middleware checking for item with ID:', id);
    if (!cartItems.some(item => item.id === id)) {
      console.log('Item not found in cart, redirecting');
      return navigateTo('/search-results/tours');
    }
    console.log('Item found in cart, proceeding');
  }
});