import { useAuthStore } from '~/store/auth';

export default defineNuxtRouteMiddleware((to, from) => {
  const authStore = useAuthStore();

  // Check if the route starts with /dashboard
  if (to.path.startsWith('/dashboard')) {
    // If user is not authenticated, redirect to login page
    if (!authStore.isAuthenticated) {
      return navigateTo('/signin');
    }
  }
});