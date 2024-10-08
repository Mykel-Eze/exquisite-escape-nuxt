<template>
  <form @submit.prevent="searchTourHandler" class="search-inputs flex items-end">
    <div class="input-field-wrapper">
      <div class="select-field-wrapper flex-div gap-[20px] mb-[30px]">
        <!-- <TouristSelector v-model:value="tourObj.noOfTourist" /> -->
        <TouristSelector v-model="tourObj.paxType" />
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
import { useRouter,useRoute } from 'vue-router';
import { useTours } from '@/composables/useTours';
import { useToursStore } from '@/store/tours';

const router = useRouter();
const route = useRoute();
const toursStore = useToursStore();
const { countries, destinations, fetchCountries, fetchDestinations } = useTours();

const tourObj = ref({
  countryCode: "",
  countryName: "",
  stateCode: "",
  stateName: "",
  departureDate: "",
  destinationDate: "",
  paxType: "ADULT"
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

const selectCountry = async (country) => {
  tourObj.value.countryCode = country.code;
  tourObj.value.countryName = country.name;
  countrySearch.value = country.name;
  showCountryDropdown.value = false;
  await fetchDestinations(country.code);
  addToRecentSearches(country);
  saveToSessionStorage();
};

const selectDestination = (destination) => {
  tourObj.value.stateCode = destination.code;
  tourObj.value.stateName = destination.name;
  destinationSearch.value = destination.name;
  showDestinationDropdown.value = false;
  addToRecentSearches(destination);
  saveToSessionStorage();
};

const saveToSessionStorage = () => {
  sessionStorage.setItem('tourSearch', JSON.stringify(tourObj.value));
};

const loadFromSessionStorage = () => {
  const savedSearch = sessionStorage.getItem('tourSearch');
  if (savedSearch) {
    const parsedSearch = JSON.parse(savedSearch);
    tourObj.value = { ...tourObj.value, ...parsedSearch };
    countrySearch.value = parsedSearch.countryName;
    destinationSearch.value = parsedSearch.stateName;
  }
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
  sessionStorage.setItem('recentTourSearches', JSON.stringify(recentSearches.value));
};

const searchTourHandler = async () => {
  try {
    await toursStore.searchTours(tourObj.value);
    router.push({
      path: '/search-results/tours',
      query: {
        ...tourObj.value
      }
    });
  } catch (error) {
    console.error("Error searching tours:", error);
  }
};

onMounted(async () => {
  await fetchCountries();
  loadFromSessionStorage();
  if (tourObj.value.countryCode) {
    await fetchDestinations(tourObj.value.countryCode);
  }
});

onMounted(() => {
  const query = route.query;
  if (Object.keys(query).length > 0) {
    tourObj.value = {
      countryCode: query.countryCode || "",
      stateCode: query.stateCode || "",
      departureDate: query.departureDate || "",
      destinationDate: query.destinationDate || "",
      paxType: query.paxType || "ADULT"
    };
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