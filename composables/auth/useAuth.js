import { useAuthStore } from '~/store/auth';
import { useToast } from "vue-toastification";
import { useRouter } from 'vue-router';

export function useAuth() {
  const authStore = useAuthStore();
  const toast = useToast();
  const config = useRuntimeConfig();
  const router = useRouter();

  const register = async (userData) => {
    authStore.setIsRegistering(true);
    try {
      const response = await $fetch(`${config.public.apiBase}/api/users/register`, {
        method: 'POST',
        body: userData,
      });
      return response;
    } catch (error) {
      // Extract error message from response if available
      if (error.response && error.response._data && error.response._data.error) {
        // Handle array of errors or single error object
        const errorData = error.response._data.error;
        if (Array.isArray(errorData) && errorData.length > 0) {
          error.message = errorData[0].message || 'Registration failed';
        } else if (typeof errorData === 'object') {
          error.message = errorData.message || 'Registration failed';
        } else if (typeof errorData === 'string') {
          error.message = errorData;
        }
      }
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

      const token = response.jwt;
      authStore.setToken(token);

      await getCurrentUser();

      authStore.setIsAuthenticated(true);
      
      // Check if there's a redirect path stored
      const redirectPath = localStorage.getItem('authRedirectPath');
      if (redirectPath) {
        localStorage.removeItem('authRedirectPath');
        router.push(redirectPath);
      } else {
        router.push('/dashboard/account');
      }
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
      
      if (response.firstName && response.email) {
        authStore.setUser(response);  // Set user details in the store
      }
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
  
  onMounted(async () => {
    await initializeAuth();  // Initialize the auth when the app loads
  });

  return {
    register,
    login,
    logout,
    getCurrentUser,
    initializeAuth,
    activateAccount
  };
}