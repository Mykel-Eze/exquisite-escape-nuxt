import { defineStore } from 'pinia';
import { useStorage } from '@vueuse/core'; // Optional: For more control over local storage

export const useAuthStore = defineStore('auth', {
  state: () => ({
    user: useStorage('user', null),  // Persist user state
    token: useStorage('token', null), // Persist token state
    isAuthenticated: useStorage('isAuthenticated', false), // Persist authentication state
    isLoading: false,
    isRegistering: false,
    isLoggingIn: false,
  }),
  actions: {
    setUser(user) {
      this.user = user;
    },
    setToken(token) {
      this.token = token;
    },
    setIsAuthenticated(value) {
      this.isAuthenticated = value;
    },
    setIsLoading(value) {
      this.isLoading = value;
    },
    setIsRegistering(value) {
      this.isRegistering = value;
    },
    setIsLoggingIn(value) {
      this.isLoggingIn = value;
    },
    logout() {
      this.user = null;
      this.token = null;
      this.isAuthenticated = false;
    },

    initializeAuth() {
      if (this.token) {
        this.setIsAuthenticated(true);
      } else {
        this.setIsAuthenticated(false);
      }
    }
  },
  persist: true,  // Ensure this is enabled
});
