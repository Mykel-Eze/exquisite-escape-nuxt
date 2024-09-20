import { useAuthStore } from '~/store/auth';
import { useToast } from "vue-toastification";

export function useAuth() {
  const authStore = useAuthStore();
  const toast = useToast();
  const config = useRuntimeConfig();

  const register = async (userData) => {
    authStore.setIsRegistering(true);
    try {
      const response = await $fetch(`${config.public.apiBase}/api/users/register`, {
        method: 'POST',
        body: userData,
      });
      return response;
    } catch (error) {
      throw error;
    } finally {
      authStore.setIsRegistering(false);
    }
  };

  const login = async (credentials) => {
    authStore.setIsLoggingIn(true);
    try {
      const response = await $fetch(`${config.public.apiBase}/api/user/signin`, {
        method: 'POST',
        body: credentials,
      });
      authStore.setUser(response.user);
      authStore.setToken(response.token);
      authStore.setIsAuthenticated(true);
      return response;
    } catch (error) {
      throw error;
    } finally {
      authStore.setIsLoggingIn(false);
    }
  };

  const logout = () => {
    authStore.logout();
    toast.info("You have been logged out");
    navigateTo('/signin');
  };

  return {
    register,
    login,
    logout,
  };
}