<template>
  <form
    id="book-flight-tab"
    class="search-inputs flex items-end"
    autocomplete="off"
  >
    <div class="input-field-wrapper">
      <div class="select-field-wrapper flex-div gap-[10px] mb-[30px]">
        <SelectField
          :options="[
            { value: 'one-way', name: 'One-way' },
            { value: 'round-trip', name: 'Round-trip' },
            // { value: 'multi-city', name: 'Multi-city' },
          ]"
          label=""
          selectKey="value"
          selectName="name"
          v-model="flightObj.tripType"
          altClass="d1"
        />

        <PassengerSelector v-model="flightObj.passengersNumber" />
      </div>
      <div class="flex flex-col gap-7">
        <div class="flex-div gap-3 grid-sm-break">
          <div class="flex-div gap-3 rel arrival-depature-inputs">
            <div class="relative">
              <InputField
                label="From where"
                placeholder="City or Airport"
                id="departure"
                type="text"
                inputClass="ls-inp-field"
                divClass="input-white-wrapper relative"
                v-model="departureSearch"
                @input="handleDepartureInput"
                @focus="showDepartureDropdown = true"
                @blur="handleBlur('departure')"
              />
              <div v-if="showDepartureDropdown" class="absolute bg-white mt-1 search-dropdown-wrapper">
                <ul v-if="departureSearch.length < 3 && recentSearches.length > 0">
                  <li v-for="search in recentSearches" :key="search.iataCode" @click="selectLocation(search, 'departure')" class="text-dark-gray py-2 px-4">
                    {{ search.name }} ({{ search.iataCode }})
                  </li>
                </ul>
                <ul v-else-if="departureResults.length > 0">
                  <li v-for="result in departureResults" :key="result.iataCode" @click="selectLocation(result, 'departure')" class="text-dark-gray py-2 px-4">
                    <div class="bold-txt">{{ result.address.cityName }}, {{ result.address.countryName }}</div>
                    <small>{{ result.name }} ({{ result.iataCode }})</small>
                  </li>
                </ul>
                <ul v-else-if="departureSearch.length >= 3">
                  <li class="text-dark-gray py-2 px-4">Can't find location</li>
                </ul>
              </div>
            </div>

            <!-- v-if="flightObj.tripType !== 'one-way'" -->

            <img
              src="~/assets/images/transfer-arrow.svg"
              alt="transfer-arrow"
              class="transfer-arrow"
            />

            <div class="relative">
              <InputField
                label="To where"
                placeholder="City or Airport"
                id="destination"
                type="text"
                inputClass="ls-inp-field"
                divClass="input-white-wrapper relative"
                v-model="destinationSearch"
                @input="handleDestinationInput"
                @focus="showDestinationDropdown = true"
                @blur="handleBlur('destination')"
              />
              <div v-if="showDestinationDropdown" class="absolute bg-white mt-1 search-dropdown-wrapper">
                <ul v-if="destinationSearch.length < 3 && recentSearches.length > 0">
                  <li v-for="search in recentSearches" :key="search.iataCode" @click="selectLocation(search, 'destination')" class="text-dark-gray py-2 px-4">
                    {{ search.name }} ({{ search.iataCode }})
                  </li>
                </ul>
                <ul v-else-if="destinationResults.length > 0">
                  <li v-for="result in destinationResults" :key="result.iataCode" @click="selectLocation(result, 'destination')" class="text-dark-gray py-2 px-4">
                    <div class="bold-txt">{{ result.address.cityName }}, {{ result.address.countryName }}</div>
                    <small>{{ result.name }} ({{ result.iataCode }})</small>
                  </li>
                </ul>
                <ul v-else-if="destinationSearch.length >= 3">
                  <li class="text-dark-gray py-2 px-4">Can't find location</li>
                </ul>
              </div>
            </div>
          </div>
          <div class="input-white-wrapper flex-div flex-row">
            <DatePicker
              label="Leaving on"
              id="departure-date"
              v-model="flightObj.departureDate"
            />
            <span v-if="flightObj.tripType !== 'one-way'" class="range-divider"
              >-</span
            >
            <DatePicker
              v-if="flightObj.tripType !== 'one-way'"
              label="Returning on"
              id="return-date"
              v-model="flightObj.returnDate"
              :min-date="flightObj.departureDate"
            />
          </div>

          <SelectField
            label="Cabin Type"
            id="cabin-type"
            type="text"
            inputClass="ls-inp-field remove-border"
            divClass="input-white-wrapper remove-border"
            :options="[
              { value: 'ECONOMY', name: 'Economy' },
              { value: 'PREMIUM_ECONOMY', name: 'Premium Economy' },
              { value: 'BUSINESS', name: 'Business' },
              { value: 'FIRST', name: 'First Class' },
            ]"
            selectKey="value"
            selectName="name"
            v-model="flightObj.travelClass"
            altClass="d1"
          />
        </div>
      </div>
    </div>

    <div class="tab-form-btn-wrapper">
      <div
        class="tfbw-div flex-div justify-center gap-[10px] text-[18px] mb-[20px]"
      >
        <img
          src="~/assets/images/best-check.svg"
          alt="best-check"
          class="best-check"
        />
        <span>Best Deal Guaranteed </span>
      </div>
      <button
        v-if="flightObj.tripType === 'multi-city'"
        class="tab-form-btn tfb-2 flex-div gap-3"
        type="button"
        @click="duplicateGridSmBreak"
      >
        <span>Add Flight</span>
        <img src="~/assets/images/plus-rectangle.svg" alt="plus-icon" />
      </button>
      <button
        class="tab-form-btn flex-div gap-3"
        @click.prevent="searchFlight"
      >
        <span>Search Flights</span>
        <img src="~/assets/images/plane-icon.svg" alt="plane-icon" />
      </button>
    </div>
  </form>
