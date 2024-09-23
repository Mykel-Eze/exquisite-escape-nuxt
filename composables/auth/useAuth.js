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

      // Log the response to ensure it contains the expected structure
      // console.log('Login Response:', response);

      const token = response.jwt;  // Extract the JWT
      authStore.setToken(token);  // Save the token

      // Optionally decode the JWT here if it contains user info
      // If it doesn't contain user info, you'll need to fetch the current user
      await getCurrentUser();  // Fetch user details with the new token

      authStore.setIsAuthenticated(true);
      
      // Redirect after successful login
      navigateTo('/dashboard/account');
      return response;
    } catch (error) {
      throw error;
    } finally {
      authStore.setIsLoggingIn(false);
    }
  };

  const getCurrentUser = async () => {
    if (!authStore.token) {
      // console.error('Token is missing!');
      throw new Error('Token is missing!');
    }

    try {
      const response = await $fetch(`${config.public.apiBase}/api/users/currentuser`, {
        method: 'GET',
        headers: {
          Authorization: `${authStore.token}`,  // Use the token for authorization
          'Content-Type': 'application/json',
          'Accept': 'application/json',
        },
      });
      
      // console.log('Current User Response:', response);
      
      authStore.setUser(response);  // Set the user in authStore
      return response;
    } catch (error) {
      // console.error('Error fetching current user:', error);
      throw error;
    }
  };

  const activateAccount = async (token) => {
    try {
      const response = await $fetch(`${config.public.apiBase}/api/activate/${token}`, {
        method: 'GET',
      });
      return response;
    } catch (error) {
      // console.error('Error activating account:', error);
      throw error;
    }
  };

  const logout = () => {
    authStore.logout();
    toast.info("You have been logged out");
    navigateTo('/signin');
  };

  const initializeAuth = async () => {
    authStore.initializeAuth();
    if (authStore.isAuthenticated && !authStore.user) {
      try {
        await getCurrentUser();
      } catch (error) {
        // console.error('Error initializing auth:', error);
        authStore.logout();
      }
    }
  };

  return {
    register,
    login,
    logout,
    getCurrentUser,
    initializeAuth,
    activateAccount
  };
}