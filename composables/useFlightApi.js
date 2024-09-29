import { useApi } from '@/utils/api';

export const useFlightApi = () => {
  const api = useApi();

  const searchFlights = async (searchParams) => {
    try {
      const response = await api.post('/api/flight/get/search-offer', searchParams);
      return response.data;
    } catch (error) {
      console.error('Error searching flights:', error);
      throw error;
    }
  };

  const getFlightDetails = async (flightId) => {
    try {
      const response = await api.get(`/api/flight/get-order-info/${flightId}`);
      return response.data;
    } catch (error) {
      console.error('Error getting flight details:', error);
      throw error;
    }
  };

  const getAirportInfo = async (iataCode) => {
    try {
      const response = await api.post('/api/flight/airport-nearby', {
        keyword: iataCode,
        subType: "CITY,AIRPORT"
      });
      
      if (response.data && response.data.length > 0) {
        const cityInfo = response.data.find(item => item.subType === 'CITY' && item.iataCode === iataCode);
        const airportInfo = response.data.find(item => item.subType === 'AIRPORT' && item.iataCode === iataCode);
        
        if (cityInfo && airportInfo) {
          return {
            cityName: cityInfo.address.cityName || cityInfo.name,
            airportName: airportInfo.name
          };
        }
      }
      return { cityName: iataCode, airportName: iataCode };
    } catch (error) {
      console.error(`Error fetching airport info for ${iataCode}:`, error);
      throw error;
    }
  };

  return {
    searchFlights,
    getFlightDetails,
    getAirportInfo
  };
};