</template>

<script>
import { ref, onMounted, watch } from 'vue'
import { useApi } from '@/utils/api'
import { useRouter } from 'vue-router'

export default {
  setup() {
    const api = useApi()
    const router = useRouter()

    const departureSearch = ref('')
    const destinationSearch = ref('')
    const showDepartureDropdown = ref(false)
    const showDestinationDropdown = ref(false)
    const departureResults = ref([])
    const destinationResults = ref([])
    const recentSearches = ref([])

    const flightObj = ref({
      tripType: "one-way",
      passengersNumber: 1,
      departureDate: "",
      returnDate: "",
      travelClass: "ECONOMY",
      originLocationName: "",
      originLocationCode: "",
      destinationLocationName: "",
      destinationLocationCode: "",
    });

    const handleDepartureInput = async () => {
      if (departureSearch.value.length >= 3) {
        try {
          // First request for cities
          const cityResponse = await api.post('/api/flight/airport-nearby', { 
            keyword: departureSearch.value,
            subType: "CITY",
          });
          
          // Second request for airports
          const airportResponse = await api.post('/api/flight/airport-nearby', { 
            keyword: departureSearch.value,
            subType: "AIRPORT",
          });

          // Combine results
          departureResults.value = [...cityResponse.data, ...airportResponse.data];
          showDepartureDropdown.value = true;
        } catch (error) {
          console.error('Error fetching airport data:', error);
          departureResults.value = [];
          showDepartureDropdown.value = false;
        }
      } else {
        departureResults.value = [];
        showDepartureDropdown.value = false;
      }
    };

    const handleDestinationInput = async () => {
      if (destinationSearch.value.length >= 3) {
        try {
          // Request for airports
          const airportResponse = await api.post('/api/flight/airport-nearby', { 
            keyword: destinationSearch.value,
            subType: "AIRPORT",
          });

          // Request for cities
          const cityResponse = await api.post('/api/flight/airport-nearby', { 
            keyword: destinationSearch.value,
            subType: "CITY",
          });

          // Combine results
          destinationResults.value = [...airportResponse.data, ...cityResponse.data];
          showDestinationDropdown.value = true;
        } catch (error) {
          console.error('Error fetching airport data:', error);
          destinationResults.value = [];
          showDestinationDropdown.value = false;
        }
      } else {
        destinationResults.value = [];
        showDestinationDropdown.value = false;
      }
    };

    const selectLocation = (location, type) => {
      if (type === 'departure') {
        departureSearch.value = `${location.name} (${location.iataCode})`
        flightObj.value.originLocationName = location.name
        flightObj.value.originLocationCode = location.iataCode
        showDepartureDropdown.value = false
      } else {
        destinationSearch.value = `${location.name} (${location.iataCode})`
        flightObj.value.destinationLocationName = location.name
        flightObj.value.destinationLocationCode = location.iataCode
        showDestinationDropdown.value = false
      }
      addToRecentSearches(location)
    }

    const handleBlur = (type) => {
      setTimeout(() => {
        if (type === 'departure') {
          showDepartureDropdown.value = false
        } else {
          showDestinationDropdown.value = false
        }
      }, 200)
    }

    const addToRecentSearches = (location) => {
      const index = recentSearches.value.findIndex(search => search.iataCode === location.iataCode)
      if (index !== -1) {
        recentSearches.value.splice(index, 1)
      }
      recentSearches.value.unshift(location)
      if (recentSearches.value.length > 5) {
        recentSearches.value.pop()
      }
      sessionStorage.setItem('recentSearches', JSON.stringify(recentSearches.value))
    }

    // Load saved search data from sessionStorage on component mount
    onMounted(() => {
      const savedSearch = sessionStorage.getItem('lastFlightSearch')
      if (savedSearch) {
        const parsedSearch = JSON.parse(savedSearch)
        flightObj.value = { ...flightObj.value, ...parsedSearch }
        departureSearch.value = parsedSearch.originLocationName
        destinationSearch.value = parsedSearch.destinationLocationName
      }
    })

    // Watch for changes in flightObj and save to sessionStorage
    watch(flightObj, (newVal) => {
      sessionStorage.setItem('lastFlightSearch', JSON.stringify(newVal))
    }, { deep: true })

    watch(() => flightObj.value.tripType, (newType) => {
      if (newType === 'one-way') {
        flightObj.value.returnDate = '';
      }
    });


    const searchFlight = async () => {
      // Validate dates for round-trip
      if (flightObj.value.tripType === 'round-trip') {
        const departureDate = new Date(flightObj.value.departureDate);
        const returnDate = new Date(flightObj.value.returnDate);

        if (returnDate < departureDate) {
          alert('Return date must be after departure date');
          return;
        }
      }

      // Prepare the search payload
      const searchPayload = {
        originLocationCode: flightObj.value.originLocationCode,
        destinationLocationCode: flightObj.value.destinationLocationCode,
        departureDate: flightObj.value.departureDate,
        adults: flightObj.value.passengersNumber,
        travelClass: flightObj.value.travelClass,
        currencyCode: "NGN",
      }

      // Only add returnDate for round-trip
      if (flightObj.value.tripType === 'round-trip' && flightObj.value.returnDate) {
        searchPayload.returnDate = flightObj.value.returnDate
      }

      // Additional validation
      if (!searchPayload.originLocationCode || !searchPayload.destinationLocationCode || !searchPayload.departureDate) {
        alert('Please fill in all required fields');
        return;
      }

      try {
        // Save the current search to sessionStorage
        sessionStorage.setItem('lastFlightSearch', JSON.stringify(flightObj.value))

        // Redirect to the search results page with query parameters
        router.push({
          path: '/search-results/flights',
          query: searchPayload
        })
      } catch (error) {
        console.error('Error searching flights:', error)
        alert('An error occurred while searching for flights. Please try again.')
      }
    }


    return {
      departureSearch,
      destinationSearch,
      showDepartureDropdown,
      showDestinationDropdown,
      departureResults,
      destinationResults,
      recentSearches,
      handleDepartureInput,
      handleDestinationInput,
      selectLocation,
      handleBlur,
      searchFlight,
      flightObj
    }
  }
}
</script>

<style lang="scss" scoped>
.remove-btn {
  background: red;
  border: none;
  cursor: pointer;
  position: absolute;
  top: 0;
}
.remove-border {
  .select-wrapper input.select-dropdown {
    border: none !important;
  }
}
</style>
