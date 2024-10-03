<template>
  <form action="#" class="search-inputs flex items-end">
    <div class="input-field-wrapper">
      <div class="select-field-wrapper flex-div gap-[20px] mb-[30px]">
        <TouristSelector v-model:value="tourObj.noOfTourist" />
      </div>
      <div class="flex-div gap-3 grid-sm-break">
        <div class="relative">
          <InputField
            label="Going to?"
            placeholder="Country"
            id="country"
            type="text"
            inputClass="ls-inp-field"
            divClass="input-white-wrapper long-inp-wrapper"
            :modelValue="countrySearch"
            @update:modelValue="handleCountryInput"
            @focus="showCountryDropdown = true"
            @blur="handleBlur('country')"
          />

          <div v-if="showCountryDropdown" class="absolute bg-white mt-1 search-dropdown-wrapper">
            <ul v-if="countrySearch.length < 3 && recentSearches.length > 0">
              <li 
                v-for="search in recentSearches" 
                :key="search.code" 
                class="text-dark-gray py-2 px-4 cursor-pointer flex-div gap-2"
                @click="selectCountry(search)"
              >
                <img src="~/assets/images/location.svg" alt="location-icon">
                <span>{{ search.name }}</span>
              </li>
            </ul>
            <ul v-else-if="filteredCountries.length > 0">
              <li 
                v-for="country in filteredCountries" 
                :key="country.code" 
                class="text-dark-gray py-2 px-4 cursor-pointer flex-div gap-2"
                @click="selectCountry(country)"
              >
                <img src="~/assets/images/location.svg" alt="location-icon">
                <span>{{ country.name }}</span>
              </li>
            </ul>
            <ul v-else-if="countrySearch.length >= 3">
              <li class="text-dark-gray py-2 px-4">Can't find location</li>
            </ul>
          </div>
        </div>

        <div class="relative">
          <InputField
            ref="destinationInput"
            label="Things to do at?"
            placeholder="Province/State"
            id="things-to-do"
            type="text"
            inputClass="ls-inp-field"
            divClass="input-white-wrapper"
            :modelValue="destinationSearch"
            @update:modelValue="handleDestinationInput"
            @focus="handleDestinationFocus"
            @blur="handleBlur('destination')"
          />
          <div v-if="showDestinationDropdown" class="absolute bg-white mt-1 search-dropdown-wrapper">
            <!-- <ul v-if="recentSearches.length > 0 && !destinationSearch">
              <li 
                v-for="search in recentSearches" 
                :key="search.code" 
                class="text-dark-gray py-2 px-4 cursor-pointer flex-div gap-2"
                @click="selectDestination(search)"
              >
                <img src="~/assets/images/location.svg" alt="location-icon">
                <span>{{ search.name }}</span>
              </li>
            </ul> -->
            <ul v-if="filteredDestinations.length > 0">
              <li 
                v-for="destination in filteredDestinations" 
                :key="destination.code" 
                class="text-dark-gray py-2 px-4 cursor-pointer flex-div gap-2"
                @click="selectDestination(destination)"
              >
                <img src="~/assets/images/location.svg" alt="location-icon">
                <span>{{ destination.name }}</span>
              </li>
            </ul>
            <ul v-else>
              <li class="text-dark-gray py-2 px-4">No destinations found</li>
            </ul>
          </div>
        </div>

        <div class="input-white-wrapper flex-div flex-row">
          <DatePicker
            label="Leaving on"
            id="departure-date"
            type="text"
            inputClass="ls-inp-field datepicker"
            v-model="tourObj.departureDate"
          />
          <span class="range-divider">-</span>
          <DatePicker
            label="Returning on"
            id="return-date"
            type="text"
            inputClass="ls-inp-field datepicker"
            v-model="tourObj.destinationDate"
            :min-date="tourObj.departureDate"
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
      <button class="tab-form-btn flex-div gap-3" @click.prevent="searchTourHandler">
        <span>Search Tour</span>
        <img src="~/assets/images/beach-icon.svg" alt="beach-icon" />
      </button>
    </div>
  </form>
</template>

<script setup>
import { ref, computed, onMounted, watch } from 'vue';
import { useRouter } from 'vue-router';
import { useTours } from '@/composables/useTours';
import { useToursStore } from '@/store/tours';

const router = useRouter();
const toursStore = useToursStore();
const { countries, destinations, fetchCountries, fetchDestinations } = useTours();

const tourObj = ref({
  noOfTourist: "1 Tourist",
  noOfNight: "1 Night",
  countryCode: "",
  stateCode: "",
  departureDate: "",
  destinationDate: "",
});

const countrySearch = ref('');
const destinationSearch = ref('');
const showCountryDropdown = ref(false);
const showDestinationDropdown = ref(false);
const recentSearches = ref([]);
const destinationInput = ref(null);

const filteredCountries = computed(() => {
  return countrySearch.value.length >= 3
    ? countries.value.filter((country) =>
        country.name.toLowerCase().includes(countrySearch.value.toLowerCase())
      )
    : countries.value;
});

const filteredDestinations = computed(() => {
  if (!destinationSearch.value) {
    return destinations.value;
  }
  return destinations.value.filter((destination) =>
    destination.name.toLowerCase().includes(destinationSearch.value.toLowerCase())
  );
});

const handleCountryInput = (value) => {
  countrySearch.value = value;
  showCountryDropdown.value = value.length >= 3;
};

const handleDestinationInput = (value) => {
  destinationSearch.value = value;
};

const selectCountry = (country) => {
  tourObj.value.countryCode = country.code;
  countrySearch.value = country.name;
  showCountryDropdown.value = false;
  fetchDestinations(country.code);
  addToRecentSearches(country);
};

const selectDestination = (destination) => {
  tourObj.value.stateCode = destination.code;
  destinationSearch.value = destination.name;
  showDestinationDropdown.value = false;
  addToRecentSearches(destination);
};

const handleBlur = (type) => {
  setTimeout(() => {
    if (type === 'country') {
      showCountryDropdown.value = false;
    } else {
      showDestinationDropdown.value = false;
    }
  }, 200);
};


const handleDestinationFocus = () => {
  showDestinationDropdown.value = true;
};

const addToRecentSearches = (item) => {
  if (!item || !item.code) return;
  
  const index = recentSearches.value.findIndex(search => search.code === item.code);
  if (index !== -1) {
    recentSearches.value.splice(index, 1);
  }
  recentSearches.value.unshift(item);
  if (recentSearches.value.length > 5) {
    recentSearches.value.pop();
  }
  localStorage.setItem('recentTourSearches', JSON.stringify(recentSearches.value));
};

const searchTourHandler = async () => {
  await toursStore.searchTours(tourObj.value);
  router.push({ name: 'search-results-tours' });
};

onMounted(async () => {
  await fetchCountries();
  const savedSearches = localStorage.getItem('recentTourSearches');
  if (savedSearches) {
    try {
      recentSearches.value = JSON.parse(savedSearches);
    } catch (error) {
      console.error('Error parsing recent searches:', error);
      recentSearches.value = [];
    }
  }
});

onMounted(() => {
  if (destinationInput.value) {
    const inputElement = destinationInput.value.$el.querySelector('input');
    if (inputElement) {
      inputElement.addEventListener('focus', handleDestinationFocus);
    }
  }
});

watch(() => tourObj.value.countryCode, (newValue) => {
  if (newValue) {
    fetchDestinations(newValue);
    destinationSearch.value = ''; // Clear destination search when country changes
  }
});
</script>