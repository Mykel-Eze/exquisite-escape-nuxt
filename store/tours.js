// store/tours.js
import { defineStore } from 'pinia'
import { useApi } from '@/utils/api'

export const useToursStore = defineStore('tours', {
  state: () => ({
    searchResults: null,
    loading: false,
    error: null,
  }),
  actions: {
    async searchTours(payload) {
      this.loading = true
      this.error = null
      try {
        const api = useApi()
        const response = await api.post('/api/activities/check-availability', payload)
        this.searchResults = response.data
      } catch (error) {
        console.error('Error searching tours:', error)
        this.error = 'An error occurred while searching for tours'
      } finally {
        this.loading = false
      }
    },
  },
})