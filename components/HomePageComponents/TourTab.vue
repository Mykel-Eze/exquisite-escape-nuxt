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
            :modelValue="tourObj.countryCode"
            @update:modelValue="(value) => inputHandler(value, 'countryCode')"
          />

          <div v-if="showCountryDropdown" class="absolute bg-white mt-1 search-dropdown-wrapper">
            <ul>
              <li 
                v-for="country in filteredCountryList" 
                :key="country.code" 
                class="text-dark-gray py-2 px-4 cursor-pointer"
                @click="selectCountry(country)"
              >
                {{ country.description.content }}
              </li>
              <!-- <li>Hello</li> -->
            </ul>
          </div>
        </div>

        <div class="relative">
          <InputField
            label="Things to do at?"
            placeholder="Province/State"
            id="things-to-do"
            type="text"
            inputClass="ls-inp-field"
            divClass="input-white-wrapper"
            :modelValue="tourObj.stateCode"
            @update:modelValue="(value) => inputHandler(value, 'stateCode')"
            @focus="showStateDropdown = true"
          />
          <div v-if="showStateDropdown" class="absolute bg-white mt-1 search-dropdown-wrapper">
            <ul>
              <li 
                v-for="state in filteredStateList" 
                :key="state.code" 
                class="text-dark-gray py-2 px-4 cursor-pointer"
                @click="selectState(state)"
              >
                {{ state.name }}
              </li>
            </ul>
          </div>
        </div>

        <div class="input-white-wrapper flex-div flex-row">
          <DatePicker
            label="Leaving on"
            id="departure-date"
            type="text"
            inputClass="ls-inp-field datepicker"
            :value="tourObj.departureDate"
          />
          <span class="range-divider">-</span>
          <DatePicker
            label="Returning on"
            id="return-date"
            type="text"
            inputClass="ls-inp-field datepicker"
            :value="tourObj.destinationDate"
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
      <button class="tab-form-btn flex-div gap-3" @click="searchTourHandler">
        <span>Search Tour</span>
        <img src="~/assets/images/beach-icon.svg" alt="beach-icon" />
      </button>
    </div>
  </form>
</template>

<script lang="ts">
import { defineComponent, ref, computed, onMounted, watch } from "vue";
import { useApiGet, useApiPost } from "../../composables/services/useApi";
import { useRouter } from 'vue-router';
import { useToursStore } from '../../stores/tours';

interface Country {
  code: string;
  description: {
    content: string;
  };
  states: State[];
}

interface State {
  code: string;
  name: string;
}

export default defineComponent({
  setup() {
    const tourObj = ref({
      noOfTourist: "1 Tourist",
      noOfNight: "1 Night",
      countryCode: "",
      stateCode: "",
      departureDate: "",
      destinationDate: "",
    });

    const store = useToursStore();
    const router = useRouter();

    const countryList = ref<Country[]>([]);
    const stateList = ref<State[]>([]);

    const showCountryDropdown = ref(false);
    const showStateDropdown = ref(false);

    const filteredCountryList = computed(() => {
      const result = tourObj.value.countryCode.length >= 3
        ? countryList.value.filter((country) =>
            country.description.content.toLowerCase().includes(tourObj.value.countryCode.toLowerCase())
          )
        : [];
      console.log(result); // Add this line to debug
      return result;
    });

    const filteredStateList = computed(() =>
      tourObj.value.stateCode.length >= 1
        ? stateList.value.filter((state) =>
            state.name.toLowerCase().includes(tourObj.value.stateCode.toLowerCase())
          )
        : stateList.value
    );

    const inputHandler = (value: string, inputKey: keyof typeof tourObj.value) => {
      tourObj.value[inputKey] = value;

      if (inputKey === 'countryCode') {
        showCountryDropdown.value = value.length >= 3;
        console.log('Dropdown Visible:', showCountryDropdown.value); // Debugging log
      }
    };

    const selectCountry = (country: Country) => {
      tourObj.value.countryCode = country.description.content;
      showCountryDropdown.value = false;
      stateList.value = country.states;
      tourObj.value.stateCode = "";
    };

    const selectState = (state: State) => {
      tourObj.value.stateCode = state.name;
      showStateDropdown.value = false;
    };

    onMounted(async () => {
      try {
        const { data } = await useApiGet(`/hotel/countries`);
        countryList.value = data.countries;

        console.log(countryList.value)
      } catch (error) {
        console.error("Failed to fetch countries", error);
      }
    });

    watch(() => tourObj.value.countryCode, (newValue) => {
      if (newValue.length < 2) {
        showCountryDropdown.value = false;
      }
    });

    watch(() => tourObj.value.stateCode, (newValue) => {
      if (newValue.length < 1) {
        showStateDropdown.value = false;
      }
    });

    const searchTourHandler = async () => {
      const payload = { ...tourObj.value };
      await store.searchTours(payload);

      if (router.currentRoute.value.name === 'home') {
        router.push({ name: 'tours' });  // Navigate to the tours page
      }
    };

    return {
      tourObj,
      filteredCountryList,
      filteredStateList,
      showCountryDropdown,
      showStateDropdown,
      inputHandler,
      selectCountry,
      selectState,
      searchTourHandler,
    };
  },
});
</script>
