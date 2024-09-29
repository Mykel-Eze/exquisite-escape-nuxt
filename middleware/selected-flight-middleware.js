import { useFlightStore } from '~/store/flightStore';
import { useToast } from "vue-toastification";

export default defineNuxtRouteMiddleware((to, from) => {
  if (process.server) return; // Only run on client-side

  const flightStore = useFlightStore();
  const toast = useToast();

  if (!to.params.id) {
    toast.error("Invalid flight. Redirecting to flights page.");
    return navigateTo('/search-results/flights');
  }

  flightStore.loadSelectedFlight(); // Load from session storage

  if (!flightStore.selectedFlight || flightStore.selectedFlight.id !== to.params.id) {
    toast.error("Flight not found. Redirecting to flights page.");
    return navigateTo('/search-results/flights');
  }
});