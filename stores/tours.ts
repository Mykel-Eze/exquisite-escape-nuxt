// stores/tours.js
import { defineStore } from 'pinia';
import { useApiPost } from '../composables/services/useApi';

export const useToursStore = defineStore('tours', {
  state: () => ({
    filters: {},
    tours: [],
  }),
  actions: {
    async searchTours(filters) {
      try {
        this.filters = filters;
        const { data } = await useApiPost("/flight/search-offer", filters);
        this.tours = data.tours; // Assuming the API response has a "tours" array
      } catch (error) {
        console.error("Failed to search tours", error);
      }
    },
  },
});
