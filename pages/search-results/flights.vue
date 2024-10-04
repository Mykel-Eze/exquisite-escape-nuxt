<template>
  <div id="flight-result-page">
    <div class="top-section black-bg">
      <div class="row">
        <div class="container py-5">
          <div class="search-tab-wrapper">
            <FlightTab />
          </div>
        </div>
      </div>
    </div>

    <section class="results-section">
      <div class="row">
        <div class="container c2">
          <div class="result-main-wrapper">
            <div class="result-filter-side">
              <div class="rfs">
                <FlightsFilter 
                  :flights="flightList || []" 
                  :dictionaries="dictionaries"
                  @update:filteredFlights="updateFilteredFlights" 
                />
              </div>
            </div>
            <div class="result-contents-side py-10">
              <div class="px-[30px]">
                <div class="top-snack-bar flex-div gap-2 mb-[30px]">
                  <span class="text-white"
                    >Choose flight from {{ originCity }} to {{ destinationCity }}
                  </span>
                  <img
                    src="@/assets/images/chevron-right.svg"
                    alt="chevron-right"
                    class="right-arr"
                  />
                  <span class="text-[#9d9d9d]">Review your trip</span>
                </div>
                <div class="text-[18px] text-[#606161] leading-[26px]">
                  Prices displayed include taxes and may change based on
                  availability. You can review any additional fees before
                  checkout. Prices are not final until you complete your
                  purchase.
                </div>
              </div>

              <!--=== Note to Dev: When the search is empty, uncomment the below component👇🏽 ===-->
              <div v-if="isLoading" class="loading-spinner-wrapper">
                <LoadingSpinner text="Fetching Flights..." />
              </div>
              <div v-else-if="!flightList || flightList.length === 0" class="mt-[100px] mb-[40px]">
                <EmptySearch
                  title="Sorry, we couldn't find any flights that match your criteria"
                  description="Try searching nearby airports or alternative dates"
                />
              </div>
              <div v-else>
                <CheapFlights :flights="cheapFlights" />

                <FlightStops :flights="flightList" :dictionaries="dictionaries" />

                <SortFlights 
                  :flights="filteredFlightList" 
                  :dictionaries="dictionaries" 
                  :activeTab="activeTab"
                  @update:activeTab="updateActiveTab"
                />
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>

    <!-- <FlightsSidePopup
      :class="{ open: showPopup }"
      @close-popup="showPopup = false"
    /> -->
  </div>
</template>


<script>
import { ref, onMounted, computed, watch } from "vue";
import { useRouter } from "vue-router";
import { useApi } from '@/utils/api'

export default {
  setup() {
    const showPopup = ref(false);
    const searchObject = ref({});
    const flightList = ref([]);
    const filteredFlightList = ref([]);
    const isLoading = ref(true);
    const dictionaries = ref(null);
    const router = useRouter();
    const route = useRoute();
    const api = useApi();
    const activeTab = ref('all');

    const originCity = ref('');
    const destinationCity = ref('');

    const cheapFlights = computed(() => {
      if (!filteredFlightList.value || filteredFlightList.value.length === 0) return [];
      
      // Group flights by date and find minimum price for each date
      const flightsByDate = filteredFlightList.value.reduce((acc, flight) => {
        const date = flight.itineraries[0].segments[0].departure.at.split('T')[0];
        const price = parseFloat(flight.price.total);
        if (!acc[date] || price < acc[date].minPrice) {
          acc[date] = { date, minPrice: price };
        }
        return acc;
      }, {});
      return Object.values(flightsByDate);
    });

    const updateFilteredFlights = (newFilteredFlights) => {
      filteredFlightList.value = newFilteredFlights;
    };

    const updateActiveTab = (newActiveTab) => {
      activeTab.value = newActiveTab;
    };

    const fetchFlightData = async () => {
      isLoading.value = true;
      const query = route.query;
      
      // Get today's date as a fallback
      const today = new Date();
      const fallbackDate = today.toISOString().split('T')[0]; // Format: YYYY-MM-DD

      // Determine if it's a round-trip or one-way based on the presence of a returnDate
      const isRoundTrip = !!query.returnDate;
      
      searchObject.value = {
        originLocationCode: query.originLocationCode || '',
        destinationLocationCode: query.destinationLocationCode || '',
        departureDate: query.departureDate || fallbackDate,
        returnDate: isRoundTrip ? query.returnDate : undefined, // Only include returnDate if it's a round-trip
        adults: Number(query.adults) || 1,
        travelClass: query.travelClass || 'ECONOMY',
        currencyCode: 'NGN'
      };

      // Only add returnDate if it exists in the query
      if (query.returnDate) {
        searchObject.value.returnDate = query.returnDate;
      }

      // Validate dates if it's a round trip
      if (searchObject.value.returnDate) {
        const departureDate = new Date(searchObject.value.departureDate);
        const returnDate = new Date(searchObject.value.returnDate);
        if (returnDate < departureDate) {
          console.error('Invalid date range');
          isLoading.value = false;
          return;
        }
      }
      
      // Fetch city names
      originCity.value = await getCityName(searchObject.value.originLocationCode);
      destinationCity.value = await getCityName(searchObject.value.destinationLocationCode);

      // console.log("Search object:", searchObject.value);
      try {
        const apiResponse = await api.post(
          "/api/flight/get/search-offer",
          searchObject.value
        );
        // console.log("API Response:", apiResponse);

        if (apiResponse && apiResponse.data && Array.isArray(apiResponse.data)) {
          flightList.value = apiResponse.data;
          filteredFlightList.value = apiResponse.data; // Initialize filtered list with all flights
          dictionaries.value = apiResponse.dictionaries;
          // console.log("Flight list updated:", flightList.value);
          // console.log("Dictionaries:", dictionaries.value);
        } else {
          console.error("Unexpected API response structure:", apiResponse);
          flightList.value = [];
          filteredFlightList.value = [];
          dictionaries.value = {};
        }
      } catch (error) {
        console.error("Error fetching flight data:", error);
        flightList.value = [];
        filteredFlightList.value = [];
        dictionaries.value = {};
      } finally {
        isLoading.value = false;
      }
    };

    onMounted(fetchFlightData);

    // Watch for changes in the route query
    watch(() => route.query, (newQuery, oldQuery) => {
      if (JSON.stringify(newQuery) !== JSON.stringify(oldQuery)) {
        fetchFlightData();
      }
    }, { deep: true });

    const getCityName = async (locationCode) => {
      try {
        const response = await api.post('/api/flight/airport-nearby', {
          keyword: locationCode,
          subType: "CITY"
        });
        
        if (response.data && response.data.length > 0) {
          // Look for a city that matches the exact IATA code
          const matchingCity = response.data.find(city => city.iataCode === locationCode);
          
          if (matchingCity) {
            return matchingCity.address?.cityName || matchingCity.name;
          }
          
          // Fallback to the first result if no exact match is found
          return response.data[0].address?.cityName || response.data[0].name;
        }
        return locationCode; // Fallback to the code if no city name is found
      } catch (error) {
        console.error(`Error fetching city name for ${locationCode}:`, error);
        return locationCode; // Fallback to the code in case of error
      }
    };


    return {
      dictionaries,
      showPopup,
      flightList,
      filteredFlightList,
      cheapFlights,
      isLoading,
      originCity,
      destinationCity,
      dictionaries,
      activeTab,
      updateFilteredFlights,
      updateActiveTab
    };
  },
};
</script>


<style></style>
