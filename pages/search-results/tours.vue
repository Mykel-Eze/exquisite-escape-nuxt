<!-- pages/search-results/tours.vue -->
<template>
  <div id="tour-result-page">
    <div class="top-section black-bg">
      <div class="row">
        <div class="container py-5">
          <div class="search-tab-wrapper">
            <TourTab />
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
                <ToursFilter 
                  :tours="tourList || []" 
                  @update:filteredTours="updateFilteredTours" 
                />
              </div>
            </div>
            <div class="result-contents-side py-10">
              <div class="px-[30px]">
                <div class="top-snack-bar flex-div gap-2 mb-[30px]">
                  <span class="text-white">
                    {{ numberOfActivities }} activities in {{ destinationName }}, {{ countryName }}
                  </span>
                  <img
                    src="@/assets/images/chevron-right.svg"
                    alt="chevron-right"
                    class="right-arr"
                  />
                  <span class="text-[#9d9d9d]">Review your options</span>
                </div>
                <div class="text-[18px] text-[#606161] leading-[26px]">
                  Prices displayed include taxes and may change based on
                  availability. You can review any additional fees before
                  checkout. Prices are not final until you complete your
                  purchase.
                </div>
                
                <div class="text-[18px] text-[#606161] leading-[26px] mt-4">
                    We work closely with all of our Tour Suppliers to protect our mutual customers.
                </div>
              </div>

              <div v-if="isLoading" class="loading-spinner-wrapper">
                <LoadingSpinner text="Fetching Tours..." />
              </div>
              <div v-else-if="!tourList || tourList.length === 0" class="mt-[100px] mb-[40px]">
                <EmptySearch
                  title="Sorry, we couldn't find any tours that match your criteria"
                  description="Try adjusting your search parameters or explore other destinations"
                />
              </div>
              <div v-else>
                <SortTours 
                    :tours="filteredTourList" 
                    :activeTab="activeTab"
                    @update:activeTab="updateActiveTab"
                    @view-ticket-clicked="viewTicketDetails"
                    @show-availability-modal="showAvailabilityModal = true"
                />
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>

    <ToursAvailabilityModal 
      v-if="showAvailabilityModal" 
      :tour="selectedTour"
      @close="closeAvailabilityModal"
    />
    <ToursSuccessModal 
      v-if="showSuccessModal"
      @close="closeSuccessModal"
    />
    <ToursSidePopup 
      v-if="showSidePopup" 
      :tour="selectedTour"
      @close="closeSidePopup"
    />
  </div>
</template>

<script setup>
import { ref, onMounted, watch } from 'vue';
import { useRoute } from 'vue-router';
import { useToursStore } from '@/store/tours';
import { useTours } from '@/composables/useTours';

const route = useRoute();
const toursStore = useToursStore();
const { fetchCountries, fetchDestinations } = useTours();

const tourList = ref([]);
const filteredTourList = ref([]);
const isLoading = ref(true);
const activeTab = ref('all');
const destinationName = ref('');
const countryName = ref('');

const showAvailabilityModal = ref(false);
const showSuccessModal = ref(false);
const showSidePopup = ref(false);
const selectedTour = ref(null);

const numberOfActivities = computed(() => filteredTourList.value.length);

const updateFilteredTours = (newFilteredTours) => {
  filteredTourList.value = newFilteredTours;
};

const updateActiveTab = (newActiveTab) => {
  activeTab.value = newActiveTab;
};

const fetchTourData = async () => {
  isLoading.value = true;
  const query = route.query;

  try {
    const payload = {
      countryCode: query.countryCode,
      stateCode: query.stateCode,
      departureDate: query.departureDate,
      destinationDate: query.destinationDate,
      paxType: query.paxType || "ADULT"
    };

    // Fetch country and destination names
    const countries = await fetchCountries();
    const country = countries.find(c => c.code === payload.countryCode);
    if (country) {
      countryName.value = country.name;
      const destinations = await fetchDestinations(payload.countryCode);
      const destination = destinations.find(d => d.code === payload.stateCode);
      if (destination) {
        destinationName.value = destination.name;
      }
    }

    const response = await toursStore.searchTours(payload);
    tourList.value = response.data.activities || [];
    filteredTourList.value = response.data.activities || [];
    console.log("Tour data fetched:", tourList.value); // Add this line for debugging
  } catch (error) {
    console.error("Error fetching tour data:", error);
    tourList.value = [];
    filteredTourList.value = [];
  } finally {
    isLoading.value = false;
  }
};

const viewTicketDetails = (tour) => {
  selectedTour.value = tour;
  showSidePopup.value = true;
};

const closeAvailabilityModal = () => {
  showAvailabilityModal.value = false;
};

const closeSuccessModal = () => {
  showSuccessModal.value = false;
};

const closeSidePopup = () => {
  showSidePopup.value = false;
  selectedTour.value = null;
};

onMounted(fetchTourData);

watch(() => route.query, (newQuery, oldQuery) => {
  if (JSON.stringify(newQuery) !== JSON.stringify(oldQuery)) {
    fetchTourData();
  }
}, { deep: true });
</script>


<style scoped>
/* Add any scoped styles here */
</style>