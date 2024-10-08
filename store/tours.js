// store/tours.js
import { defineStore } from 'pinia';
import { useApi } from '@/utils/api';

export const useToursStore = defineStore('tours', {
  state: () => ({
    searchResults: null,
    loading: false,
    error: null,
  }),
  actions: {
    async searchTours(payload) {
      this.loading = true;
      this.error = null;
      try {
        const api = useApi();
        
        // Format the payload to match the expected request body
        const formattedPayload = {
          filters: [
            {
              searchFilterItems: [
                {
                  type: "destination",
                  value: payload.stateCode
                }
              ]
            }
          ],
          from: payload.departureDate,
          to: payload.destinationDate,
          language: "en",
          paxType: payload.paxType,
          pagination: {
            itemsPerPage: 100,
            page: 1
          },
          order: "DEFAULT",
          currency: "NGN",
          "currencyName": "Naira"
        };

        const response = await api.post('/api/activities/check-availability', formattedPayload);
        this.searchResults = response.data;
        return response;
      } catch (error) {
        console.error('Error searching tours:', error);
        this.error = 'An error occurred while searching for tours';
        throw error;
      } finally {
        this.loading = false;
      }
    },
  },
});