import { ref } from 'vue'
import { useApi } from '@/utils/api'

export function useTours() {
  const api = useApi()
  const countries = ref([])
  const destinations = ref([])

  const fetchCountries = async () => {
    try {
      const response = await api.get('/api/activities/countries/en')
      countries.value = response.data.countries
      // console.log(countries.value)
      return countries.value
    } catch (error) {
      console.error('Error fetching countries:', error)
      return []
    }
  }

  const fetchDestinations = async (countryCode) => {
    try {
      const response = await api.get(`/api/activities/destination/en/${countryCode}`)
      destinations.value = response.data.country.destinations
      // console.log(destinations.value)
      return destinations.value
    } catch (error) {
      console.error('Error fetching destinations:', error)
      return []
    }
  }

  return {
    countries,
    destinations,
    fetchCountries,
    fetchDestinations
  }
}