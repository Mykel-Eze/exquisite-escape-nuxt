import { useAuthStore } from '~/store/auth';
import { useToast } from "vue-toastification";
import { useApi } from '~/utils/api';

export function useAuth() {
  const authStore = useAuthStore();
  const toast = useToast();
  const api = useApi();

  const register = async (userData) => {
    authStore.setIsRegistering(true);
    try {
      const response = await api.post('/api/users/register', userData);
      toast.success("Registration successful. Please check your email for OTP.");
      return response;
    } catch (error) {
      toast.error(error.message || "Registration failed. Please try again.");
      throw error;
    } finally {
      authStore.setIsRegistering(false);
    }
  };

  const login = async (credentials) => {
    authStore.setIsLoggingIn(true);
    try {
      // console.log('Login attempt with credentials:', JSON.stringify(credentials));
      const response = await api.post('/api/user/signin', credentials);
      // console.log('Login response:', response);
      authStore.setUser(response.user);
      authStore.setToken(response.token);
      authStore.setIsAuthenticated(true);
      toast.success("Login successful");
      return response;
    } catch (error) {
      // console.error('Login error:', error);
      // console.error('Error message:', error.message);
      // console.error('Error stack:', error.stack);
      toast.error(error.message || "Login failed. Please check your credentials and try again.");
      throw error;
    } finally {
      authStore.setIsLoggingIn(false);
    }
  };

  const logout = () => {
    authStore.logout();
    toast.info("You have been logged out");
  };

  const verifyOTP = async (otp) => {
    authStore.setIsVerifyingOTP(true);
    try {
      const response = await $fetch(`${config.public.apiBase}/api/users/verify-otp`, {
        method: 'POST',
        body: { otp },
      });
      toast.success("OTP verified successfully");
      return response;
    } catch (error) {
      toast.error(error.message || "OTP verification failed. Please try again.");
      throw error;
    } finally {
      authStore.setIsVerifyingOTP(false);
    }
  };

  const resendOTP = async (email) => {
    authStore.setIsLoading(true);
    try {
      const response = await $fetch(`${config.public.apiBase}/api/users/resend-otp`, {
        method: 'POST',
        body: { email },
      });
      toast.success("OTP resent successfully");
      return response;
    } catch (error) {
      toast.error(error.message || "Failed to resend OTP. Please try again.");
      throw error;
    } finally {
      authStore.setIsLoading(false);
    }
  };

  return {
    register,
    login,
    logout,
    verifyOTP,
    resendOTP,
  };
}