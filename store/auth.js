import { defineStore } from 'pinia';

export const useAuthStore = defineStore('auth', {
  state: () => ({
    user: null,
    token: null,
    isAuthenticated: false,
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
  },
  persist: true,
});